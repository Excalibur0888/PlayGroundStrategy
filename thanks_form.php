<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    $tel = isset($_POST["tel"]) ? $_POST["tel"] : "";
    
    $to = "contact@" . $_SERVER['HTTP_HOST'];
    $subject = "New Contact Form Submission";
    
    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    if (!empty($tel)) {
        $body .= "Tel: $tel\n";
    }
    $body .= "Message:\n$message";
    
    $headers = "From: $email \r\n";
    $headers .= "Reply-To: $email \r\n";
    
    mail($to, $subject, $body, $headers);
    
    // Redirect to thank you page
    header("Location: thanks.html");
    exit();
}
?>
