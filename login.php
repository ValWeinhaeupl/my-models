<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="icon" href="public/icons/icone.png">
    <link rel="stylesheet" href="style.css">
    <script src="register.js" defer></script>
    
</head>
<body>
<?php
        include "public/php_bausteine/header.php";
    ?>
    <h2>Register</h2>
    <!-- <form  action="server.php" method="post"> -->
        <form>
        Username<input type="text" id="username">
        Password<input type="password" id="password">
        Repeat Password<input type="password" id="password2">
        
    </form>
    <button onclick="register()">Register</button>
</body>
</html>