<?php
include_once __DIR__ . "/../vendor/autoload.php";
include_once __DIR__ . "/db.php";

use Model\BaseModel;

BaseModel::setDB($client);
