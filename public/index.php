<?php
include_once __DIR__ . "/../config/config.php";


use Uff\Router as Router;
use Controller\PageController as Page;
use Controller\APIController as API;
use Controller\ReactController as React;

$app = new Router;


// SCRIPTs
$app->get('/scripts', [Page::class, "scripts"]);
$app->get('/styles', [Page::class, "styles"]);
// STUDENTS

// $app->get("/api/login",[API::class,"login"]);
$app->post("/api/login", [API::class, "login"]);
$app->get("/api/auth", [API::class, "auth"]);
$app->get("/api/students", [API::class, 'is_auth'], [API::class, "students"]);
$app->post("/api/calification", [API::class, "calification"]);
$app->post("/api/getcalification", [API::class, "get_calification"]);

// ADMIN
$app->get("/create/user", [Page::class, 'new_user']);
$app->post("/create/user", [Page::class, 'new_user']);

$app->get("/probar/clase", [Page::class, 'probar_clase']);

// QUIZZ

$app->post("/api/create/quiz",  [API::class, "new_quiz"]); //[API::class, 'is_auth'],
$app->get("/api/quiz/all", [API::class, "all_quiz"]);

// Pages

$app->get("/", [React::class, "index"]);
$app->get("/exam", [React::class, 'exam']);
$app->get("/calification/:student", [React::class, 'calification']);
$app->get("/private", [React::class, "private"]);
$app->get("/private/quiz", [React::class, 'quiz']);
$app->get("/private/allquiz", [React::class, 'allquiz']);

$app->listen();
