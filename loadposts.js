let dbdata;

function loadposts(x) {
  dbdata = x;

  console.log(dbdata);
  container.innerHTML = "";
  document.getElementById("profilepb").src = x[0].profilepicture;
  document.getElementById("profileusername").innerHTML = x[0].username;
  for (let i = 0; i < x.length; i++) {
    container.innerHTML +=
      '<div class="post" onclick="view(' +
      i +
      ')"><div><h2 id="username">' +
      x[i].username +
      "</h2><h2>" +
      x[i].Name +
      "</h2></div><img src=" +
      x[i].ThumbPath +
      '><div class="tags"></div></div>';
    for (let j = 0; j < x[i].Tags.split(",").length; j++) {
      //i + 1 bei class weil in bigpost vorher ein tags element existiert
      document.getElementsByClassName("tags")[i + 1].innerHTML +=
        "<p>" + x[i].Tags.split(",")[j] + "</p>";
    }
  }
}
