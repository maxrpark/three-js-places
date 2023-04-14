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
  particlesCount?: number;
  particlesTexture?: MeshTextureInt;
  color?: string;

  minRadius?: number;
  maxRadius?: number;
  maxHeight?: number;
  size?: number;
}

export default class Snow {
  // snow:
  geometry: BufferGeometry;
  material: PointsMaterial;
  points: Points;

  // props
  particlesCount: number;
  particlesTexture: MeshTextureInt;
  color: string;
  minRadius: number;
  maxRadius: number;
  maxHeight: number;

  size: number;

  constructor(props?: Props) {
    Object.assign(this, props);

    this.minRadius = this.minRadius ? this.minRadius : 3;
    this.maxRadius = this.maxRadius ? this.maxRadius : 3;
    this.maxHeight = this.maxHeight ? this.maxHeight : 3;
    this.createSnow();
  }

  setGeometry() {
    this.geometry = new BufferGeometry();

    if (!this.particlesCount) this.particlesCount = 500;

    const position = new Float32Array(this.particlesCount * 3);

    for (let i = 0; i < this.particlesCount; i++) {
      let i3 = i * 3;

      const angle = Math.random() * Math.PI * 2; // Random angle
      const radius = this.minRadius + Math.random() * this.maxRadius;

      const x = Math.cos(angle) * radius; // Get the x position using cosines
      const z = Math.sin(angle) * radius; // Get the z position using sinus
      // fruit.position.set(x, (Math.random() - 0.5) * 1 * 0.5, z);

      position[i3] = (Math.random() - 0.5) * x;
      position[i3 + 1] = Math.random() * this.maxHeight;
      position[i3 + 2] = (Math.random() - 0.5) * z;
    }

    this.geometry.setAttribute("position", new BufferAttribute(position, 3));
  }
  setMaterial() {
    this.material = new PointsMaterial();
    this.material.size = this.size ? this.size : 0.05;

    this.material.transparent = true;
    if (this.particlesTexture?.map)
      this.material.alphaMap = this.particlesTexture.map;

    this.material.color = this.color
      ? new Color(this.color)
      : new Color("#b9d5ff");
    this.material.depthWrite = false;
    this.material.blending = AdditiveBlending;
  }
  createSnow() {
    this.setGeometry();
    this.setMaterial();
    this.points = new Points(this.geometry, this.material);
  }
}
