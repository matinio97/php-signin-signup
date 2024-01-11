<?php

  class PasswordRecoveryFormControler extends PasswordRecoveryForm {

    private $email;
    private $password;
    private $token;

    public function __construct($email, $password, $token)
    {
      $this->email = $email;
      $this->password = $password;
      $this->token = $token;
    }

    public function resetPassword(){
      if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit(); 
      }
      $this->checkValidTokenAndEmail($this->email, $this->password, $this->token);
    }
  }

?>