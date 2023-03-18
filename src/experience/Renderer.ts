import { Experience, ExperienceInt } from "./Experience";
import { Sizes, Camera } from "./utils";
import { WebGLRenderer, Scene } from "three";

interface Props {
  shadowMap?: boolean;
}

export interface RendererInt {
  renderer: WebGLRenderer;
  experience: ExperienceInt;
  scene: Scene;
  canvas: HTMLCanvasElement;
  camera: Camera;

  //Props
  shadowMap?: boolean;
}

export class Renderer implements RendererInt {
  renderer: WebGLRenderer;
  experience: ExperienceInt;
  scene: Scene;
  sizes: Sizes;
  canvas: HTMLCanvasElement;
  camera: Camera;
  //Props
  shadowMap?: boolean;

  constructor(props?: Props) {
    Object.assign(this, props);
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.canvas = this.experience.canvas!;
    this.camera = this.experience.camera;

    this.setRenderer();
  }
  setRenderer() {
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.setClearColor("#211d20");
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
    // this.renderer.shadowMap.enabled = this.shadowMap ? this.shadowMap : false;
    this.renderer.shadowMap.enabled = true;
    this.renderer.physicallyCorrectLights = true;
  }

  update() {
    this.renderer.render(this.scene, this.camera.camera);
  }
  resize() {
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
  }
}
