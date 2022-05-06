<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
    <script src="register.js" defer></script>
    <?php
        include "public/php_bausteine/imports.php";
        
    ?>
</head>
<body>
    <?php
    include "public/php_bausteine/poststuff.php";
    include "public/php_bausteine/header.php";
    ?>

<!-- in app.js wird loaddata aufgerufen, manipulieren -->
<div id="userdata"><img id="profilepb"><h1 id="profileusername"></h1></div>
    <div id="container">

    </div>
    <?php
        include "public/php_bausteine/navbar.php";
    ?>
</body>
</html>