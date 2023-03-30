import {
  Group,
  //  Raycaster, Vector2
} from "three";
import { StandardBlock } from "../../blocks";
import { Experience } from "../../experience/Experience";
import { Time, Sizes, Camera } from "../../experience/utils";
import Resources from "../../experience/utils/Resources";
import sources from "../../sources/snowManSources";
import { Snowman, PollLight, Snow } from "./objects";
import { MeshTextureInt } from "./interfaces";

export default class SnowmanPlace {
  experience: Experience;
  camera: Camera;
  time: Time;
  sizes: Sizes;
  area: StandardBlock;
  world: Group;
  resources: Resources;
  textures: MeshTextureInt;
  snowman: Snowman;
  pollLight: PollLight;
  snow: Snow;
  // cursor: Vector2;
  // raycaster: Raycaster;
  // intersects: any[];
  constructor() {
    this.world = new Group();
    this.resources = new Resources(sources);
    this.textures = {};

    this.experience = new Experience();
    this.time = this.experience.time;
    this.sizes = this.experience.sizes;
    this.camera = this.experience.camera;

    this.resources.on("loaded", () => {
      this.createWorld();
      this.time.on("tick", () => this.update());
    });

    // this.cursor = new Vector2(0, 0);

    // window.addEventListener("mousemove", (event) => {
    //   this.cursor.x = event.clientX / this.sizes.width - 0.5;
    //   this.cursor.y = event.clientY / this.sizes.height - 0.5;
    // });

    // this.raycaster = new Raycaster();
    // this.intersects = [];
  }
  createArea() {
    this.area = new StandardBlock({
      topReceiveShadow: true,

      segments: 10,
      width: 4.5,
      topTextures: {
        map: this.resources.items.snowFloorColor,
        normalMap: this.resources.items.snowFloorNormal,
        roughnessMap: this.resources.items.snowFloorRoughness,
        aoMap: this.resources.items.snowFloorOcclusion,
        roughness: 1,
        metalness: 0.07,
      },
      bottomTextures: {
        map: this.resources.items.dirtColor,
        normalMap: this.resources.items.dirtNormal,
      },
    });
  }

  createSnowMan() {
    const textureData: MeshTextureInt = {
      map: this.resources.items.snowColor,
      normalMap: this.resources.items.snowNormal,
      aoMap: this.resources.items.snowOcclusion,
      roughnessMap: this.resources.items.snowRoughness,
      displacementMap: this.resources.items.pollHeight,
      roughness: 0.5,
    };

    this.snowman = new Snowman({ textureData });
    this.snowman.group.position.set(1, 1.3, -0.6);
    // this.snowman.group.position.set(-1, 1.3, 1.6);
  }
  createPollLight() {
    const pollTextures: MeshTextureInt = {
      map: this.resources.items.pollColor,
      normalMap: this.resources.items.pollNormal,
      aoMap: this.resources.items.pollOcclusion,
      roughnessMap: this.resources.items.pollRoughness,
      metalnessMap: this.resources.items.pollMetalness,
    };

    this.pollLight = new PollLight({
      pollTextures,
      bellMapCap: this.resources.items.bellMapCap,
    });
    this.pollLight.group.position.x = -1;
    this.pollLight.group.position.y = 1.7;
    this.pollLight.group.position.z = -0.5;
    // this.pollLight.group.position.z = 1.5;
  }
  createSnow() {
    const snowTexture: MeshTextureInt = {
      map: this.resources.items.snowMap,
    };
    this.snow = new Snow({
      snowTexture,
    });
    this.snow.group.position.y = 1;
  }
  createWorld() {
    this.createPollLight();

    this.createSnowMan();
    this.createSnow();
    this.createArea();

    //
    this.world.add(
      this.area.group,
      this.snowman.group,
      this.pollLight.group,
      this.snow.group
    );
  }
  update() {
    this.snow.group.rotation.y += this.time.delta * 0.00001;
    // this.snow.group.rotation.x += this.time.delta * 0.0005;
    // this.snow.group.scale.y -= 0.01;

    // this.snow.group.position.y = -this.cursor.y;
    // this.snow.group.position.x = this.cursor.x;

    // if (this.snow.group.position.y > 0.9) {
    //   this.snow.group.position.y += this.time.delta * 0.00003;
    // } else {
    //   this.snow.group.position.y += 0.3;
    // }

    // this.raycaster.setFromCamera(this.cursor, this.camera.camera);
    // this.intersects = this.raycaster.intersectObject(this.snow.group);

    // if (this.intersects.length !== 0) {
    //   let obj = this.intersects[0].object;
    //   obj.material.color.set(0xffff00);
    // }
  }
}
