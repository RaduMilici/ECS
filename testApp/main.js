import ECS from 'root';
import Player from './entities/player.entity';
import Spawner from './spawner/spawner';

const settings = {
  fov: 75,
  width: 512,
  height: 512,
  near: 0.1,
  far: 100,
  containerId: 'game-view',
};
const spawner = new Spawner();

ECS.application.init(settings);
ECS.application.add(new Player());
spawner.start();
ECS.application.camera.position.z = 5;
