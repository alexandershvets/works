<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require 'phpmailer/src/Exception.php';
  require 'phpmailer/src/PHPMailer.php';

  $mail = new PHPMailer(true);
  $mail->CharSet = 'UTF-8';
  $mail->setLanguage('ru', 'resources/phpmailer/language/');
  $mail->IsHTML(true);

  $name        = $_POST['name'];
  $org         = $_POST['org'];
  $phone       = $_POST['phone'];
  $email       = $_POST['email'];
  $messageUser = $_POST['message'];
  $date        = $_POST['date'];
  $quantity    = $_POST['quantity'];

  $mail->setFrom('alexsross@yandex.ru', 'Металлообработка'); // От кого письмо
  $mail->addAddress('all.shvets.st@gmail.com'); // Кому отправить
  // $mail->addAddress($email); // отправка пользователю на почту (строку выше закоментировать)
  $mail->Subject = 'Заявка с сайта'; // Тема письма

  // Тело письма
  $body = '<h1>Заявка с сайта</h1>';

  if(trim(!empty($name))){
    $body.='<p><strong>Имя:</strong> '.$name.'</p>';
  }
  if(trim(!empty($org))){
    $body.='<p><strong>Организация:</strong> '.$org.'</p>';
  }
  if(trim(!empty($phone))){
    $body.='<p><strong>Телефон:</strong> '.$phone.'</p>';
  }
  if(trim(!empty($email))){
    $body.='<p><strong>Почта:</strong> '.$email.'</p>';
  }
  if(trim(!empty($messageUser))){
    $body.='<p><strong>Сообщение:</strong> '.$messageUser.'</p>';
  }
  if(trim(!empty($date))){
    $body.='<p><strong>Срок до:</strong> '.$date.'</p>';
  }
  if(trim(!empty($quantity))){
    $body.='<p><strong>Количество:</strong> '.$quantity.'</p>';
  }

  // Прикрепить файл
  // if (!empty($_FILES['file']['tmp_name'])) {
  //   // путь загрузки файла
  //   $filePath = __DIR__ . "/files/" . $_FILES['file']['name'];
  //   // грузим файл
  //   if (copy($_FILES['file']['tmp_name'], $filePath)){
  //     $fileAttach = $filePath;
  //     $body.='<p><strong>Файл в приложении</strong>';
  //     $mail->addAttachment($fileAttach);
  //   }
  // }

  // Прикрепить файл
  if (!empty($_FILES['file']['tmp_name'])) {
    $fileAttach = $_FILES['file']['tmp_name'];
    $body.='<p><strong>Файл в приложении</strong>';
    $mail->addAttachment($fileAttach);
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
