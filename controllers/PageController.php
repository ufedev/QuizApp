<?php

namespace Controller;

use Uff\Res;
use Model\User;

class PageController
{


    static public function scripts()
    {
        $path = __DIR__ . "/../js/out.js";
        $script = file_get_contents($path);

        header('Content-Type: application/javascript');
        echo $script;
    }
    static public function styles()
    {
        $path = __DIR__ . "/../js/out.css";
        $script = file_get_contents($path);

        header('Content-Type: text/css');
        echo $script;
    }

    static public function new_user($req, Res $res)
    {

        $user = new User();
        $msg = "";
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {



            if (in_array("", $req->body)) {
                $msg = "Todos los campos son obligatorios";
            }


            if ($msg === '') {
                $no_one_else = User::find();


                if (count($no_one_else) === 0) {
                    $admin = new User($req->body);
                    $admin->admin = true;
                    if ($admin->save()) {
                        $msg = "Admin Creado";
                    }
                } else {

                    $user_exist = User::findOne("username", strtolower($req->body['username']));

                    if ($user_exist) {
                        $msg = "El usuario ya fue creado";
                    } else {
                        $user = new User($req->body);
                        $user = $user->save();
                        if ($user) {
                            $msg = "Usuario insertado correctamente";
                            $req->body['username'] = '';
                            $req->body['name'] = '';
                            $req->body['lastname'] = '';
                        }
                    }
                }
            }
        }


        $res->render(
            __DIR__ . "/../views/newuser.php",
            [
                "username" => $req->body['username'] ?? "",
                "name" => $req->body['name'] ?? '',
                "lastname" => $req->body['lastname'] ?? "",
                "msg" => $msg
            ],
            __DIR__ . "/../views/layout.php"
        );
    }


    static public function new_quiz($req, Res $res)
    {






        $res->render(__DIR__ . "/../views/react/layout.php");
    }

    static public  function new_api_quiz()
    {
    }


    static public function probar_clase()
    {
        $user_exists = User::find();
        show($user_exists);
    }
}
