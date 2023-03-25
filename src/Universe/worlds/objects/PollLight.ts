// import { Experience } from "../../../experience/Experience";
import {
  BoxGeometry,
  Group,
  PointLight,
  Mesh,
  MeshStandardMaterial,
  CylinderGeometry,
  // PointLightHelper,
} from "three";
import { MeshTextureInt } from "../interfaces";

interface Props {
  pollTexture: MeshTextureInt;
}

export default class PollLight {
  // experience: Experience;
  group: Group;

  poll: Mesh;
  pollGeometry: BoxGeometry;
  pollMaterial: MeshStandardMaterial;
  pollMeshTexture: any;

  bell: Mesh;
  bellGeometry: CylinderGeometry;
  bellMaterial: MeshStandardMaterial;

  light: PointLight;

  // Props
  pollTexture: MeshTextureInt;

  constructor(props?: Props) {
    // this.experience = new Experience();
    this.group = new Group();
    this.createPollLight();
    Object.assign(this, props);
  }

  createLight() {
    this.light = new PointLight(0xff9000, 3, 5, 1);
    this.light.position.y = 1;

    // const pointLightHelper = new PointLightHelper(this.light, 0.4);
    // this.experience.scene.add(pointLightHelper);
  }
  setPollGeometry() {
    this.pollGeometry = new BoxGeometry(0.12, 1.5, 0.12);
  }
  setPollTexture() {
    this.pollMeshTexture = {
      map: this.pollTexture.map,
      normalMap: this.pollTexture.normalMap,
      aoMap: this.pollTexture.aoMap,
      aoMapIntensity: this.pollTexture.aoMapIntensity,
      roughnessMap: this.pollTexture.roughnessMap,
      displacementMap: this.pollTexture.displacementMap,
      displacementScale: this.pollTexture.displacementScale,
    };
  }
  setPollMaterial() {
    this.pollMaterial = new MeshStandardMaterial();
  }
  createPoll() {
    this.setPollGeometry();
    this.setPollMaterial();
    this.poll = new Mesh(this.pollGeometry, this.pollMaterial);
    this.poll.receiveShadow = true;
    this.poll.castShadow = true;
  }
  setBellGeometry() {
    this.bellGeometry = new CylinderGeometry(0.15, 0.4, 0.45, 6);
  }
  setBellMaterial() {
    this.bellMaterial = new MeshStandardMaterial({ color: 0xffff00 });
  }
  createBell() {
    this.setBellGeometry();
    this.setBellMaterial();
    this.bell = new Mesh(this.bellGeometry, this.bellMaterial);
    this.bell.receiveShadow = true;
    this.bell.castShadow = true;
    this.bell.position.y = 0.95;
  }

  createPollLight() {
    this.createBell();
    this.createPoll();
    this.createLight();

    this.group.add(this.bell, this.poll, this.light);
  }
}
