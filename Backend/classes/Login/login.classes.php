<?php

  header('Content-Type: application/json');

  require '../vendor/autoload.php';
  use Firebase\JWT\JWT;
  use Dotenv\Dotenv;

  $dotenv = Dotenv::createImmutable(__DIR__.'/../../');
  $dotenv -> load();

  class Login extends Dbh{
    
    private function generateJWT($user_id, $username, $user_email){
      $payload = array(
        "user_id" => $user_id,
        "username" => $username,
        "user_email" => $user_email,
        "exp" => time() + (7 * 24 * 60 * 60),
      );

      $jwt = JWT::encode($payload, $_ENV['JWT_KEY'], 'HS256');
      return $jwt;
    }

    protected function getUser($username, $password){
      
      $statement = $this->connect()->prepare('SELECT users_pwd FROM users WHERE users_uid = ? OR users_email = ?');

      if(!$statement->execute(array($username, $username))){
        //server error
        $statement = null;
        http_response_code(500); 
        echo json_encode(array("error" => "Błąd servera", "field"=>""));
        exit();
      } else {
        if($statement-> rowCount() == 0) {
          //no user found
          $statement=null;
          http_response_code(400); 
          echo json_encode(array("error" => "Nie znaleziono użytkownika", "field"=>"username"));
          exit();
        } else {
          $data = $statement->fetchAll(PDO::FETCH_ASSOC);
          $hashedPwd = $data[0]["users_pwd"];
          $passwordMatches = password_verify($password, $hashedPwd);
          
          if(!$passwordMatches) {
            //wrong password
            $statement = null;
            http_response_code(400); 
            echo json_encode(array("error" => "Błędne hasło", "field"=>"password"));
            exit();
          } else {
            //correct password
            $statement = $this->connect()->prepare('SELECT * FROM users WHERE (users_uid = ? OR users_email = ?) AND users_pwd = ?;');
            if(!$statement->execute(array($username, $username, $hashedPwd))){
              //server error
              http_response_code(500); 
              echo json_encode(array("error" => "Błąd servera", "field"=>""));
              exit();
              if($statement->rowCount() == 0){
                //no user found
                $statement = null;
                http_response_code(400); 
                echo json_encode(array("error" => "Nie znaleziono użytkownika", "field"=>"username"));
                exit();
              }
            }
            $user = $statement->fetchAll(PDO::FETCH_ASSOC);
            $status = $user[0]['verify_status'];
            if($status){
              $user_id = $user[0]["users_id"];
              $username = $user[0]["users_uid"];
              $user_email = $user[0]["users_email"];
              
              $jwt_token = $this->generateJWT($user_id, $username, $user_email);
              echo json_encode(array("token" => $jwt_token));
            } else {
              $statement = null;
              http_response_code(400); 
              echo json_encode(array("error" => "Nie potwierdziłeś/aś adresu email", "field"=>""));
              exit();
            }
          }
        }
      }
    }
  }

?>