import Entity from './entity'
import { MultiMaterial } from 'three'

class Dispose {
  entity(entity) {
    if (entity instanceof Entity === false) {
      return
    }

    entity.children.forEach(child => {
      child.geometry.dispose()
      this.disposeAllMaterials(child)
    })
  }

  disposeAllMaterials(mesh) {
    if (mesh.material instanceof MultiMaterial)
      mesh.material.materials.forEach(this.disposeMaterial)
    else this.disposeMaterial(mesh.material)
  }

  disposeMaterial(material) {
    const mapNames = ['map', 'lightMap', 'bumpMap', 'normalMap', 'specularMap']

    mapNames.forEach(function(mapName) {
      let currentMap = material[mapName]
      if (currentMap) currentMap.dispose()
    })

    material.dispose()
  }
}

export default new Dispose()
