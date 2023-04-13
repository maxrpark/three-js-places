import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Points,
  PointsMaterial,
} from "three";
import { MeshTextureInt } from "../interfaces";

interface Props {
  snowFlakesCount?: number;
  snowTexture?: MeshTextureInt;
}

export default class Snow {
  // snow:
  geometry: BufferGeometry;
  material: PointsMaterial;
  points: Points;

  // props
  snowFlakesCount: number;
  snowTexture: MeshTextureInt;

  constructor(props?: Props) {
    Object.assign(this, props);
    this.createSnow();
  }

  setGeometry() {
    this.geometry = new BufferGeometry();

    if (!this.snowFlakesCount) this.snowFlakesCount = 500;

    const position = new Float32Array(this.snowFlakesCount * 3);

    for (let i = 0; i < this.snowFlakesCount; i++) {
      let i3 = i * 3;

      const angle = Math.random() * Math.PI * 2; // Random angle
      const radius = 3 + Math.random() * 3;

      const x = Math.cos(angle) * radius; // Get the x position using cosines
      const z = Math.sin(angle) * radius; // Get the z position using sinus
      // fruit.position.set(x, (Math.random() - 0.5) * 1 * 0.5, z);

      position[i3] = (Math.random() - 0.5) * x;
      position[i3 + 1] = Math.random() * 3;
      position[i3 + 2] = (Math.random() - 0.5) * z;
    }

    this.geometry.setAttribute("position", new BufferAttribute(position, 3));
  }
  setMaterial() {
    this.material = new PointsMaterial();
    this.material.size = 0.05;

    this.material.transparent = true;
    this.material.alphaMap = this.snowTexture.map;
    this.material.color = new Color("#b9d5ff");
    this.material.depthWrite = false;
    this.material.blending = AdditiveBlending;
  }
  createSnow() {
    this.setGeometry();
    this.setMaterial();
    this.points = new Points(this.geometry, this.material);
  }
}
