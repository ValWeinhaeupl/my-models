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
    <script>
        
    </script>
<?php
        include "public/php_bausteine/header.php";
    ?>
    <div id="logincontainer">
    <h2>Register</h2>
    
        <div id="loginbox">
        <p>Username</p><input type="text" id="username">
        <p>Password</p><input type="password" id="password">
        <p>Repeat Password</p><input type="password" id="password2">
        <p>E-mail</p><input type="text" id="email">
        <p>cock</p><input type="file" name="profilbild" id="profilbild">
        </div>
    
        <button onclick="register()">Register</button>
    </div>
    
</body>
</html>