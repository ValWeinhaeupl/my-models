if (localStorage.getItem("login") == "null") {
  // document.getElementById("login").innerHTML = "<a href='login.php'>Login/Register</a>";
  location.href = "login.php";
} else {
  document.getElementById("login").innerHTML =
    "<img src='public/icons/logout.png' onclick='logout()'>";
}

let currentpost;

let container = document.getElementById("container");

let parameter = "";
if (!location.href.includes("user.php")) {
  fetch("server.php?getposts=true")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      //wichtig

      loadposts(data);
    })
    .catch((error) => {
      console.error(error);
    });
  console.log("schme");
} else {
  console.log("user");
  fetch(
    "server.php?getuserposts=" +
      localStorage.getItem("login").split("|")[0] +
      ""
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      //wichtig
      document.getElementById("userdata").style.display = "flex";
      loadposts(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

//suchfunktionen
const fallback = container.innerHTML;

function search() {
  let searchword = document.getElementById("searchbar").value;
  let searchdata = [];
  if (searchword != "") {
    for (let i = 0; i < data.models.length; i++) {
      for (let j = 0; j < data.models[i].Tags.length; j++) {
        if (data.models[i].Tags[j].includes(searchword)) {
          // console.log(data.models[i]);
          searchdata.push(data.models[i]);
          break;
        }
      }
    }
    loadposts(searchdata);
  } else {
    container.innerHTML = fallback;
  }
}

//scrolleffekt
window.onscroll = () => {
  // console.log(window.scrollY);
  if (window.scrollY > 200) {
    document.getElementById("search").style.top = "-20vh";
  } else {
    document.getElementById("search").style.top = "0vh";
  }
};

//comments
let commentbox = document.getElementById("commenttext");
let commentcontainer = document.getElementById("commentcontainer");

commentbox.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    comment();
  }
});

function comment() {
  //data.models[currentpost].kommentare.push(commentbox.value);
  let commentdata = {
    username: localStorage.getItem("login").split("|")[0],
    postnr: sessionStorage.getItem("currentpost"),
    text: commentbox.value,
  };

  fetch("server.php?comment=" + JSON.stringify(commentdata))
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });

  // commentcontainer.innerHTML += "<p>" + commentbox.value + "</p>";
  document.getElementById("commentcontainer").innerHTML +=
    "<div id='comment'><h2 onclick='viewuser(" +
    JSON.stringify(localStorage.getItem("login")) +
    ")'>" +
    localStorage.getItem("login") +
    "</h2><p>" +
    commentbox.value +
    "</p></div>";
  commentbox.value = "";
}

function viewuser(user) {
  document.getElementById("userdata").style.display = "flex";
  console.log(user);
  //leave();
  fetch("server.php?getuserposts=" + user)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      //wichtig
      leave();
      loadposts(data);
    })
    .catch((error) => {
      console.error(error);
    });
}
