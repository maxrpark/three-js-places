import Resources from "../../experience/utils/Resources";
import sources from "../../sources/desertSources";
import { Experience } from "../../experience/Experience";
import { Time, Sizes, Camera } from "../../experience/utils";
import { OneAnimationModel } from "./models";
import { Water } from "./shaders";
import { Group, MeshStandardMaterial, PlaneGeometry } from "three";
import { MeshTextureInt } from "./interfaces";
import { DesertFloor } from "./objects";
import Text3D from "./text";
interface Props {}
export default class Desert {
  world: Group;

  floorGeometry: PlaneGeometry;
  floorMaterial: MeshStandardMaterial;
  floor: DesertFloor;
  resources: Resources;

  jaguar: OneAnimationModel;
  acaciaThree: OneAnimationModel;
  tree: OneAnimationModel;

  experience: Experience;
  camera: Camera;
  time: Time;
  sizes: Sizes;
  water: Water;

  text: Text3D;

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
  createText() {
    this.text = new Text3D({ text: "Desert world" });
    this.text.on("textLoaded", () => {
      this.world.add(this.text.mesh);
    });
  }

  createFloor() {
    const textures: MeshTextureInt = {
      map: this.resources.items.floorColor,
      normalMap: this.resources.items.floorNormal,
      aoMap: this.resources.items.floorOcclusion,
      displacementMap: this.resources.items.floorHeight,
      metalness: 0.001,
      displacementScale: 0.6,
    };

    this.floor = new DesertFloor({ textures });
    this.floor.mesh.position.y = -0.3;
  }
  createJaguar() {
    this.jaguar = new OneAnimationModel({
      source: this.resources.items.jaguar,
    });
    this.jaguar.model.position.y = 0.17;
  }

  createWater() {
    this.water = new Water();
  }

  createAcaciaThree() {
    this.acaciaThree = new OneAnimationModel({
      source: this.resources.items.tree_isolated,
      animationValue: 0.0003,
    });

    this.acaciaThree.model.position.set(2, 0.2, -0.5);
    this.acaciaThree.model.scale.set(0.045, 0.045, 0.045);
  }

  createThree() {
    this.tree = new OneAnimationModel({
      source: this.resources.items.tree_animation,
      animationValue: 0.0004,
    });

    this.tree.model.scale.set(0.5, 0.5, 0.5);
    this.tree.model.position.x = -5;
    this.tree.model.position.z = 1;
  }

  createWorld() {
    this.createText();
    this.createFloor();
    this.createWater();

    this.world.add(
      this.floor.mesh,
      this.water.mesh

      // this.acaciaThree.model,
      // this.tree.model,
      // this.jaguar.model
    );
  }
  update() {
    // this.jaguar.update();
    // this.acaciaThree.update();
    // this.tree.update();
  }
}
