import {
  Float32BufferAttribute,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
} from "three";
import { MeshTextureInt } from "../interfaces";

interface Props {
  textures: MeshTextureInt;
  width?: number;
  height?: number;
}

export default class DesertFloor {
  geometry: PlaneGeometry;
  material: MeshStandardMaterial;
  mesh: Mesh;

  // propss
  textures: MeshTextureInt;
  width: number;
  height: number;
  constructor(props: Props) {
    Object.assign(this, props);
    this.createFloor();
  }

  setFloorGeometry() {
    const width = this.width ? this.width : 7.5;
    const height = this.height ? this.height : 5;
    this.geometry = new PlaneGeometry(width, height, 100, 100);
  }

  setFloorMaterial() {
    this.material = new MeshStandardMaterial(this.textures);

    this.geometry.setAttribute(
      "uv2",
      //@ts-ignore
      new Float32BufferAttribute(this.geometry.attributes.uv.array, 2)
    );
  }
  createFloor() {
    this.setFloorGeometry();
    this.setFloorMaterial();
    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.rotation.x = Math.PI / -2;
    this.mesh.receiveShadow = true;
  }
}
