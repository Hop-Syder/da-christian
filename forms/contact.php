<?php
require '../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Configuration SMTP
$mail = new PHPMailer(true);
try {
  // Paramètres du serveur
  $mail->isSMTP();
  $mail->Host = 'smtp.gmail.com';
  $mail->SMTPAuth = true;
  $mail->Username = getenv('EMAIL_USERNAME');
  $mail->Password = getenv('EMAIL_PASSWORD');
  $mail->SMTPSecure = 'tls';
  $mail->Port = 587;

  // Destinataires
  $mail->setFrom($_POST['email'], $_POST['name']);
  $mail->addAddress('ismael@da-christian.xyz');

  // Contenu
  $mail->isHTML(false);
  $mail->Subject = $_POST['subject'];
  $mail->Body = $_POST['message'];

  $mail->send();
  echo json_encode(['status' => 'success']);
} catch (Exception $e) {
  echo json_encode(['status' => 'error', 'message' => $mail->ErrorInfo]);
}
