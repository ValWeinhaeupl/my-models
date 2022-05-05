function upload() {
  const myForm = document.getElementById("uploadform");
  let inpObject = document.getElementById("object");
  let inptitle = document.getElementById("title");
  let inpthumb = document.getElementById("thumb");
  let tags = document.getElementById("tags");
  let description = document.getElementById("desc");

  console.log(inpObject);
  console.log(inptitle);
  console.log(inpthumb);
  console.log(tags);
  console.log(description);

  let username = document.createElement("input");
  username.setAttribute("type", "text");
  username.setAttribute("id", "username");
  username.setAttribute("name", "username");
  username.setAttribute("value", localStorage.getItem("login").split("|")[0]);

  console.log(inpthumb.files[0]);
  console.log(inpthumb.files[0].clientHeight);
  console.log(inpthumb.clientWidth / inpthumb.clientHeight);
  //do hods irgendwos
  if (
    inpObject != null &&
    inptitle.value.length > 4 &&
    inpthumb != null &&
    //seitenverhältnis nur 1 zu 1
    //inpthumb.clientWidth / inpthumb.clientHeight == 1 &&
    tags.value.length > 0 &&
    description.value.length > 10
  ) {
    const formData = new FormData();
    formData.append("object", inpObject.files[0]);
    formData.append("title", inptitle.value);
    formData.append("thumb", inpthumb.files[0]);
    formData.append("tags", tags.value);
    formData.append("desc", description.value);
    formData.append("username", username.value);

    const endpoint = "upload.php";

    let check = true;

    fetch(endpoint, {
      method: "post",
      body: formData,
    })
      .then((response) => {
        setTimeout(() => {
          location.href = "index.php";
        }, 3000);
      })
      .catch((error) => {
        check = false;
        console.error(error);
      });
  } else {
    console.log("bruh");
  }
}
