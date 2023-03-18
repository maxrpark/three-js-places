import { Experience, ExperienceInt } from "./Experience";
import { Sizes } from "./utils";
import { PerspectiveCamera, Scene, AxesHelper } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export interface CameraInt {
  experience: ExperienceInt;
  camera: PerspectiveCamera;
  scene: Scene;
  controls: OrbitControls;
  canvas: HTMLCanvasElement;
  setCamera: () => void;
  setControls: () => void;
  resize: () => void;
  update: () => void;
}

export class Camera implements CameraInt {
  experience: ExperienceInt;
  camera: PerspectiveCamera;
  scene: Scene;
  sizes: Sizes;
  controls: OrbitControls;
  canvas: HTMLCanvasElement;
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.canvas = this.experience.canvas!;
    this.setCamera();
  }
  setAxisHelper() {
    let axesHelper = new AxesHelper(5);
    this.scene.add(axesHelper);
  }

  setCamera() {
    this.camera = new PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.camera.position.set(1.5, 3.5, 5);

    this.scene.add(this.camera);
    this.setControls();
  }
  setControls() {
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
  }
  resize() {
    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();
  }
  update() {
    this.controls.update();
  }
}
