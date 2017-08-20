import * as ECS from 'root';
import cubeEntity from './cube.entity';

const settings = {
  fov: 75,
  width: 512,
  height: 512,
  near: 0.1,
  far: 100,
  containerId: 'game-view',
};

ECS.application.init(settings);

for (let i = 0; i < 100; i++)
  ECS.application.add(new cubeEntity());

ECS.application.camera.position.z = 5;

console.log(ECS);
