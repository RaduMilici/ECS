let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
//------------------------------------------------------------------------------
let ECS = require('./');
let Cube = require('./cube');
let Rotate = require('./rotate');

for(let i = 0; i < 1; i++){
  let cube = new Cube();
  let rotate = new Rotate(cube);
  scene.add(cube);
}  

camera.position.z = 10;
//------------------------------------------------------------------------------

function render(){
  renderer.render(scene, camera);
}

ECS.systems.updater.SetRenderFunction(render);
ECS.systems.updater.Start();
