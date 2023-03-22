import {
  Mesh,
  MeshStandardMaterial,
  SphereGeometry,
  BufferAttribute,
} from "three";
import { ResourceItemsInt } from "../../../experience/utils/Resources";

interface Props {
  // sphere geometry
  radius?: number;
  widthSegments?: number;
  heightSegments?: number;
  phiStart?: number;
  phiLength?: number;
  thetaStart?: number;
  thetaLength?: number;

  // texture

  sphereTextures?: ResourceItemsInt;

  aoMapIntensity?: number;
  displacementScale?: number;
  roughness?: number;
  metalness?: number;
}

export default class StandardSphere {
  mesh: Mesh;
  geometry: SphereGeometry;
  material: MeshStandardMaterial;
  meshTextures: any;

  // props

  // sphere geometry
  radius: number;
  widthSegments: number;
  heightSegments: number;
  phiStart: number;
  phiLength: number;
  thetaStart: number;
  thetaLength: number;

  // texture

  sphereTextures: any;

  aoMapIntensity: number;
  displacementScale: number;
  roughness: number;
  metalness: number;

  constructor(props?: Props) {
    Object.assign(this, props);
    this.createMesh();
  }

  setGeometry() {
    const radius = this.radius ? this.radius : 1;
    const widthSegments = this.widthSegments ? this.widthSegments : 32;
    const heightSegments = this.heightSegments ? this.heightSegments : 16;

    this.geometry = new SphereGeometry(radius, widthSegments, heightSegments);
  }
  setTextures() {
    this.meshTextures = {};

    this.meshTextures.map = this.sphereTextures.map;
    this.meshTextures.normal = this.sphereTextures.normalMap;

    this.geometry.setAttribute(
      "uv2",
      //@ts-ignore
      new BufferAttribute(this.geometry.attributes.uv.array, 2)
    );

    this.meshTextures.aoMap = this.sphereTextures.aoMap;
    this.meshTextures.displacementMap = this.sphereTextures.displacementMap;
    this.meshTextures.roughnessMap = this.sphereTextures.roughnessMap;

    // this.meshTextures.map.encoding = sRGBEncoding;
    // this.meshTextures.map.repeat.set(1.5, 1.5);
    // this.meshTextures.map.wrapS = RepeatWrapping;
    // this.meshTextures.map.wrapT = RepeatWrapping;
    // this.meshTextures.normal.repeat.set(1.5, 1.5);
    // this.meshTextures.normal.wrapS = RepeatWrapping;
    // this.meshTextures.normal.wrapT = RepeatWrapping;
  }

  setMaterial() {
    this.meshTextures = {
      map: null,
      normal: null,
      aoMap: null,
      displacementMap: null,
      roughnessMap: null,
    };
    if (this.sphereTextures) this.setTextures();

    this.material = new MeshStandardMaterial({
      map: this.meshTextures.map,
      normalMap: this.meshTextures.normal,
      aoMap: this.meshTextures.aoMap,
      displacementMap: this.meshTextures.displacementMap,
      roughnessMap: this.meshTextures.roughnessMap,

      displacementScale: this.displacementScale ? this.displacementScale : 0.1,
      roughness: this.roughness ? this.roughness : 1,
      metalness: this.metalness ? this.metalness : 0.0,

      aoMapIntensity: this.aoMapIntensity ? this.aoMapIntensity : 0,
    });
  }

  createMesh() {
    this.setGeometry();
    this.setMaterial();
    this.mesh = new Mesh(this.geometry, this.material);
  }
}
