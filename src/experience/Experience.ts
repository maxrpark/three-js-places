import { Mesh } from "three";
import { Time, Sizes, Camera, Renderer, Debug } from "./utils";

import { Scene } from "three";
import { Universe } from "../Universe/Universe";

declare global {
  interface Window {
    experience: Experience;
  }
}

export interface ExperienceInt {
  canvas?: HTMLCanvasElement | undefined;
  time: Time;
  sizes: Sizes;
  scene: Scene;
  camera: Camera;
  renderer: Renderer;
  universe: Universe;
  debug: Debug;
  update: () => void;
  resize: () => void;
}

let instance: Experience | null = null;

export class Experience implements ExperienceInt {
  canvas!: HTMLCanvasElement;
  time: Time;
  sizes: Sizes;
  scene: Scene;
  camera: Camera;
  renderer: Renderer;
  universe: Universe;
  debug: Debug;

  constructor(canvas?: HTMLCanvasElement) {
    if (instance) {
      return instance;
    }
    instance = this;

    window.experience = this;
    this.canvas = canvas!;

    // setup
    this.debug = new Debug();
    this.time = new Time();
    this.time.on("tick", () => this.update());

    this.sizes = new Sizes();
    this.sizes.on("resize", () => this.resize());

    this.scene = new Scene();

    this.camera = new Camera();
    // this.camera.setAxisHelper();
    this.renderer = new Renderer();

    this.universe = new Universe();
  }
  update() {
    this.camera.update();
    this.renderer.update();
  }
  resize() {
    this.camera.resize();
    this.renderer.resize();
  }
  destroy() {
    this.sizes.off("resize");
    this.time.off("thick");

    this.scene.traverse((child) => {
      // Test if it's a mesh
      if (child instanceof Mesh) {
        child.geometry.dispose();

        // Loop through the material properties
        for (const key in child.material) {
          const value = child.material[key];

          // Test if there is a dispose function
          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });

    this.camera.controls.dispose();
    this.renderer.renderer.dispose();

    if (this.debug.active) this.debug.ui.destroy();
  }
}
