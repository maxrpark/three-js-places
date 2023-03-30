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
  snowGeometry: BufferGeometry;
  snowMaterial: PointsMaterial;
  group: Points;

  // props
  snowFlakesCount: number;
  snowTexture: MeshTextureInt;

  constructor(props?: Props) {
    Object.assign(this, props);
    this.createSnow();
  }

  setGeometry() {
    this.snowGeometry = new BufferGeometry();

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

    this.snowGeometry.setAttribute(
      "position",
      new BufferAttribute(position, 3)
    );
  }
  setMaterial() {
    this.snowMaterial = new PointsMaterial();
    this.snowMaterial.size = 0.05;

    this.snowMaterial.transparent = true;
    this.snowMaterial.alphaMap = this.snowTexture.map;
    this.snowMaterial.color = new Color("#b9d5ff");
    this.snowMaterial.depthWrite = false;
    this.snowMaterial.blending = AdditiveBlending;
  }
  createSnow() {
    this.setGeometry();
    this.setMaterial();
    this.group = new Points(this.snowGeometry, this.snowMaterial);
  }
  onUpdate() {
    console.log("updated");
  }
}
