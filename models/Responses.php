<?php

namespace Model;

class Responses extends BaseModel
{
    static public $tableName = 'responses';
    static public $colums = ['uid', 'quizId', 'ask', 'points'];
    public ?string $uid = null;
    public ?string $quizId = null;
    public ?string $ask = null;
    public ?int $points = 0;

    public function __construct($data = [])
    {

        $this->ask = $data['ask'] ?? null;
        $this->points = $data['points'] ?? null;
    }
}
