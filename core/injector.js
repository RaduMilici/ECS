import { mouse } from 'root/app/init';
import util from './util';

class Injector {

  constructor() {
    this.entities = {};
    this.components = {};
    this.meshes = [];
  }

  registerEntity(entity) {
    this.entities[entity.__ecs.id] = entity;
    entity.components = this.registerAllComponents(entity);
    mouse.registerEntityEvents(entity);
  }

  registerAllComponents(entity) {
    return entity.__ecs.components.reduce((accumulator, componentClass) => {
      const instantiatedComponent = new componentClass();
      instantiatedComponent.entity = entity;
      accumulator[instantiatedComponent.name] = instantiatedComponent;
      return accumulator;
    }, {});
  }

  startEntity(entity) {
    entity.start();
    this.startComponents(entity);
    entity.children.forEach(c => c.entity = entity);
    return entity;
  }

  startComponents(entity) {
    util.loopObjectKeys(entity.components, c => c.start());
  }

  stopComponents(entity) {
    util.loopObjectKeys(entity.components, c => c.stop());
  }

}

export default new Injector();