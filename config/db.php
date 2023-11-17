<?php

use MongoDB\Client as MongoDB;



$str_con = "mongodb://localhost:27017";
try {
    $client = new MongoDB($str_con);
    $client->selectDatabase("parcial3")->command(['ping' => 1]);
} catch (Exception $e) {
    echo "error al conectar la DB";
    exit;
}
