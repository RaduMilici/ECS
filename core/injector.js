class Injector {

  constructor() {
    this.entities = {};
    this.components = {};
    this.meshes = [];
  }

  start() {

  }

  stop() {

  }

  registerEntity(entity) {
    this.entities[entity.__ecs.__id] = entity;
    this.injectComponents(entity);
    //entity.components.forEach( this.registerComponent );
    //this.components.push(component);
  }

  async injectComponents(entity) {
    entity.components = this.registerAllComponents(entity);
  }

  registerAllComponents(entity) {
    return entity.__ecs.__components.reduce((accumulator, componentClass) => {
      const instantiatedComponent = new componentClass();
      accumulator[instantiatedComponent.name] = instantiatedComponent;
      return accumulator;
    }, {});
  }

}

export default new Injector();