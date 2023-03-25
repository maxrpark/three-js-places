import {
  Mesh,
  MeshStandardMaterial,
  SphereGeometry,
  Float32BufferAttribute,
} from "three";
import { MeshTextureInt } from "../interfaces";

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

  meshSources?: MeshTextureInt;

  // aoMapIntensity?: number;
  // displacementScale?: number;
  // roughness?: number;
  // metalness?: number;

  receiveShadow?: boolean;
  castShadow?: boolean;
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

  meshSources: any;

  aoMapIntensity: number;
  displacementScale: number;
  roughness: number;
  metalness: number;

  receiveShadow?: boolean;
  castShadow?: boolean;

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

    this.meshTextures.map = this.meshSources.map;
    this.meshTextures.normal = this.meshSources.normalMap;

    this.geometry.setAttribute(
      "uv2",
      //@ts-ignore
      new Float32BufferAttribute(this.geometry.attributes.uv.array, 2)
    );

    this.meshTextures.aoMap = this.meshSources.aoMap
      ? this.meshSources.aoMap
      : null;
    this.meshTextures.displacementMap = this.meshSources.displacementMap
      ? this.meshSources.displacementMap
      : null;
    this.meshTextures.roughnessMap = this.meshSources.roughnessMap
      ? this.meshSources.roughnessMap
      : null;

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
    if (this.meshSources) this.setTextures();

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

    this.mesh.receiveShadow = this.receiveShadow ? this.receiveShadow : false;
    this.mesh.castShadow = this.castShadow ? this.castShadow : false;
  }
}
