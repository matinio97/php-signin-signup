<?php 

  class LoginControler extends Login{

    private $username;
    private $password;

    public function __construct($username, $password)
    {
      $this->username = $username;
      $this->password = $password;
    }

    public function loginUser(){
      if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit(); 
      }
      $this->getUser($this->username, $this->password);
    }
  }

?>