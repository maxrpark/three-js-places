// import { Experience } from "../../../experience/Experience";
import {
  BoxGeometry,
  Group,
  PointLight,
  Mesh,
  MeshStandardMaterial,
  CylinderGeometry,
  sRGBEncoding,
  RepeatWrapping,
  Float32BufferAttribute,
  MeshMatcapMaterial,
  // PointLightHelper,
} from "three";
import { MeshTextureInt } from "../interfaces";

interface Props {
  pollTextures: MeshTextureInt;
  bellMapCap: any;
  // bellTextures: MeshTextureInt;
}

export default class PollLight {
  // experience: Experience;
  group: Group;

  poll: Mesh;
  pollGeometry: BoxGeometry;
  pollMaterial: MeshStandardMaterial;
  pollMeshTexture: MeshTextureInt;

  bell: Mesh;
  bellGeometry: CylinderGeometry;
  bellMaterial: MeshMatcapMaterial;
  // bellTexture: MeshTextureInt;

  light: PointLight;

  // Props
  pollTextures: MeshTextureInt;
  bellMapCap: any;
  // bellTextures: MeshTextureInt;

  constructor(props?: Props) {
    // this.experience = new Experience();

    Object.assign(this, props);

    this.group = new Group();
    this.createPollLight();
  }

  createLight() {
    this.light = new PointLight(0xff9000, 3, 5, 1);
    this.light.position.y = 1;

    // const pointLightHelper = new PointLightHelper(this.light, 0.4);
    // this.experience.scene.add(pointLightHelper);
  }
  setPollGeometry() {
    this.pollGeometry = new BoxGeometry(0.12, 1.5, 0.12);
    // this.pollGeometry = new BoxGeometry(1, 1.5, 0.12);
  }
  setPollTexture() {
    this.pollMeshTexture = {
      map: null,
      normalMap: null,
      aoMap: null,
      aoMapIntensity: 1,
      roughnessMap: null,
      displacementMap: null,
      displacementScale: 0,
    };

    if (!this.pollTextures) return;

    Object.assign(this.pollMeshTexture, this.pollTextures);

    const repeatX = 1;
    const repeatY = 15;

    this.pollMeshTexture.map.encoding = sRGBEncoding;
    this.pollMeshTexture.map.repeat.set(repeatX, repeatY);
    this.pollMeshTexture.map.wrapS = RepeatWrapping;
    this.pollMeshTexture.map.wrapT = RepeatWrapping;

    this.pollMeshTexture.normalMap.repeat.set(repeatX, repeatY);
    this.pollMeshTexture.normalMap.wrapS = RepeatWrapping;
    this.pollMeshTexture.normalMap.wrapT = RepeatWrapping;

    this.pollMeshTexture.aoMap.repeat.set(repeatX, repeatY);
    this.pollMeshTexture.aoMap.wrapS = RepeatWrapping;
    this.pollMeshTexture.aoMap.wrapT = RepeatWrapping;

    this.pollGeometry.setAttribute(
      "uv2",
      //@ts-ignore
      new Float32BufferAttribute(this.pollGeometry.attributes.uv.array, 2)
    );
  }
  setPollMaterial() {
    this.setPollTexture();
    this.pollMaterial = new MeshStandardMaterial({
      ...this.pollMeshTexture,
    });
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
    this.bellMaterial = new MeshMatcapMaterial({ matcap: this.bellMapCap });
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
