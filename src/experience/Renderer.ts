import { Experience, ExperienceInt } from "./Experience";
import { Sizes, Camera } from "./utils";
import GUI from "lil-gui";
import { Debug } from "../experience/utils";

import {
  WebGLRenderer,
  Scene,
  PCFSoftShadowMap,
  sRGBEncoding,
  LinearToneMapping,
  CineonToneMapping,
  NoToneMapping,
  ReinhardToneMapping,
  ACESFilmicToneMapping,
} from "three";

interface Props {
  shadowMap?: boolean;
}

export interface RendererInt {
  renderer: WebGLRenderer;
  experience: ExperienceInt;
  scene: Scene;
  canvas: HTMLCanvasElement;
  camera: Camera;
  debug: Debug;
  debugFolder: GUI;

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

  debug: Debug;
  debugFolder: GUI;
  //Props
  shadowMap?: boolean;

  constructor(props?: Props) {
    Object.assign(this, props);
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.debug = this.experience.debug;
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
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.toneMapping = CineonToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("environment");
      this.debugFolder
        .add(this.renderer, "toneMappingExposure")
        .name("toneMappingExposure")
        .min(0)
        .max(4)
        .step(0.001);
      this.debugFolder.add(this.renderer, "toneMapping", {
        No: NoToneMapping,
        Linear: LinearToneMapping,
        Reinhard: ReinhardToneMapping,
        Cineon: CineonToneMapping,
        ACESFilmic: ACESFilmicToneMapping,
      });
      // .onChange(this.environmentMap.updateMaterial);
    }
  }

  update() {
    this.renderer.render(this.scene, this.camera.camera);
  }
  resize() {
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
  }
}
