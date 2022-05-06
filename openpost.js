let hdri = "public/hdri/country.hdr";

let hdris = [
  "country.hdr",
  "abandoned_workshop_02_2k.hdr",
  "autumn_forest_04_2k.hdr",
  "ehingen_hillside_2k.hdr",
  "kloofendal_38d_partly_cloudy_2k.hdr",
  "studio_small_09_2k (1).hdr",
];

window.onload = () => {
  post.style.display = "none";
};

let hdricheck = false;
let isset = false;
let inputobj = "";

let coverup = document.getElementById("coverup");
let post = document.getElementById("bigpost");

function view(e) {
  currentpost = e;

  // console.log(dbdata);
  //kommentare einfügen
  /*for(let i = 0; i < data.models[e].kommentare.length; i++){
        commentcontainer.innerHTML += "<p>"+data.models[e].kommentare[i] + "</p>";
    }*/

  window.scrollTo(0, 0);
  document.getElementsByTagName("body")[0].style.overflowy = "hidden";

  // console.log(e);
  ///console.log(data.models[e]);
  document.getElementById("titel").innerHTML = dbdata[e].Name;
  document.getElementById("pb").src = dbdata[e].profilepicture;
  document.getElementById("postusername").innerHTML = dbdata[e].username;
  document.getElementById("bigtags").innerHTML = "";
  for (let i = 0; i < dbdata[e].Tags.split(",").length; i++) {
    sessionStorage.setItem("currentpost", dbdata[e].PostNr);
    document.getElementById("bigtags").innerHTML +=
      "<p>" + dbdata[e].Tags.split(",")[i] + "</p>";
  }

  // fetch("server.php?getcomments=" + sessionStorage.getItem("currentpost"))
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((data) => {
  //     console.log("comments");
  //     console.log(data);
  //     // for (let i = 0; i < data.length; i++) {
  //     //   console.log(i);
  //     // }
  //   })
  //   .then((error) => {
  //     console.error(error);
  //   });
  fetch("server.php?getcomments=" + sessionStorage.getItem("currentpost"))
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("comments");
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        document.getElementById("commentcontainer").innerHTML += 
      }
    })
    .catch((error) => {
      console.error(error);
    });

  coverup.style.display = "block";
  post.style.display = "block";
  post.style = " background-color: rgba(255, 255, 255, 1);";
  inputobj = dbdata[e].ObjektPath;
  isset = true;
}

function leave() {
  commentcontainer.innerHTML = "";
  currentpost = null;
  document.getElementsByTagName("body")[0].style.overflowy = "visible";

  post.style = " background-color: rgba(255, 255, 255, 0);";
  coverup.style.display = "none";
  // post.innerHTML = "";
  post.style.display = "none";
}

function switchhdri(e) {
  console.log(hdri);
  hdri = hdris[e];
  hdricheck = true;

  document.getElementsByClassName("hdriimage")[e].style.BorderStyle = "solid";
}
