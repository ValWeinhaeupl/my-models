<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
    <link rel="icon" href="public/icons/home.png">
    <!-- <script src="register.js" defer></script> -->
    <?php
        include "public/php_bausteine/imports.php";
    ?>
    <script src="upload.js" defer></script>
</head>
<body>
<?php
include "public/php_bausteine/header.php";
?>

<div id="uploadcontainer">
    <h1>
        Upload your <img src="public/icons/models.png" style="height:8vh;filter:invert(100%)">!
    </h1>
    <form id="uploadform">
        Title <input type="text" id="title" name="title"><br>
        Description <input type="text" id="desc" name="desc"><br>
        Tags <input id="tags" name="tags" type="text" placeholder="low-poly, computer, ..."><br>
        Thumbnail <input id="thumb" name="thumb" type="file" accept="image/*"><br>
        Object <input id="object" name="object" type="file" accept=".glb, .gltf"><br>
        <div onclick="upload()"><img src="public/icons/uploadbutton.png" id="uploadbutton"></div>
    </form>
</div>

<?php
        include "public/php_bausteine/navbar.php";
    ?>
</body>
</html>