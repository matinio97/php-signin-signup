<?php

  class EmailVerifyControler extends EmailVerify {

    private $token;

    public function __construct($token)
    {
      $this->token = $token;
    }

    public function verifyEmail(){
      $this->checkValidToken($this->token);
    }
  }

?>