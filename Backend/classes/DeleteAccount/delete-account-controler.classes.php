<?php 

  class DeleteAccountControler extends DeleteAccount{

    private $id;

    public function __construct($id)
    {
      $this->id = $id;
    }

    public function deleteUser(){
      if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit(); 
      }
      $this->deleteAccount($this->id);
    }
  }

?>