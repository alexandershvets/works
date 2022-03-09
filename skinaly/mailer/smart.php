<?php 

// $email = $_POST['email'];
$name = $_POST['username'];
$phone = $_POST['phone'];
$type = $_POST['type'];
$width = $_POST['width'];
$height = $_POST['height'];
$service = $_POST['service'];
$service = '';
if (!empty($_POST["service"]) && is_array($_POST["service"]))
{
    $service = implode(" ", $_POST["service"]);
}
// $services = nl2br(implode(',', $service));
$price = $_POST['price'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'al.shvets@list.ru';                 // Наш логин
$mail->Password = 'Zj63303as';                           // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('al.shvets@list.ru', 'Александр Швец');   // От кого письмо 
$mail->addAddress('alexsross@yandex.ru');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Новая заявка с сайта';
$mail->Body    = '
	Пользователь оставил свои данные: <br> 
	Имя: ' . $name . ' <br>
	Телефон: ' . $phone . ' <br>
	Вид стекла: ' . $type . ' <br>
	Ширана, см: ' . $width . ' <br>
	Высота, см: ' . $height . ' <br>
	Дополнительные услуги: ' . $service . ' <br>
	Цена: ' . $price . ' ';
$mail->AltBody = 'Это альтернативный текст';

if(!$mail->send()) {
    return false;
				// echo "Error";
} else {
    return true;
				// Выведется на экран Success
				// echo "Success";
				// Перебросит на нужную нам страницу
				// header('location: ../thank-you.html');
}