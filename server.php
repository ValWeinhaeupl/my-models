<?php
    $_db_host = "localhost";
    $_db_datenbank = "my-models";
    $_db_username = "mymodel_user";
    $_db_passwort = "database";

    SESSION_START();

    $conn = new mysqli($_db_host, $_db_username, $_db_passwort, $_db_datenbank);

    //login
    
    //profilbild

    if(isset($_POST["username"])){
        //echo "test";

        $getusers = "select username from benutzer;";
        $rsusers = $conn->query($getusers);
        $check = true;
        while($row = $rsusers->fetch_assoc()){
            if($row["username"] == $_POST["username"]){
                $check = false;
            }
        }

        if($check == true){
            $insert = "insert into benutzer (username, password, email) values('" . $_POST["username"] . "', md5('" . $_POST["password"] ."'), '". $_POST["email"] ."');";
            //catch, return false
            $conn->query($insert);

            

            $pathpb = "remotefiles/profile-pictures/" . $_POST["username"] . ".png";
            move_uploaded_file($_FILES["profilbild"]["tmp_name"], $pathpb);

            $updatepath = "update benutzer set profilepicture = '" . $pathpb . "' where username = '" . $_POST["username"] . "';";
            $conn->query($updatepath);

            echo json_encode(true);
        }else{
            echo json_encode(false);
        }
        
    }



  

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
                "ThumbPath" => $row["ThumbPath"],
                "profilepicture" => $row["profilepicture"]
            );

            $data[] = $tempobj;
        }
        echo json_encode($data);
    }

    if(isset($_GET["getuserposts"])){
        $data = array();

        //inner join funktioniert
        $selectposts = "select * from post p inner join benutzer b on p.username = b.username where p.username = '" . $_GET["getuserposts"] . "'";
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
                "ThumbPath" => $row["ThumbPath"],
                "profilepicture" => $row["profilepicture"]
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

    if(isset($_GET["login"])){
        $data = json_decode($_GET["login"]);
        $selectusername = "select * from benutzer where username = '" . $data->email_username . "';";
        $rs = $conn->query($selectusername);
        while($row = $rs->fetch_assoc()){
            if($row["password"] == $data->password){
                echo json_encode(true);
            }else{
                echo json_encode(false);
            }
        }

        //$data = json_decode($_GET["login"]);
        $selectusername = "select * from benutzer where email = '" . $data->email_username . "';";
        $rs = $conn->query($selectusername);
        while($row = $rs->fetch_assoc()){
            if($row["password"] == $data->password){
                if(str_contains($data->email_username, "@")){
                    $getusername = "select username from benutzer where email = '" . $data->email_username ."';";
                    $rs = $conn->query($getusername);
                    while($row = $rs->fetch_assoc()){
                        echo json_encode($row["username"]);
                    }
                }else{
                    //echo json_encode(true);
                }
            }else{
                echo json_encode(false);
            }
        }

        //echo json_encode(false);
        
    }

    if(isset($_GET["search"])){
        $search = $_GET["search"];
        $getsearchposts = "select * from post where username like '%" .  $search . "%' or name like '%" .  $search . "%' or tags like '%" . $search . "%'";
    
        $rs = $conn->query($getsearchposts);
        $tempdata = [];
        while($row = $rs->fetch_assoc()){
            $tempdata[] = $row;
        }
        echo json_encode($tempdata);
    }

?>