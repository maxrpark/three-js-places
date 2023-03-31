import * as THREE from "three";
import { Experience } from "../experience/Experience";
import { Debug } from "../experience/utils";
import GUI from "lil-gui";

interface IProps {
  environmentMapTexture?: any;
  hasAmbientLight?: boolean;
  hasDirectionalLight?: boolean;
  castShadow?: boolean;
}
interface EnvironmentInt {
  experience: Experience;
  ambientLight: THREE.AmbientLight;
  directionalLight: THREE.DirectionalLight;
  scene: THREE.Scene;
  environmentMapTexture: any;
  environmentMap: any;
  hasAmbientLight: boolean;
  hasDirectionalLight: boolean;
  debug: Debug;
  debugFolder: GUI;
  castShadow: boolean;

  setAmbientLight: () => void;
  setDirectionalLight: () => void;
  setEnvironmentMap: () => void;
}

export class Environment implements EnvironmentInt {
  experience: Experience;
  ambientLight: THREE.AmbientLight;
  directionalLight: THREE.DirectionalLight;
  scene: THREE.Scene;
  environmentMapTexture: any;
  environmentMap: any;
  debug: Debug;
  debugFolder: GUI;
  hasAmbientLight: boolean;
  hasDirectionalLight: boolean;
  castShadow: boolean;

  constructor(props?: IProps) {
    Object.assign(this, props);
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;

    if (this.hasAmbientLight) this.setAmbientLight();
    if (this.hasDirectionalLight) this.setDirectionalLight();

    if (this.environmentMapTexture) {
      this.setEnvironmentMap();
    }
  }

  setAmbientLight() {
    this.ambientLight = new THREE.AmbientLight("#b9d5ff", 2);
    this.scene.add(this.ambientLight);

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("ambient light");
      this.debugFolder
        .add(this.ambientLight, "intensity")
        .name("intensity")
        .min(0)
        .max(4)
        .step(0.001);
      this.debugFolder
        .addColor(this.ambientLight, "color")
        .name("color")
        .min(0)
        .max(4)
        .step(0.001);
    }
  }

  setDirectionalLight() {
    this.directionalLight = new THREE.DirectionalLight("#b9d5ff", 5.2);

    this.directionalLight.position.set(2.6, 2, 2);

    this.directionalLight.shadow.mapSize.width = 1024;
    this.directionalLight.shadow.mapSize.height = 1024;

    this.directionalLight.shadow.camera.near = 1;
    this.directionalLight.shadow.camera.far = 13;

    this.directionalLight.shadow.camera.top = 4;
    this.directionalLight.shadow.camera.bottom = -2;
    this.directionalLight.shadow.camera.right = 4;
    this.directionalLight.shadow.camera.left = -4;

    this.directionalLight.castShadow = this.castShadow;

    // const directionalLightCameraHelper = new THREE.CameraHelper(
    //   this.directionalLight.shadow.camera
    // );
    // this.scene.add(directionalLightCameraHelper);

    this.scene.add(this.directionalLight);

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("directional light");
      this.debugFolder
        .add(this.directionalLight, "intensity")
        .name("intensity")
        .min(0)
        .max(10)
        .step(0.001);
      this.debugFolder
        .add(this.directionalLight.position, "x")
        .name("x")
        .min(0)
        .max(10)
        .step(0.001);
      this.debugFolder
        .add(this.directionalLight.position, "y")
        .name("y")
        .min(0)
        .max(10)
        .step(0.001);
      this.debugFolder
        .add(this.directionalLight.position, "z")
        .name("z")
        .min(0)
        .max(10)
        .step(0.001);
      this.debugFolder
        .addColor(this.directionalLight, "color")
        .name("color")
        .min(0)
        .max(4)
        .step(0.001);
    }
  }

  setEnvironmentMap() {
    this.environmentMap = {};
    this.environmentMap.intensity = 1;
    this.environmentMap.texture = this.environmentMapTexture;
    this.environmentMap.texture.encoding = THREE.sRGBEncoding;

    this.scene.background = this.environmentMap.texture;
    this.scene.environment = this.environmentMap.texture;

    this.experience.renderer.renderer.outputEncoding = THREE.sRGBEncoding;
    this.experience.renderer.renderer.toneMapping = THREE.LinearToneMapping;
    this.experience.renderer.renderer.toneMappingExposure = 1;

    this.environmentMap.updateMaterial = () => {
      this.scene.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMap = this.environmentMap.texture;
          child.material.envMapIntensity = this.environmentMap.intensity;
          child.material.needsUpdate = true;
        }
      });
    };
    this.environmentMap.updateMaterial();

    // Debug

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("environment");
      this.debugFolder
        .add(this.environmentMap, "intensity")
        .name("envMapIntensity")
        .min(0)
        .max(4)
        .step(0.001)
        .onChange(this.environmentMap.updateMaterial);
    }
  }
}
