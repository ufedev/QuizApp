<?php

namespace Controller;

use Exception;
use Uff\Res;
use Model\User;
use Model\Quiz;
use Model\Responses;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use TypeError;

use function PHPSTORM_META\type;

class APIController
{

    static public string $key = "LlaveImposible";


    static public function login($req, Res $res)
    {
        try {
            $username = $req->body['username'];
            $password = $req->body['password'];

            $user_exists = User::findOne('username', strtolower($username));


            if ($user_exists) {

                if (password_verify($password, $user_exists->password)) {

                    $res->json([
                        "success" => true,
                        "message" => JWT::encode([
                            "username" => $username,
                            "name" => $user_exists->name . " " . $user_exists->lastname,
                            "student" => !$user_exists->admin,
                            "teacher" => $user_exists->admin
                        ], static::$key, 'HS256')
                    ]);
                }
            } else {
                $res->status(404)->json([
                    "success" => false,
                    "message" => "El Usuario no existe"
                ]);
            }
        } catch (Exception $e) {
            $res->status(501)->json([
                "success" => false,
                "message" => "Hubo un error"
            ]);
        }
    }
    static public function is_auth($req, Res $res)
    {
        $token = $_SERVER['HTTP_AUTHORIZATION'];

        if (str_starts_with($token, "Bearer")) {

            $token =  explode(" ", $token)[1];
            try {
                $decode = JWT::decode($token, new Key(self::$key, 'HS256'));


                if ($decode->teacher) {
                    $_SERVER['auth'] = $decode;
                } else {
                    $res->json([
                        "success" => false,
                        "message" => "No autorizado"
                    ]);
                }
            } catch (Exception $e) {
                $res->json([
                    "success" => false,
                    "message" => "No autorizado"
                ]);
            }
        } else {

            $res->status(401)->json([
                'success' => false,
                "message" => 'No autorizado'
            ]);
        }
    }

    static public function auth($req, Res $res)
    {
        $token = $_SERVER['HTTP_AUTHORIZATION'];

        if (str_starts_with($token, "Bearer")) {

            $token =  explode(" ", $token)[1];
            try {
                $decode = JWT::decode($token, new Key(self::$key, 'HS256'));
                $student = User::findOne('username', $decode->username);
                $result =  array_merge((array)$decode, ['trys' => $student->trys]);
                $res->json([
                    "success" => true,
                    "message" => $result
                ]);
            } catch (Exception $e) {
                $res->json([
                    "success" => false,
                    "message" => "No autorizado"
                ]);
            }
        } else {

            $res->status(401)->json([
                'success' => false,
                "message" => 'No autorizado'
            ]);
        }
    }

    static public function students($req, Res $res)
    {

        try {
            $students = User::find(['admin' => false]) ?? [];

            $res->json([
                'success' => true,
                'message' => $students

            ]);
        } catch (Exeption $e) {
        }
    }

    static public function new_quiz($req, Res $res): void
    {

        $responses = $req->body["questionsNumber"];
        // $res->json($responses);
        try {

            $data['quiz'] = $req->body['quiz'];
            $quiz_exists = Quiz::findOne("quiz", $data['quiz']);
            if ($quiz_exists) {
                $res->status(403)->json([
                    "success" => false,
                    'message' => "Ya existe la pregunta"
                ]);
            }

            $quiz = new Quiz($data);

            $quiz_save = $quiz->insertOne();
            if ($quiz_save['insert']) {

                $quizId = $quiz_save['uid'];


                foreach ($responses as $r) {
                    $response =  new Responses($r);
                    $response->quizId = $quizId;
                    $response_save = $response->insertOne();
                }

                $res->json([
                    "success" => true,
                    "message" => 'Pregunta creada'
                ]);
            } else {
                $res->status(403)->json([
                    "success" => false,
                    "message" => "Hubo un error al guardar la pregunta"
                ]);
            }
        } catch (Exception $e) {
            $res->status(501)->json([
                "success" => false,
                'message' => "Hubo un erro en el servidor"
            ]);
        }
    }

    static public function all_quiz($req, Res $res): void
    {

        try {
            $result = [];
            $quizes = Quiz::find();
            $responses = Responses::find();
            foreach ($quizes as $q) {
                $q = (array)$q;

                foreach ($responses as $r) {
                    $r = (array)$r;
                    if ($r["quizId"] === $q['uid']) {
                        $q['responses'][] = $r;
                    }
                }

                $result[] = $q;
            }


            $res->json([
                'success' => true,
                "message" => $result

            ]);
        } catch (Exception $e) {
            $res->status(500)->json([
                'success' => false,
                "message" => "Hubo un problema en el servidor"
            ]);
        }
    }

    static public function calification($req, Res $res): void
    {
        $responsesStudent = $req->body['responses'];


        try {
            $student = User::findOne('username', $req->body['student']);

            if ($student->trys === 0) {
                $res->status(403)->json([
                    'success' => false,
                    'message' => 'Se te acabaron los intentos'
                ]);
            }


            $sumatory = 0;
            foreach ($responsesStudent as $rs) {
                $response = Responses::findOne('uid', $rs);
                $sumatory += $response->points;
            }

            $calification = ($sumatory / 20) * 100;

            $newCalification = max($calification, $student->calification);
            $student->calification = $newCalification;
            $student->trys--;
            $student->save();

            $res->json([
                'success' => true,
                "message" => $student->username
            ]);
        } catch (Exception $e) {
            $res->status(501)->json([
                "success" => false,
                'message' => 'Hubo un problema en el servidor'
            ]);
        }

        $res->json($req->body["responses"]);
    }
    static public function get_calification($req, Res $res): void
    {
        try {

            $student = User::findOne('username', $req->body["student"]);
            $data = [
                "trys" => $student->trys,
                'user' => $student->name . " " . $student->lastname,
                'calification' => $student->calification
            ];
            $res->json([
                'success' => true,
                'message' => $data
            ]);
        } catch (Exception $e) {
            $res->status(501)->json([
                "success" => false,
                'message' => 'Hubo un error en el servidor'
            ]);
        }
    }
}
