let username = document.getElementById("username");
let password = document.getElementById("password").value;
let password2 = document.getElementById("password2").value;

function register() {
  username = document.getElementById("username").value;
  password = document.getElementById("password").value;
  password2 = document.getElementById("password2").value;
  email = document.getElementById("email").value;
  profilepicture = document.getElementById("profilbild").files[0];

  let formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("email", email);
  formData.append("profilbild", profilepicture);

  //in json senden für bessere wartung
  // if(username.length > 3 && password == password2){
  //     fetch("server.php?register=" + JSON.stringify(registerdata))
  //         .then((response) => {
  //             return response.json();
  //         })
  //         .then((data) => {

  //         })
  //         .catch((error) => {
  //             console.error(error);
  //         })
  // }else{
  //     console.log("password fail");
  // }
  if (username.length > 3 && password == password2) {
    fetch("server.php", {
      method: "post",
      body: formData,
    })
      .then((response) => {
        //setTimeout(() => {

        return response.json();
      })
      .then((data) => {
        console.log(data);
        if(data){
            console.log(data);
                if(data){
                    console.log("yallah");
                    localStorage.setItem("login", username);
                    location.href="index.php";
                }else{
                    console.log("error");
                document.getElementsByTagName("form") += "<p>Benutzer existiert bereits!</p>";
                }
        }else{
            console.log("nein");
        }
      })
      .catch((error) => {
        check = false;
        console.error(error);
      });
  } else {
    console.log("bruh");
  }
}

function login() {
  let email_username = document.getElementById("username").value;
  //direkt gehasht, um passwort nicht an server zu schicken
  let password = md5(document.getElementById("password").value);
  let logindata = {
    email_username: email_username,
    password: password,
  };
  fetch("server.php?login=" + JSON.stringify(logindata))
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data == true) {
        //nicht fertig
        localStorage.setItem("login", email_username);
        location.href = "index.php";
      } else if (data != false) {
        localStorage.setItem("login", data);
        location.href = "index.php";
      } else if (data == false) {
        console.log(data);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function logout() {
  localStorage.setItem("login", null);
  location.reload();
}
