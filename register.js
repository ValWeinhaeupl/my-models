let username = document.getElementById('username');
let password = document.getElementById('password').value;
let password2 = document.getElementById('password2').value;




function register(){
    username = document.getElementById('username').value;
    password = document.getElementById('password').value;
    password2 = document.getElementById('password2').value;

if(username.length > 3 && password == password2){
    fetch("server.php?value=" + username + "|" + password)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            if(data){
                localStorage.setItem("login", username);
                location.href="index.php";
            }else{
                document.getElementsByTagName("form") += "<p>Benutzer existiert bereits!</p>";
            }
        })
        .catch((error) => {
            console.error(error);
        })
}else{
    console.log("password fail");
}
    
}


function logout(){
    localStorage.setItem("login", null); 
    location.reload();
}