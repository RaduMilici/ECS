import { WebGLRenderer } from  'three';

const defaultSettings = {
  width: 256,
  height: 256,
};

export default class __Renderer {
  constructor({ width, height } = defaultSettings) {
    this.renderer = new WebGLRenderer();
    this.renderer.setSize( width, height );
    document.body.appendChild( this.renderer.domElement );
  }

  render(scene, camera) {
    this.renderer.render(scene, camera);
  }
}
