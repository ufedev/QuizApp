<?php


namespace Controller;

use Uff\Res;

class ReactController
{

    static public function private($req, Res $res): void
    {
        $res->render(__DIR__ . "/../views/react/layout.php");
    }
    static public function quiz($req, Res $res): void
    {
        $res->render(__DIR__ . "/../views/react/layout.php");
    }
    static public function index($req, Res $res): void
    {
        $res->render(__DIR__ . "/../views/react/layout.php");
    }

    static public function exam($req, Res $res): void
    {
        $res->render(__DIR__ . "/../views/react/layout.php");
    }
    static public function allquiz($req, Res $res): void
    {
        $res->render(__DIR__ . "/../views/react/layout.php");
    }
    static public function calification($req, Res $res): void
    {
        $res->render(__DIR__ . "/../views/react/layout.php");
    }
}
