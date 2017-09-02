import { mouse } from 'root/app/init';

class Injector {

  constructor() {
    this.entities = {};
    this.components = {};
    this.meshes = [];
  }

  registerEntity(entity) {
    this.entities[entity.__ecs.__id] = entity;
    entity.components = this.registerAllComponents(entity);
    mouse.registerEntityEvents(entity);
  }

  registerAllComponents(entity) {
    return entity.__ecs.__components.reduce((accumulator, componentClass) => {
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
    Object.keys(entity.components).forEach((componentName) => {
      entity.components[componentName].start();
    });
  }

}

export default new Injector();