<?php

require_once '../vendor/autoload.php';
$mail = new PHPMailer();
$mail->isSMTP();
$mail->SMTPAuth = true;
$mail->CharSet = 'UTF-8';

$mail->Host = 'smtp.sendgrid.net';
$mail->Username = 'aventador_21';
$mail->Password = '';

$mail->SMTPSecure = 'ssl';
$mail->Port = 465;

$json = file_get_contents('php://input');
$data = json_decode($json);

$response = array();

////From email address and name
$mail->From = 'noreply@framin.in';
$mail->FromName = $data->name . ' (via. Framin.in - Website)';

//To address and name
$mail->addAddress('clinton92@gmail.com', 'Clinton D\'souza');

//Address to which recipient will reply
$mail->addReplyTo(trim($data->address), $data->name);

// indicates ReturnPath header
$mail->Sender = trim($data->address);

//Send HTML or Plain Text email
$mail->isHTML(false);

$mail->Subject = $data->subject;
$mail->Body = htmlentities($data->msg);
$mail->AltBody = htmlentities($data->msg);

if (!$mail->send()) {
    $response['status'] = 'Error';
    $response['message'] = $mail->ErrorInfo;
} else {
    $response['status'] = 'Success';
    $response['message'] = 'Message Sent';
}
echo json_encode($response);


