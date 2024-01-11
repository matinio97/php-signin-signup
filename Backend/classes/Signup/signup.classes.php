<?php 

  require '../vendor/autoload.php';

  use PHPMailer\PHPMailer\PHPMailer;
  use Dotenv\Dotenv;
  
  $dotenv = Dotenv::createImmutable(__DIR__.'/../../');
  $dotenv -> load();
  
  class Signup extends Dbh{

    private function sendEmailVerify($name, $email, $verify_token){

      $mail = new PHPMailer(true);
   
      $mail->isSMTP();                                         
      $mail->SMTPAuth = true;     
      $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;      
      $mail->Port = 587;

      $mail->Host = 'smtp.gmail.com';                           
      $mail->Username = $_ENV['PHP_MAILER_EMAIL'];                           
      $mail->Password = $_ENV['PHP_MAILER_PASSWORD'];                            
  
      $mail->setFrom("mateusz.service.info@gmail.com");
      $mail->addAddress($email);    

      $mail->isHTML(true);   
      $mail->CharSet = "UTF-8";          
      $mail->Subject = "$name, potwierdź swój adres";
      $mail->Body = "
          <h2>Cześć!</h2>
          <h4>Aby móc korzystać z konta, potwierdź adres email klikając poniższy link<h4>
          <br><br>
          <a href='http://localhost/php_course/oop_login/Backend/includes/email-verify.inc.php?token=$verify_token'>Potwierdź email</a>
      ";
      $mail->Timeout = 60;
      $mail->send();
    }

    protected function setUser($username, $password, $email){
      $statement = $this->connect()->prepare('INSERT INTO users (users_uid, users_pwd, users_email, verify_token) VALUES (?, ?, ?, ?);');

      $verify_token = md5(rand());
      $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

      $this->sendEmailVerify($username, $email, $verify_token);

      if(!$statement->execute(array($username, $hashedPassword, $email, $verify_token))){
        $statement = null;
        exit();
      }
      $statement = null;

      echo "Konto utworzone, potwierdź adres email";
    }

    protected function checkUsername($username){
      $statement = $this->connect()->prepare('SELECT users_id FROM users WHERE users_uid = ?;');

      if(!$statement->execute(array($username))){
        $statement = null;
        exit();
      }

      $result = null;
      if($statement->rowCount()> 0){
        $result = false;
      } else {
        $result = true;
      }

      return $result;
    }

    protected function checkUserEmail($email){
      $statement = $this->connect()->prepare('SELECT users_id FROM users WHERE users_email = ?;');

      if(!$statement->execute(array($email))){
        $statement = null;
        exit();
      }

      $result = null;
      if($statement->rowCount()> 0){
        $result = false;
      } else {
        $result = true;
      }
      return $result;
    }
  }

?>