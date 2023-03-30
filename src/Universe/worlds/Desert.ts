import Resources from "../../experience/utils/Resources";
import sources from "../../sources/desertSources";
import { Experience } from "../../experience/Experience";
import { Time, Sizes, Camera } from "../../experience/utils";
import {
  Group,
  MeshStandardMaterial,
  PlaneGeometry,
  Mesh,
  Float32BufferAttribute,
  AnimationMixer,
} from "three";
import { MeshTextureInt } from "./interfaces";
interface Props {}
export default class Desert {
  world: Group;

  floorGeometry: PlaneGeometry;
  floorMaterial: MeshStandardMaterial;
  floor: Mesh;
  resources: Resources;

  jaguar: any;
  animation: any;
  experience: Experience;
  camera: Camera;
  time: Time;
  sizes: Sizes;

  constructor(props?: Props) {
    this.world = new Group();

    this.resources = new Resources(sources);
    Object.assign(this, props);

    this.resources.on("loaded", () => {
      this.createWorld();
      this.time.on("tick", () =>
        this.animation.mixer.update(this.time.delta * 0.001)
      );
    });

    // todo

    this.experience = new Experience();
    this.time = this.experience.time;
    this.sizes = this.experience.sizes;
    this.camera = this.experience.camera;
  }

  setFloorGeometry() {
    this.floorGeometry = new PlaneGeometry(4.5, 3, 100, 100);
  }

  setFloorMaterial() {
    const textures: MeshTextureInt = {
      map: this.resources.items.floorColor,
      normalMap: this.resources.items.floorNormal,
      aoMap: this.resources.items.floorOcclusion,
      displacementMap: this.resources.items.floorHeight,
      // roughnessMap: this.resources.items.floorRoughness,
      // aoMapIntensity: 10,
      displacementScale: 0.6,
    };

    this.floorMaterial = new MeshStandardMaterial({
      ...textures,
    });

    this.floorGeometry.setAttribute(
      "uv2",
      //@ts-ignore
      new Float32BufferAttribute(this.floorGeometry.attributes.uv.array, 2)
    );
  }
  createFloor() {
    this.setFloorGeometry();
    this.setFloorMaterial();
    this.floor = new Mesh(this.floorGeometry, this.floorMaterial);

    this.floor.rotation.x = Math.PI / -2;

    this.floor.receiveShadow = true;
  }
  createJaguar() {
    this.jaguar = this.resources.items.Jaguar;
    this.jaguar.scene.position.y = 0.17;

    this.jaguar.scene.traverse((child: any) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
      }
    });
    this.setAnimation();
  }

  setAnimation() {
    this.animation = {};
    this.animation.mixer = new AnimationMixer(this.jaguar.scene);
    this.animation.action = this.animation.mixer.clipAction(
      this.jaguar.animations[0]
    );
    this.animation.action.play();
  }
  update() {
    // console.log("hello");
  }
  createWorld() {
    this.createJaguar();
    this.createFloor();
    this.world.add(this.floor, this.jaguar.scene);
  }
}
