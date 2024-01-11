<?php

  class EmailVerify extends Dbh {

    protected function checkValidToken($token){

      $statement = $this->connect()->prepare('SELECT verify_token, verify_status FROM users WHERE verify_token = ?;');

      if(!$statement->execute(array($token))){
        $statement = null;
        exit();
      } 

      $result = null;
      if($statement -> rowCount() !== 1){
        $result = false;
      } else {
        $result = true;
      }

      $status = null;
      if(!$result) {
        echo "<span>Twój token jest niepoprawny :(</span>";
      } else {
        $status = $statement->fetchAll(PDO::FETCH_ASSOC)[0]['verify_status'];
        if($status) {
          echo "<span>Twój adres email jest już potwierdzony</span>";
        } else {
          $this->setAccountVerified($token);
        }
      }
    }

    private function setAccountVerified($token){
      $statement = $this->connect()->prepare('UPDATE users SET verify_status="1" WHERE verify_token = ?;');

      if(!$statement->execute(array($token))){
        $statement = null;
        exit();
      }

      echo "<span>Adres email został potwierdzony :)</span>";
    }
  }


?>