<?php

  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type, Authorization");

  $eData = file_get_contents("php://input");
  $dData = json_decode($eData, true);

  $id = $dData['id'];
  
  include "../classes/dbh.classes.php";
  include "../classes/DeleteAccount/delete-account.classes.php";
  include "../classes/DeleteAccount/delete-account-controler.classes.php";

  $login = new DeleteAccountControler($id);
  $login->deleteUser();

?>