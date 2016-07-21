<?php
if($_POST){
    $name = $_POST['name'];
    $email = $_POST['email'];
    //$message = $_POST['cmessage'];

//send email
    mail($email, "RE: [Project Subject]", "Test Message");
}
?>