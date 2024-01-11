<?php
  
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type, Authorization");
  
  $eData = file_get_contents("php://input");
  $dData = json_decode($eData, true);
  
  $username = $dData['username'];
  $password = $dData['password'];

  include "../classes/dbh.classes.php";
  include "../classes/Login/login.classes.php";
  include "../classes/Login/login-controler.classes.php";

  $login = new LoginControler($username, $password);
  $login->loginUser();

?>