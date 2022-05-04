<?php

$_db_host = "localhost";
    $_db_datenbank = "my-models";
    $_db_username = "mymodel_user";
    $_db_passwort = "database";

    SESSION_START();

    $conn = new mysqli($_db_host, $_db_username, $_db_passwort, $_db_datenbank);



    //post daten in datenbank eintragen
    if(isset($_POST["title"])){
        $useridtemp = $_POST["username"];
        // $selectuserid = 'select username from benutzer where username = "'.  .'";';
        // $userid = $conn->query($selectuserid);
       
        // if($userid->num_rows > 0){
        //     while($row = $userid->fetch_assoc()){
        //         $useridtemp = $row["username"];
        //     }
        // }

        $insertpost = "insert into post (username, Name, Beschreibung, Tags) values('". $useridtemp ."', '". $_POST["title"] ."', '". $_POST["desc"] ."', '".  $_POST["tags"] ."');";
        $conn->query($insertpost);

        $getpostnr = "select PostNr from post where username = '" . $useridtemp . "' and Name = '". $_POST["title"] . "' and Beschreibung = '" . $_POST["desc"] ."' and Tags = '" . $_POST["tags"] . "';";
        //$getpostnr = "select PostNr from post where BenutzerNr = 66 and name = 'sdfdsa' and Beschreibung = 'asdsa' and Tags = 'asdfdsa';";
        $postidtemp = $conn->query($getpostnr);
        $postid = "";
        if($postidtemp->num_rows > 0){
                while($row = $postidtemp->fetch_assoc()){
                    $postid = $row["PostNr"];
                }
        }

    $pathobject = "remotefiles/objects/" . $postid . ".glb";
    move_uploaded_file($_FILES["object"]["tmp_name"], $pathobject);

    $paththumb = "remotefiles/thumbnails/" . $postid . ".png";
    move_uploaded_file($_FILES["thumb"]["tmp_name"], $paththumb);

    $updatepath = "update post set ObjektPath = '" . $pathobject . "' where username = '" . $useridtemp . "' and Name = '". $_POST["title"] . "' and Beschreibung = '" . $_POST["desc"] ."' and Tags = '" . $_POST["tags"] . "';";
    $conn->query($updatepath);

    $updatepath = "update post set ThumbPath = '" . $paththumb . "' where username = '" . $useridtemp . "' and Name = '". $_POST["title"] . "' and Beschreibung = '" . $_POST["desc"] ."' and Tags = '" . $_POST["tags"] . "';";
    $conn->query($updatepath);
    
    echo json_encode(true);
}
?>