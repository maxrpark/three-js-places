import Resources from "../../experience/utils/Resources";
import sources from "../../sources/desertSources";
import { Experience } from "../../experience/Experience";
import { Time, Sizes, Camera } from "../../experience/utils";
import { OneAnimationModel } from "./models";
import { Water } from "./shaders";
import { Group, MeshStandardMaterial, PlaneGeometry } from "three";
import { MeshTextureInt } from "./interfaces";
import { DesertFloor, Particles } from "./objects";
import Text3D from "./text";
interface Props {}
export default class Desert {
  world: Group;

  floorGeometry: PlaneGeometry;
  floorMaterial: MeshStandardMaterial;
  floor: Group;
  resources: Resources;

  jaguar: OneAnimationModel;
  acaciaThree: OneAnimationModel;
  tree: OneAnimationModel;

  experience: Experience;
  camera: Camera;
  time: Time;
  sizes: Sizes;
  water: Water;
  flies: Particles;

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
    this.text = new Text3D({ text: "Plenilunio", matcapName: "9" });
    this.text.on("textLoaded", () => {
      this.world.add(this.text.mesh);
    });
  }

  createFloor() {
    this.floor = new Group();
    const textures: MeshTextureInt = {
      map: this.resources.items.floorColor,
      normalMap: this.resources.items.floorNormal,
      aoMap: this.resources.items.floorOcclusion,
      displacementMap: this.resources.items.floorHeight,
      metalness: 0.001,
      displacementScale: 0.6,
    };

    let floorLeft = new DesertFloor({ textures, width: 3 });
    floorLeft.mesh.position.x = -2.7;

    let florRight = new DesertFloor({ textures, width: 3 });
    florRight.mesh.position.x = 2.7;
    this.floor.add(floorLeft.mesh, florRight.mesh);
  }

  createWater() {
    this.water = new Water({ width: 2.5, height: 5 });
    this.water.mesh.position.y = 0.18;
  }
  createJaguar() {
    this.jaguar = new OneAnimationModel({
      source: this.resources.items.jaguar,
    });
    this.jaguar.model.position.x = -2.7;
    this.jaguar.model.position.y = 0.17;
    this.jaguar.model.position.z = 0.3;
  }

  createAcaciaThree() {
    this.acaciaThree = new OneAnimationModel({
      source: this.resources.items.tree_isolated,
      animationValue: 0.0003,
    });

    this.acaciaThree.model.position.set(1, 0.2, -0.2);
    this.acaciaThree.model.scale.set(0.045, 0.045, 0.045);
  }

  createThree() {
    this.tree = new OneAnimationModel({
      source: this.resources.items.tree_animation,
      animationValue: 0.0004,
    });

    this.tree.model.scale.set(0.52, 0.5, 0.5);
    this.tree.model.position.x = -3.5;
    this.tree.model.position.z = 2;
  }

  createFlies() {
    const particlesTexture: MeshTextureInt = {
      map: this.resources.items.fliesMap,
    };
    this.flies = new Particles({
      particlesTexture,
      particlesCount: 5,
      size: 0.05,
      minRadius: 0.5,
      maxRadius: 1,
    });
    this.flies.points.position.y = 1;
  }

  animateFlies() {
    for (let i = 0; i < 5; i++) {
      const i3 = i * 3;

      //@ts-ignore
      const x = this.flies.geometry.attributes.position.array[i3];

      //@ts-ignore
      this.flies.geometry.attributes.position.array[i3 + 1] =
        Math.sin(this.time.elapsed * 0.002 + x) * 0.08;
    }
    const angle = this.time.elapsed * 0.0001;
    this.flies.points.position.x = Math.cos(angle) * 3;
    this.flies.points.position.z = Math.sin(angle) * 2;

    this.flies.points.rotation.y = this.time.elapsed * 0.0002;
    this.flies.geometry.attributes.position.needsUpdate = true;
  }
  createWorld() {
    this.createText();
    this.createFloor();
    this.createWater();

    this.createJaguar();
    this.createAcaciaThree();
    this.createThree();
    this.createFlies();

    this.world.add(
      this.floor,
      this.water.mesh,

      this.acaciaThree.model,
      this.tree.model,
      this.jaguar.model,
      this.flies.points
    );
  }
  update() {
    this.jaguar.update();
    this.acaciaThree.update();
    this.tree.update();

    this.animateFlies();
  }
}
