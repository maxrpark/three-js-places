import { Mesh, MeshMatcapMaterial, TextureLoader } from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import EventEmitter from "../../../experience/utils/EventEmitter";

interface Props {
  text?: string;
  matcapName?: string;
}

export default class Text3D extends EventEmitter {
  geometry: TextGeometry;
  material: MeshMatcapMaterial;
  mesh: Mesh;
  matcap: any;
  // props

  text: string;
  matcapName: string;
  constructor(props?: Props) {
    super();
    Object.assign(this, props);
    this.setGeometry();
  }
  setGeometry() {
    const fontLoader = new FontLoader();
    const text = this.text ? this.text : "hello world!";

    fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
      this.geometry = new TextGeometry(text, {
        font: font,
        size: 0.5,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5,
      });

      this.geometry.center();
      this.createText();
    });
  }

  setMaterial() {
    const textureLoader = new TextureLoader();
    this.matcapName = this.matcapName ? this.matcapName : "metalic-1";

    const matcap = textureLoader.load(
      `textures/mapCaps/${this.matcapName}.png`
    );

    this.material = new MeshMatcapMaterial({ matcap });
  }
  createText() {
    this.setMaterial();

    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.position.set(0, 3, -3);
    this.trigger("textLoaded");
  }
}
