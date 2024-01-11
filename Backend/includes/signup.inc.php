<?php

  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type, Authorization");
  
  $eData = file_get_contents("php://input");
  $dData = json_decode($eData, true);
  
  $username = $dData['username'];
  $email = $dData['email'];
  $password = $dData['password'];

  include "../classes/dbh.classes.php";
  include "../classes/Signup/signup.classes.php";
  include "../classes/Signup/signup-controler.classes.php";
  
  $signup = new SignupControler($username, $email, $password);
  $signup->signupUser();

?>