<?php
    // if(isset($_POST['send'])){
    //     $eingabe = array();
    //     $error = array();

    //     if(isset($_POST['username']) && strlen(trim($_POST['username'])) && !is_array($_POST['username'])){
    //         $eingabe['vorname'] = htmlspecialchars(trim($_POST['username']));
    //         echo json_encode($eingabe['vorname']);
    //     }else{
    //         $error['username'] = "username episch";
    //     }

    // }

    //check nach user auf datenbank
    //$value = ;

    

    $_db_host = "localhost";
    $_db_datenbank = "my-models";
    $_db_username = "mymodel_user";
    $_db_passwort = "database";

    SESSION_START();

    $conn = new mysqli($_db_host, $_db_username, $_db_passwort, $_db_datenbank);

    //login
    
    //profilbild

    if(isset($_POST["username"])){
        echo "test";

        $insert = "insert into benutzer (username, password, email) values('" . $_POST["username"] . "', md5('" . $_POST["password"] ."'), '". $_POST["email"] ."');";
            
            $conn->query($insert);

            $insertfeed = "insert into feed (username) values('" . $_POST["username"] ."');";
            $conn->query($insertfeed);

            $getfeedno = "select FeedNr from feed where username = '" . $_POST["username"] . "';";
            $feedno = $conn->query($getfeedno);
            $tempfeednr = null;
            while($row = $feedno->fetch_assoc()){
                $tempfeednr = $row["FeedNr"];
            }
            
            $insertfeedno = "update benutzer set FeedNr = " . $tempfeednr. " where username = '" . $_POST["username"] . "';"; 
            $conn->query($insertfeedno);

            $pathpb = "remotefiles/profile-pictures/" . $_POST["username"] . ".png";
            move_uploaded_file($_FILES["profilbild"]["tmp_name"], $pathpb);

            $updatepath = "update benutzer set profilepicture = '" . $pathpb . "' where username = '" . $_POST["username"] . "';";
            $conn->query($updatepath);

            echo  json_encode(true);
    }

    // if(isset($_GET["register"])){
    //     $logindata = json_decode($_GET["register"]);
    //     if($conn->connect_error){
    //      die("Connection failed: " . $conn->connection_error);
    //     }

    //         $insert = "insert into benutzer (username, password, email) values('" . $_POST["username"] . "', md5('" . $_POST["password"] ."'), '". json_encode($_POST["email"]) ."');";
            
    //         $conn->query($insert);

    //         $insertfeed = "insert into feed (username) values('" . $_POST["username"] ."');";
    //         $conn->query($insertfeed);

    //         $getfeedno = "select FeedNr from feed where username = '" . $_POST["username"] . "';";
    //         $feedno = $conn->query($getfeedno);
    //         $tempfeednr = null;
    //         while($row = $feedno->fetch_assoc()){
    //             $tempfeednr = $row["FeedNr"];
    //         }
            
    //         $insertfeedno = "update benutzer set FeedNr = " . $tempfeednr. " where username = '" . $_POST["username"] . "';"; 
    //         $conn->query($insertfeedno);
    //         echo json_encode(true);
    // }

  

    if(isset($_GET["getposts"])){
        $data = array();

        $selectposts = "select * from post p inner join benutzer b on p.username = b.username";
        $resultset = $conn->query($selectposts);

        $temp = 0;
        while($row = $resultset->fetch_assoc()){
            $temp++;
            $tempobj = array(
                "PostNr" => $row["PostNr"],
                "username" => $row["username"],
                "ObjektPath" => $row["ObjektPath"],
                "Name" => $row["Name"],
                "Beschreibung" => $row["Beschreibung"],
                "Tags" => $row["Tags"],
                "Likes" => $row["Likes"],
                "ThumbPath" => $row["ThumbPath"]
            );

            $data[] = $tempobj;
        }
        echo json_encode($data);
    }

    if(isset($_GET["getuserposts"])){
        $data = array();

        //inner join funktioniert nicht
        $selectposts = "select * from post p inner join benutzer b on p.username = b.username where username = '" . $_GET["getuserposts"] . "'";
        $resultset = $conn->query($selectposts);

        $temp = 0;
        while($row = $resultset->fetch_assoc()){
            $temp++;
            $tempobj = array(
                "PostNr" => $row["PostNr"],
                "username" => $row["username"],
                "ObjektPath" => $row["ObjektPath"],
                "Name" => $row["Name"],
                "Beschreibung" => $row["Beschreibung"],
                "Tags" => $row["Tags"],
                "Likes" => $row["Likes"],
                "ThumbPath" => $row["ThumbPath"]
            );

            $data[] = $tempobj;
        }
        echo json_encode($data);
    }
        
    if(isset($_GET["comment"])){
        $commentdata = json_decode($_GET["comment"]);
        $insertcomment = "insert into kommentar (username, PostNr, Text) values('$commentdata->username', $commentdata->postnr, '$commentdata->text');";
        $conn->query($insertcomment);

        echo json_encode("uploaded");
    }


    if(isset($_GET["getcomments"])){
        $selectcomments = "SELECT * FROM kommentar where postNr = ". $_GET["getcomments"] .";";
        $rs = $conn->query($selectcomments);
        $tempdata = [];
        while($row = $rs->fetch_assoc()){
            $tempobj = array(
                "username" => $row["username"],
                "text" => $row["Text"]
            );
            $tempdata[] = $tempobj;
        }
        echo json_encode($tempdata);
    }

    if(isset($_GET["viewuser"])){
        echo json_encode("asdf");
        $selectuserdata = "select * from post where username = '" . $_GET["viewuser"] . "';";
        $rs = $conn->query($selectuserdata);
        $tempdata = [];
        while($row = $rs->fetch_assoc()){
            $tempdata[] = $row;
        }
        echo json_encode($tempdata);
    }



//post files
        //  if(isset($_GET["upload"])){
        //     $data = json_decode($_GET["upload"]);

        //     $selectuserid = 'select BenutzerNr from benutzer where username = "'. $data->username .'";';
        //     $userid = $conn->query($selectuserid);
        //     $useridtemp = "";
        //     if($userid->num_rows > 0){
        //         while($row = $userid->fetch_assoc()){
        //             $useridtemp = $row["BenutzerNr"];
        //         }
        //     }

        //     $insertpost = "insert into post (BenutzerNr, ObjektPath, ThumbPath, Name, Beschreibung, Tags, Likes) values(". $useridtemp .", 'remotefiles/objects/1.glb', 'remotefiles/thumbnails/Unbenannt-1.png', '". $data->title ."', '". $data->description ."', '".  $data->tags ."', 0);";
        //     $conn->query($insertpost);

        //     echo json_encode(true);
        // }
//$conn->close();


?>