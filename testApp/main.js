import * as ECS from 'root';
import testEntity from './comp_ent';

ECS.application.init();
ECS.application.add(testEntity);
testEntity.start();

console.log(ECS);
