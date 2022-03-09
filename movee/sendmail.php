<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require 'resources/phpmailer/src/Exception.php';
  require 'resources/phpmailer/src/PHPMailer.php';

  $mail = new PHPMailer(true);
  $mail->CharSet = 'UTF-8';
  $mail->setLanguage('ru', 'resources/phpmailer/language/');
  $mail->IsHTML(true);

  $name = $_POST['name'];
  $phone = $_POST['phone'];
  $email = $_POST['email'];

  $mail->setFrom('alexsross@yandex.ru', 'Movee'); // От кого письмо
  $mail->addAddress('all.shvets.st@gmail.com');
  // $mail->addAddress($email); // отправка пользователю на почту (строку выше закоментировать)
  $mail->Subject = 'Заявка с сайта'; // Тема письма

  // Рука
  // $hand = "Правая";
  // if($_POST['hand'] == "left"){
  //   $hand = "Левая";
  // }

  // Тело письма
  $body = '<h1>Заявка с сайта</h1>';
  
  if(trim(!empty($name))){
    $body.='<p><strong>Имя:</strong> '.$name.'</p>';
  }
  if(trim(!empty($phone))){
    $body.='<p><strong>Телефон:</strong> '.$phone.'</p>';
  }
  if(trim(!empty($email))){
    $body.='<p><strong>Почта:</strong> '.$email.'</p>';
  }
  
  // Прикрепить файл
  if (!empty($_FILES['image']['tmp_name'])) {
    // путь загрузки файла
    $filePath = __DIR__ . "/img/" . $_FILES['image']['name']; 
    // грузим файл
    if (copy($_FILES['image']['tmp_name'], $filePath)){
      $fileAttach = $filePath;
      $body.='<p><strong>Фото в приложении</strong>';
      $mail->addAttachment($fileAttach);
    }
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