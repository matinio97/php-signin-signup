<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Luckiest+Guy&family=Oswald:wght@400;500;700&family=Pacifico&family=Poppins:wght@400;500;600;700&family=Roboto+Mono:wght@300;400;500;600;700&family=Roboto:wght@400;700&family=Rubik:wght@700&display=swap" rel="stylesheet">
  <title>Potwierdzenie adresu email</title>
  <style>
    html{
      font-family: Rubik, Roboto, sans-serif;
    }
    * {
      margin: 0;
      padding: 0;
    }
    main{
      height: 100vh;
      background-color: #ddd;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    span {
      z-index: 999;
      color: #222;
      font-size: 2.4rem;
    }
  </style>
</head>
<body>
  <main>
    <?php
      include "../classes/dbh.classes.php"; 
      include "../classes/EmailVerify/email-verify.classes.php"; 
      include "../classes/EmailVerify/email-verify-controler.classes.php"; 

      if(isset($_GET['token'])){
        $token = $_GET['token'];
        
        $emailVerify = new EmailVerifyControler($token);
        $emailVerify->verifyEmail();
      }
    ?>
</main>
</body>
</html>