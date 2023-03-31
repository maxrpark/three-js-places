import Resources from "../../experience/utils/Resources";
import sources from "../../sources/desertSources";
import { Experience } from "../../experience/Experience";
import { Time, Sizes, Camera } from "../../experience/utils";
import { Jaguar, OneAnimationModel } from "./models";

import {
  Group,
  MeshStandardMaterial,
  PlaneGeometry,
  Mesh,
  Float32BufferAttribute,
} from "three";
import { MeshTextureInt } from "./interfaces";
interface Props {}
export default class Desert {
  world: Group;

  floorGeometry: PlaneGeometry;
  floorMaterial: MeshStandardMaterial;
  floor: Mesh;
  resources: Resources;

  jaguar: Jaguar;
  acaciaThree: OneAnimationModel;
  tree: OneAnimationModel;
  bush: any;
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
      this.time.on("tick", () => this.update());
    });

    // todo

    this.experience = new Experience();
    this.time = this.experience.time;
    this.sizes = this.experience.sizes;
    this.camera = this.experience.camera;
  }

  setFloorGeometry() {
    this.floorGeometry = new PlaneGeometry(7.5, 5, 100, 100);
  }

  setFloorMaterial() {
    const textures: MeshTextureInt = {
      map: this.resources.items.floorColor,
      normalMap: this.resources.items.floorNormal,
      aoMap: this.resources.items.floorOcclusion,
      displacementMap: this.resources.items.floorHeight,
      // roughnessMap: this.resources.items.floorRoughness,
      // roughness: 1,
      metalness: 0.001,
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
    this.jaguar = new Jaguar({ source: this.resources.items.jaguar });
    this.jaguar.model.position.y = 0.17;
  }

  createThrees() {
    this.acaciaThree = new OneAnimationModel({
      source: this.resources.items.tree_animation,
    });
    this.acaciaThree.model.scale.set(0.5, 0.5, 0.5);
    this.acaciaThree.model.position.x = -5;

    this.tree = new OneAnimationModel({
      source: this.resources.items.tree_isolated,
    });

    this.tree.model.position.set(2, 0.2, -0.5);

    this.tree.model.scale.set(0.045, 0.045, 0.045);

    // this.bush = new OneAnimationModel({
    //   source: this.resources.items.simple_bush,
    // });
    // this.bush.model.scale.set(2, 2, 2);
    // this.bush.model.position.set(2, 0, -1);
  }

  update() {
    this.jaguar.update();
  }
  createWorld() {
    this.createJaguar();
    this.createThrees();
    this.createFloor();
    this.world.add(
      this.floor,
      this.acaciaThree.model,
      this.tree.model,
      // this.bush.model,
      this.jaguar.model
    );
  }
}
