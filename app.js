var superdata;

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
      superdata = data;

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
      if (data.length == 0) {
        console.log(document.getElementById("container"));
        container.style.height = "50vh";
        container.innerHTML +=
          "<div id='nopostwrapper'><p id='noposts'>User doesn't have any posts :(</p><a href='index.php' id='goback'>See More Posts</a></div>";
      } else {
        superdata = data;
        document.getElementById("userdata").style.display = "flex";
        loadposts(data);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

//suchfunktionen
const fallback = container.innerHTML;

function search() {
  let searchword = document.getElementById("searchbar").value;
  if (searchword.length == 0) {
    loadposts(superdata);
    document.getElementById("userdata").style.height = "10vh";
  } else {
    fetch("server.php?search=" + searchword)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        loadposts(data);
        document.getElementById("userdata").style.height = "0";

        leave();
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

function searchtags(v) {
  let searchword = v;

  fetch("server.php?search=" + searchword)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      loadposts(data);
      leave();
    })
    .catch((error) => {
      console.error(error);
    });
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
  console.log(user);
  //leave();
  fetch("server.php?getuserposts=" + user)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.length == 0) {
        document.getElementById("userdata").style.display = "none";
        console.log(document.getElementById("container"));
        leave();
        container.style.height = "50vh";
        container.innerHTML = "";
        container.innerHTML +=
          "<div id='nopostwrapper'><p id='noposts'>User doesn't have any posts :(</p><a href='index.php' id='goback'>See More Posts</a></div>";
      } else {
        superdata = data;
        document.getElementById("userdata").style.display = "flex";
        leave();
        loadposts(data);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
