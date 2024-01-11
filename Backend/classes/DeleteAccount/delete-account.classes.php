<?php

  header('Content-Type: application/json');

  class DeleteAccount extends Dbh{
    
    protected function deleteAccount($id){
      
      $statement = $this->connect()->prepare('DELETE FROM users WHERE users_id = ?;');

      if(!$statement->execute(array($id))){
        //server error
        $statement = null;
        http_response_code(500); 
        echo json_encode(array("error" => "Błąd servera", "field"=>""));
        exit();
      } else {
        echo "Konto zostało usunięte";
      } 
    }
  }

?>