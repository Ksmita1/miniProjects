<?php
    if(isset($_POST['submit'])) {
        $name = trim($_POST['name']);
        $email = trim($_POST['email']);
        $message = trim($_POST['message']);

        if(!empty($name) && !empty($email) && !empty($message)) {
            if(filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $from = "$email";
                $to = "karolissmita@yahoo.com";
                $subject = "New message";
                $sender = 'From: ' . $name . ', ' . $email;
                $senderMessage = htmlspecialchars($message);
                mail($to, $subject, $sender, $senderMessage, $from);
                echo "<script>alert('Thank you. Your message received. We will contact you shortly.');</script>";
            }
        }
        include 'db.php';
    }
?>