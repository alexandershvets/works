<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require 'phpmailer/src/Exception.php';
  require 'phpmailer/src/PHPMailer.php';

  $mail = new PHPMailer(true);
  $mail->CharSet = 'UTF-8';
  $mail->setLanguage('ru', 'resources/phpmailer/language/');
  $mail->IsHTML(true);

  $name = $_POST['name'];
  $email = $_POST['email'];
  $user_message = $_POST['message'];

  $mail->setFrom('alexsross@yandex.ru', 'MVP Development'); // От кого письмо
  $mail->addAddress('all.shvets.st@gmail.com'); // Кому отправить
  // $mail->addAddress($email); // отправка пользователю на почту (строку выше закоментировать)
  $mail->Subject = 'Application from the website'; // Тема письма

  // Тело письма
  $body = '<h1>Application from the website</h1>';

  if(trim(!empty($name))){
    $body.='<p><strong>Name:</strong> '.$name.'</p>';
  }
  if(trim(!empty($email))){
    $body.='<p><strong>Email:</strong> '.$email.'</p>';
  }

  $mail->Body = $body;

  // Отправляем
  if (!$mail->send()) {
    $message = 'Error';
  } else {
    $message = 'Data sent!';
  }

  $response = ['message' => $message];

  header('Content-type: application/json');
  echo json_encode($response);
?>
