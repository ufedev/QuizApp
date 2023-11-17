<?php


namespace Model;


class User extends BaseModel
{
    static protected $colums = ["uid", "username", "password", 'name', 'lastname', "admin", 'calification', 'trys'];
    static protected $tableName = "users";

    public null|string|int $uid = null;
    public string|null $username;
    public string|null $password;
    public ?string $name;
    public ?string $lastname;
    public bool $admin = false;
    public float $calification = 0;
    public int $trys = 2;

    public function __construct(array $data = [])
    {
        $this->username = $data['username'] ?? "";
        $this->password = $data['password'] ?? "";
        $this->name = $data['name'] ?? "";
        $this->lastname = $data['lastname'] ?? "";
    }

    public function save(): mixed
    {

        if (!$this->uid) {
            $this->username = strtolower($this->username);
            $this->password = password_hash($this->password, PASSWORD_DEFAULT);
            return $this->insertOne();
        } else {
            return $this->updateOne("username");
        }
    }
}
