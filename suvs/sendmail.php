<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require 'phpmailer/src/Exception.php';
  require 'phpmailer/src/PHPMailer.php';

  $mail = new PHPMailer(true);
  $mail->CharSet = 'UTF-8';
  $mail->setLanguage('ru', 'resources/phpmailer/language/');
  $mail->IsHTML(true);

  $name = $_POST['VH-name'];
  $phone = $_POST['VH-phone'];
  $user_message = $_POST['Message'];

  $mail->setFrom('alexsross@yandex.ru', 'Внедорожники'); // От кого письмо
  $mail->addAddress('all.shvets.st@gmail.com'); // Кому отправить
  $mail->Subject = 'Заявка с сайта'; // Тема письма


  // Тело письма
  $body = '<h1>Заявка с сайта</h1>';

  if(trim(!empty($name))){
    $body.='<p><strong>Имя:</strong> '.$name.'</p>';
  }
  if(trim(!empty($phone))){
    $body.='<p><strong>Телефон:</strong> '.$phone.'</p>';
  }
  if(trim(!empty($user_message))){
    $body.='<p><strong>Сообщение:</strong> '.$user_message.'</p>';
  }

  $mail->Body = $body;

  // Отправляем
  if (!$mail->send()) {
    $message = 'Ошибка';
  } else {
    $message = 'Данные отправлены!';
  }

  $response = ['message' => $message];

  header('Content-type: application/json');
  echo json_encode($response);
?>
