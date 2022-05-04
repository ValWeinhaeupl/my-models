//in GLTFLoader muss three.module.js geändert werden

//Container für Scene
let container = document.getElementById("threecanvas");

import { GLTFLoader } from "./GLTFLoader.js";
import { RGBELoader } from "./RGBELoader.js";
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
  75,
  //Seitenverhältnis
  container.clientWidth / container.clientHeight,
  0.01,
  1000
);

var renderer = new THREE.WebGLRenderer({ alpha: true });
// renderer.setSize(window.innerWidth,window.innerHeight);

//scene in container laden
container.appendChild(renderer.domElement);

var loader = new GLTFLoader();

//variable um gltf scene zu speichern, um nachher änderungen vorzunehmen
var obj;

loader.load("", function (gltf) {
  scene.add(gltf.scene);
  obj = gltf.scene;
  obj.name = "object187;";
});

renderer.setClearColor(0x000000, 0);
// scene.background = new THREE.Color("transparent");

var light = new THREE.HemisphereLight(0xffffff, 0x000000, 2);

let hdrloader = new RGBELoader().load(
  "public/hdri/country.hdr",
  function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    // texture.setClearColor(texture)
    //texture.setClearAlpha(0.5);
    scene.background = texture;
    scene.environment = texture;
  }
);

const controls = new THREE.OrbitControls(camera, renderer.domElement);

camera.position.set(0, 0, 3);

//funktion, die jeden frame aufgerufen wird, ähnlich zu draw bei processing
function animate() {
  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  renderer.setSize(
    document.querySelector("#threecanvas").clientWidth,
    document.querySelector("#threecanvas").clientHeight
  );
  //ersetzen mit geladenem objekt
  if (isset) {
    scene.clear();
    loader.load(inputobj, function (gltf) {
      scene.add(gltf.scene);
      //scene.add(light);
      obj = gltf.scene;
    });
    isset = false;
  }
  if (hdricheck) {
    let texturenew = "public/hdri/" + hdri;

    console.log("public/hdri/" + hdri);
    hdricheck = false;

    hdrloader = new RGBELoader().load(texturenew, function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      // texture.setClearColor(texture)
      //texture.setClearAlpha(0.5);
      scene.background = texture;
      scene.environment = texture;
    });
  }
}

animate();
