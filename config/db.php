<?php

// use Exception;
use MongoDB\Client as MongoDB;



$str_con = "mongodb://localhost:27017";

$client = new MongoDB($str_con);

try {

    $client->selectDatabase("parcial3")->command(['ping' => 1]);
} catch (Exception $e) {
    exit;
}
