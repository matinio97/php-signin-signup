<?php

  header('Content-Type: application/json');
  require '../vendor/autoload.php';

  class PasswordRecoveryForm extends Dbh {

    protected function checkValidTokenAndEmail($email, $password, $token){
      $statement = $this->connect()->prepare('SELECT * FROM users WHERE users_email = ? AND verify_token = ?;');

      if(!$statement->execute(array($email, $token))) {
        $statement=null;
        http_response_code(500); 
        echo json_encode(array("error" => "Błąd servera", "field"=>""));
        exit();
      }

      if($statement->rowCount() !== 1) {
        $statement=null;
        http_response_code(400); 
        echo json_encode(array("error" => "Adres email lub token jest nieprawidłowy", "field"=>""));
        exit();
      } else {
        $this->setNewPassword($email, $password, $token);
      }
    }

    private function setNewPassword($email, $password, $token){
      $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

      $statement = $this->connect()->prepare('UPDATE users SET users_pwd = ? WHERE users_email = ? AND verify_token = ?;');

      if(!$statement->execute(array($hashedPassword, $email, $token))){
        $statement=null;
        http_response_code(500); 
        echo json_encode(array("error" => "Błąd servera", "field"=>""));
        exit();
      } 
      
      if($statement->rowCount() !== 1) {
        $statement=null;
        http_response_code(400); 
        echo json_encode(array("error" => "Adres email lub token jest nieprawidłowy", "field"=>""));
        exit();
      } else {
        echo 'Hasło zostało zresetowane';
      }
    }
  }


?>