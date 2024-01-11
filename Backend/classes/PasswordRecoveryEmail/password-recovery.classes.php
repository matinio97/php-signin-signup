<?php 

  header('Content-Type: application/json');
  require '../vendor/autoload.php';

  use PHPMailer\PHPMailer\PHPMailer;
  use Dotenv\Dotenv;
  $dotenv = Dotenv::createImmutable(__DIR__.'/../../');
  $dotenv -> load();

  class PasswordRecovery extends Dbh{

    protected function checkEmail($email){
      $statement = $this->connect()->prepare("SELECT users_email FROM users WHERE users_email = ?;");
      if(!$statement->execute(array($email))){
        $statement=null;
        exit();
      }
      if($statement->rowCount() !== 1) {
        $statement=null;
        http_response_code(400); 
        echo json_encode(array("error" => "Podany adres jest błędny", "field"=>"email"));
        exit();
      } else {
        $this->getData($email);
        echo "Na podany email wysłano instrukcję zmiany hasła";
      }
    }

    private function getData($email){
      $statement = $this->connect()->prepare("SELECT users_uid, verify_token, verify_status FROM users WHERE users_email = ?;");

      if(!$statement->execute(array($email))){
        $statement=null;
        http_response_code(500); 
        echo json_encode(array("error" => "Błąd serwera", "field"=>""));
        exit();
      }
      
      $data = $statement -> fetchAll(PDO::FETCH_ASSOC);
      $verifyStatus = $data[0]['verify_status'];
      
      if(!$verifyStatus) {
        $statement=null;
        http_response_code(400); 
        echo json_encode(array("error" => "Adres email nie jest potwierdzony", "field"=>""));
        exit();
      } else {
        $username = $data[0]['users_uid'];
        $verifyToken = $data[0]['verify_token'];
        $this->sendPasswordRecoveryEmail($email, $username, $verifyToken);
      }
    }

    private function sendPasswordRecoveryEmail($email, $username, $verifyToken){
      $mail = new PHPMailer(true);
   
      $mail->isSMTP();                                         
      $mail->SMTPAuth = true;     
      $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;      
      $mail->Port = 587;

      $mail->Host = 'smtp.gmail.com';                           
      $mail->Username = $_ENV['PHP_MAILER_EMAIL'];                           
      $mail->Password = $_ENV['PHP_MAILER_PASSWORD'];                            
  
      $mail->setFrom($_ENV['PHP_MAILER_EMAIL']);
      $mail->addAddress($email);    

      $mail->isHTML(true);   
      $mail->CharSet = "UTF-8";          
      $mail->Subject = "$username, Zresetuj hasło";
      $mail->Body = "
          <h2>Cześć!</h2>
          <h4>Wygląda na to, że zapomniałeś/aś hasła... Kiepska sprawa.<h4>
          <h4>Ale da się to jeszcze uratować! Kliknij w poniższy link i zmień hasło<h4>
          <br>
          <a href='http://localhost:5173/reset-password?token=$verifyToken'>Zmień hasło</a>
      ";
      $mail->Timeout = 60;
      $mail->send();
    }
  }

?>