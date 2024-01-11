<?php

  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type, Authorization");

  $eData = file_get_contents("php://input");
  $dData = json_decode($eData, true);

  $email = $dData['email'];

  include "../classes/dbh.classes.php";
  include "../classes/PasswordRecoveryEmail/password-recovery.classes.php";
  include "../classes/PasswordRecoveryEmail/password-recovery-controler.classes.php";

  $passwordRecovery = new PasswordRecoveryControler($email);
  $passwordRecovery -> verifyEmail();

?>