<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My-Models</title>
    <link rel="icon" href="public/icons/icone.png">
    <link rel="stylesheet" href="style.css">
    <script src="register.js" defer></script>
    <script src="public/hashing/md5.js"></script>
</head>
<body>
    <script>
        function switchregister(){
            document.getElementById("loginbox").innerHTML = '<p>Username/password</p><input type="text" id="username"><p>Password</p><input type="password" id="password"><p>Repeat Password</p><input type="password" id="password2"><p>E-mail</p><input type="text" id="email"><p>Profilepicture</p><input type="file" name="profilbild" id="profilbild"><button onclick="register()" id="register">Register</button>';
        }
        function switchlogin(){
            document.getElementById("loginbox").innerHTML = '<p>Username</p><input type="text" id="username"><p>Password</p><input type="password" id="password"><button onclick="login()">Login</button>';
        }
    </script>
<?php
        include "public/php_bausteine/header.php";
    ?>
    <div id="logincontainer">
        <button onclick="switchregister()">Register</button>
        <button onclick="switchlogin()">Login</button>
    <h2>Register</h2>
    
        <div id="loginbox">
        <p>Username</p><input type="text" id="username">
        <p>Password</p><input type="password" id="password">
        <p>Repeat Password</p><input type="password" id="password2">
        <p>E-mail</p><input type="text" id="email">
        <p>Profilepicture</p><input type="file" name="profilbild" id="profilbild">
        <button onclick="register()" id="register">Register</button>
        </div>
    
        
    </div>
    
</body>
</html>