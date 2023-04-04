import {
  BoxGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshMatcapMaterial,
  TextureLoader,
} from "three";
import Text3D from "./text";
import { Experience } from "../../experience/Experience";
import { Time } from "../../experience/utils";

export default class BoxesWorld {
  experience: Experience;
  time: Time;

  world: Group;
  text: Text3D;
  boxes: Group;
  cube: Mesh;
  geometry: BoxGeometry;

  constructor(public cubesItems: Mesh[] = []) {
    this.experience = new Experience();
    this.time = this.experience.time;
    this.world = new Group();
    this.boxes = new Group();

    this.setGeometry();
    this.createText();

    this.time.on("tick", () => {
      this.animateCube();
    });
  }
  setGeometry() {
    this.geometry = new BoxGeometry(1, 1, 1);
  }

  createCube() {
    this.cube = new Mesh(
      this.geometry,
      new MeshBasicMaterial({ color: "#ffffff", wireframe: true })
    );
    // scene.add(cube);
  }

  createBoxes() {
    const textureLoader = new TextureLoader();
    const matcap = textureLoader.load(`textures/mapCaps/metalic-1.png`);

    for (let i = 0; i < 150; i++) {
      const box = new Mesh(this.geometry, new MeshMatcapMaterial({ matcap }));

      const angle = Math.random() * Math.PI * 2; // Random angle
      const radius = 2 + Math.random() * 16; // Random radius

      const x = Math.cos(angle) * radius; // Get the x position using cosines
      const y = Math.sin(angle) * radius; // Get the z position using sinus
      console.log(x);

      box.position.x = x;
      box.position.y = y;
      // box.position.z = z;

      // box.rotation.x = Math.random() * Math.PI;
      // box.rotation.y = Math.random() * Math.PI;

      box.position.x = (Math.random() - 0.5) * 15;
      box.position.y = (Math.random() - 0.5) * 15;
      box.position.z = (Math.random() - 0.5) * 15;

      box.rotation.x = Math.random() * Math.PI;
      box.rotation.y = Math.random() * Math.PI;

      // let randomSize = Math.random() + 1;

      // randomSize = Math.max(0.5, Math.min(randomSize, 1.5));

      // box.scale.set(randomSize, randomSize, randomSize);
      this.cubesItems.push(box);
      this.boxes.add(box);
    }

    // this.world.add(this.boxes);
  }

  createText() {
    this.text = new Text3D({ text: "Think outside the box" });
    this.text.on("textLoaded", () => {
      this.text.mesh.position.set(0, 0, 0);
      this.createWorld();
    });
  }

  createWorld() {
    this.createBoxes();
    this.createCube();
    this.world.add(this.text.mesh, this.boxes, this.cube);
  }
  animateCube() {
    this.cubesItems.forEach((item: Mesh) => {
      item.rotation.y = Math.sin(this.time.elapsed * 0.00005);
      // item.rotation.x = Math.cos(this.time.elapsed * 0.00005);
    });
    this.boxes.rotation.y = Math.sin(this.time.elapsed * 0.00001);
    this.boxes.rotation.z = Math.sin(this.time.elapsed * 0.00001);
  }
}
