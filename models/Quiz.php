<?php

namespace Model;


class Quiz extends BaseModel
{
    static public $tableName = "quiz";
    static public $colums = ["uid", 'quiz'];
    public ?string $uid = null;
    public ?string $quiz = null;

    public function __construct($data = [])
    {
        $this->quiz = $data['quiz'] ?? null;
    }
}
