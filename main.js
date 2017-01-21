let ECS = require('./');
let cube = require('./cube');
let test = new cube();
console.log(test);

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

scene.add( test );

camera.position.z = 5;

let render = {
  Update: function(){
    renderer.render(scene, camera);
  }
};

ECS.systems.updater.Add(render);
ECS.systems.updater.Start();

//render.Update();

//Updater.Add(render);
//Updater.Start();

//render();