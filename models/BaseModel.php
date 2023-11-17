<?php



namespace Model;






abstract class BaseModel
{

    static protected $tableName = "";
    static protected $colums = [];
    static protected $db = null;
    static protected $databaseName = 'parcial';

    static public function setDB($db)
    {
        self::$db = $db;
    } // Set Client MongoDB

    static protected function createThis($object): ?static
    {
        if (!$object) return null;

        $obj = new static();

        foreach (static::$colums as $key) {

            if (property_exists($obj, $key) && isset($object->$key)) {

                $obj->$key = $object[$key];
            }
        }

        return $obj;
    }

    static public function find(array $options = []): array
    {
        $res = [];
        $data = static::$db->{self::$databaseName}->{static::$tableName}->find($options);
        foreach ($data as $doc) {
            $res[] = static::createThis($doc);
        }
        return $res ?? [];
    } // get all
    static public function findOneByID(string $uid): ?self
    {
        $data = static::$db->static::$tableName->findOne(["uid" => $uid]);

        return static::createThis($data);
    } //get one or multiple
    static public function findOne(string $column, string $value): ?static
    {
        $data = self::$db->{self::$databaseName}->{static::$tableName}->findOne([$column => $value]);

        return static::createThis($data);
    }


    public function insertOne(): mixed
    {
        $data = [];

        foreach (static::$colums as $column) {
            if ($column === '_id') {
                continue;
            }
            if ($column === "uid") {
                $data[$column] = md5(uniqid(rand()));
                continue;
            }
            $data[$column] = $this->$column;
        }

        $collection = static::$db->{self::$databaseName}->{static::$tableName};
        $insert = $collection->insertOne($data);


        return ["insert" => $insert, 'uid' => $data['uid']];
    } //new one

    public function updateOneById(string $uid, array $newData = []): ?this
    {


        $update = static::$db->{self::$databaseName}->{static::$tableName}->updateOne(array_merge(["uid" => $uid,], $newData));

        return static::createThis($update);
    } //update one

    public function updateOne($by)
    {
        $data = [];
        $id = null;
        foreach ($this as $key => $value) {
            if ($key === 'id') {
                $id = $value;
                continue;
            }

            $data[$key] = $value;
        }



        static::$db->{self::$databaseName}->{static::$tableName}->updateOne(
            [$by => $data[$by],],
            ['$set' => $data]
        );

        return $this;
    }
}
