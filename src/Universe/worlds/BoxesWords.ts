import {
  BoxGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshMatcapMaterial,
  TextureLoader,
  sRGBEncoding,
} from "three";
import Text3D from "./text";
import { Experience } from "../../experience/Experience";
import { Time } from "../../experience/utils";

export default class BoxesWorld {
  experience: Experience;
  time: Time;
  text: Text3D;
  cube: Mesh;

  constructor(
    public cubesItems: Mesh[] = [],
    public geometry = new BoxGeometry(1, 1, 1),
    public world = new Group(),
    public boxes = new Group()
  ) {
    this.experience = new Experience();
    this.time = this.experience.time;

    this.text = new Text3D({ text: "Think outside the box" });

    this.text.on("textLoaded", () => {
      this.text.mesh.position.set(0, 0, 0);
      this.createWorld();
    });

    this.time.on("tick", () => {
      this.animateCube();
    });
  }

  createCube() {
    this.cube = new Mesh(
      this.geometry,
      new MeshBasicMaterial({ color: "#ffffff", wireframe: true })
    );
  }

  createBoxes() {
    const textureLoader = new TextureLoader();
    const matcap = textureLoader.load(`textures/mapCaps/metalic-1.png`);

    matcap.encoding = sRGBEncoding;

    const material = new MeshMatcapMaterial({ matcap });

    for (let i = 0; i < 150; i++) {
      const box = new Mesh(this.geometry, material);

      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 10;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      box.position.x = x;
      box.position.y = y;
      box.position.z = (Math.random() - 0.5) * 15;

      box.rotation.x = Math.random() * Math.PI;
      box.rotation.y = Math.random() * Math.PI;

      this.cubesItems.push(box);
      this.boxes.add(box);
    }
  }

  animateCube() {
    this.cubesItems.forEach((item: Mesh) => {
      item.rotation.y = Math.sin(this.time.elapsed * -0.00005);
    });
    this.boxes.rotation.x = Math.sin(this.time.elapsed * 0.00002);
    this.boxes.rotation.y = Math.cos(this.time.elapsed * 0.00002);
  }
  createWorld() {
    this.createBoxes();
    this.createCube();
    this.world.add(this.text.mesh, this.boxes, this.cube);
  }
}
