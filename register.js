let username = document.getElementById("username");
let password = document.getElementById("password").value;
let password2 = document.getElementById("password2").value;

function register() {
  document.getElementById("register").disabled = "disabled";
  document.getElementById("loading").style.opacity = "100%";

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

  if (username.length > 3 && password == password2) {
    fetch("server.php", {
      method: "post",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTimeout(() => {
          console.log(data);
          if (data) {
            console.log(data);

            console.log("yallah");
            localStorage.setItem("login", username);
            location.href = "index.php";
          } else {
            document.getElementById("loading").style.opacity = "0%";
            document.getElementById("fehler").innerHTML =
              "Username already exists";
            console.log("nein");
          }
          document.getElementById("register").removeAttribute("disabled");
        }, 3000);
      })
      .catch((error) => {
        check = false;
        console.error(error);
      });
  } else {
    document.getElementById("loading").style.opacity = "0%";
    document.getElementById("fehler").innerHTML =
      "Please enter a valid username and password";
    document.getElementById("register").removeAttribute("disabled");
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
        //console.log("test");
        document.getElementById("fehler").innerHTML =
          "Please enter valid userdata!";
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
