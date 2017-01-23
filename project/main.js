let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
let renderer = new THREE.WebGLRenderer();
let controls = new THREE.OrbitControls( camera, renderer.domElement );
let side = 50;  
let middle = new THREE.Vector3(side / 2, 0, side / 2);

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild( renderer.domElement );
controls.target.copy(middle);
camera.position.set(37, 32, -20);
camera.lookAt(controls.target);
//------------------------------------------------------------------------------
window.ECS = require('../');
let Cube = require('./cube'); 
start();
//------------------------------------------------------------------------------
function start(){
  makeScene();
  for (var i = 0; i < side; i++)
    for(let j = 0; j < side; j += 5)
      loadCube(i, Math.sin(i) + j);
} 
//------------------------------------------------------------------------------ 
function loadCube(x, z){
  let settings = {pos: new THREE.Vector3(x, 0, z)}
  ECS.LoadEntity(Cube, settings).then(scene.add.bind(scene));
}
//------------------------------------------------------------------------------ 
function makeScene(){
  //plane
  let geom = new THREE.PlaneGeometry(side * 2, side * 2);
  let mesh = new THREE.Mesh(geom, new THREE.MeshLambertMaterial());
  mesh.position.set(middle.x, -1, middle.z);
  mesh.rotation.x -= Math.PI / 2;
  mesh.receiveShadow = true;
  scene.add(mesh);
  //light
  var light = new THREE.DirectionalLight(0xD9E9FF);
  light.position.set(0, 50, 0);
  light.shadow.camera.right = light.shadow.camera.top = side;
  light.shadow.camera.left = light.shadow.camera.bottom = -side;
  light.shadow.mapSize.width = light.shadow.mapSize.height = 1024;
  light.castShadow = true;
  scene.add( light );
}
//------------------------------------------------------------------------------ 
ECS.SetRenderFunction(function(){ renderer.render(scene, camera); });
ECS.Start();
//------------------------------------------------------------------------------
