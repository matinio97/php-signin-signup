<?php

  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type, Authorization");

  $eData = file_get_contents("php://input");
  $dData = json_decode($eData, true);

  $email = $dData['email'];
  $password = $dData['password'];
  $token = $dData['token'];

  include "../classes/dbh.classes.php";
  include "../classes/PasswordRecoveryForm/password-recovery-form.classes.php";
  include "../classes/PasswordRecoveryForm/password-recovery-form-controler.classes.php";

  $passwordRecovery = new PasswordRecoveryFormControler($email, $password, $token);
  $passwordRecovery -> resetPassword();

?>