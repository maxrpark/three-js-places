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

  receiveShadow?: boolean;
  castShadow?: boolean;
}

export default class StandardSphere {
  mesh: Mesh;
  geometry: SphereGeometry;
  material: MeshStandardMaterial;
  meshTextures: MeshTextureInt;

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
    this.meshTextures = {
      map: null,
      normalMap: null,
      aoMap: null,
      displacementMap: null,
      roughnessMap: null,

      displacementScale: 0,
      roughness: 1,
      metalness: 0.0,

      aoMapIntensity: 0,
    };
    if (!this.meshSources) return;
    Object.assign(this.meshTextures, this.meshSources);

    console.log(this.meshTextures);

    this.geometry.setAttribute(
      "uv2",
      //@ts-ignore
      new Float32BufferAttribute(this.geometry.attributes.uv.array, 2)
    );
  }

  setMaterial() {
    this.setTextures();

    this.material = new MeshStandardMaterial(this.meshTextures);
  }

  createMesh() {
    this.setGeometry();
    this.setMaterial();
    this.mesh = new Mesh(this.geometry, this.material);

    this.mesh.receiveShadow = this.receiveShadow ? this.receiveShadow : false;
    this.mesh.castShadow = this.castShadow ? this.castShadow : false;
  }
}
