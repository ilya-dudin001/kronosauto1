<?php

$to = 'sales@kronos-avto.ru';
$name = $_POST['f_Name'];
$phone = $_POST['f_Phone'];
$car = $_POST['f_Auto'];
$call_type = $_POST['call_type'];

$from = 'site@kronos-avto.ru';
$subject = 'Новый запрос на сайте!';
$body = 'Новый запрос на покупку авто:\n Имя: '.$name.'\n'.'Номер телефона: '.$phone.'\n'.'Запрос на автомобиль: '.$car;

$headers = "From: $from \r\n";
$headers .= "Reply-To: $to \r\n";

var_dump($_POST);

if(mail($to,$subject,$body,$headers)) {
    echo 'Sent!';
}
else {
    echo 'Not sent!';
}
?>