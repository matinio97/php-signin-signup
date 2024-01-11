<?php 

  class PasswordRecoveryControler extends PasswordRecovery {

    private $email;

    public function __construct($email)
    {
      $this->email = $email;
    }

    public function verifyEmail(){
      if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit(); 
      }
      $this->checkEmail($this->email);
    }
  }


?>