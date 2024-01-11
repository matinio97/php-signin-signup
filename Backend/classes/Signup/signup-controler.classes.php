<?php 

  class SignupControler extends Signup{

    private $username;
    private $email;
    private $password;

    public function __construct($username, $email, $password)
    {
      $this->username = $username;
      $this->email = $email;
      $this->password = $password;
    }

    public function signupUser(){
      if(!$this->usernameTakenCheck()){
        http_response_code(400); 
        header('Content-Type: application/json');
        echo json_encode(array("error" => "Nazwa jest już zajęta", "field"=>"username"));
        exit();
      }
      if(!$this->emailTakenCheck()){
        http_response_code(400); 
        header('Content-Type: application/json');
        echo json_encode(array("error" => "Adres email jest już zajęty", "field"=>"email"));
        exit();
      }

      $this->setUser($this->username, $this->password, $this->email);
    }

    private function usernameTakenCheck(){
      $result = null;
      if(!$this->checkUsername($this->username)){
        $result = false;
      } else {
        $result = true;
      }
      return $result;
    }
    private function emailTakenCheck(){
      $result = null;
      if(!$this->checkUserEmail($this->email)){
        $result = false;
      } else {
        $result = true;
      }
      return $result;
    }
  }

?>