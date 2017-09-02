import ECS from 'root';
import cubeEntity from './entities/cube.entity';

const settings = {
  fov: 75,
  width: 512,
  height: 512,
  near: 0.1,
  far: 100,
  containerId: 'game-view',
};

ECS.application.init(settings);
ECS.application.add(new cubeEntity());
ECS.application.camera.position.z = 5;
