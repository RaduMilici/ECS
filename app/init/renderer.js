import { WebGLRenderer } from 'three'

const defaultSettings = {
  width: 256,
  height: 256,
}

export default class Renderer {
  constructor({ width, height } = defaultSettings, container) {
    this.renderer = new WebGLRenderer({ preserveDrawingBuffer: true })
    this.renderer.setSize(width, height)
    container.append(this.renderer.domElement)
  }

  render(scene, camera) {
    this.renderer.render(scene, camera)
  }

  screenshot() {
    return this.renderer.domElement.toDataURL();
  }
}
