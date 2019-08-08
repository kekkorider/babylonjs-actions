import { Engine } from '@babylonjs/core/Engines/engine'
import { Scene } from '@babylonjs/core/scene'
import { Color3, Vector3 } from '@babylonjs/core/Maths/math'
import { PlaneBuilder } from "@babylonjs/core/Meshes/Builders/planeBuilder"
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial'
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight'
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera'
import { ActionManager } from '@babylonjs/core/Actions/actionManager'
import { InterpolateValueAction } from '@babylonjs/core/Actions/interpolateValueAction'

// import "@babylonjs/core/Debug/debugLayer"

// 👇️ UNCOMMENT THIS TO MAKE ACTIONS WORK AGAIN
// import '@babylonjs/inspector'

class App {
  constructor({ canvas }) {
    this.canvas = canvas
    this.engine = null
    this.scene = null
    this.camera = null
  }

  init() {
    this.engine = new Engine(this.canvas, true, null, true)
    this.scene = new Scene(this.engine)
    this.scene.clearColor = new Color3(0.06, 0.06, 0.06)
    this.camera = new ArcRotateCamera('Camera', -Math.PI / 2, Math.PI / 2, 10, Vector3.Zero(), this.scene)

    // this.scene.debugLayer.show()

    const hemisphericLight = new HemisphericLight('HemisphericLight', new Vector3(1, 1, 0), this.scene)

    const mesh = new PlaneBuilder.CreatePlane('MainMesh', { size: 3 }, this.scene)
    mesh.position = new Vector3(0, 0, 4)
    const material = new StandardMaterial('MeshMaterial', this.scene)
    mesh.material = material

    // Setting hover events
    mesh.actionManager = new ActionManager(this.scene)

    mesh.actionManager.registerAction(
      new InterpolateValueAction(
        ActionManager.OnPointerOverTrigger,
        mesh.material,
        'alpha',
        0.6,
        250
      )
    )

    mesh.actionManager.registerAction(
      new InterpolateValueAction(
        ActionManager.OnPointerOutTrigger,
        mesh.material,
        'alpha',
        1,
        250
      )
    )

    this.engine.runRenderLoop(() => this.scene.render())
  }
}

const app = new App({
  canvas: document.querySelector('#app')
})
app.init()
