import { Group } from "three";

import { StandardBlock } from "../../blocks";
import { Experience } from "../../experience/Experience";
import { Time, Sizes, Camera } from "../../experience/utils";
import { MeshTextureInt } from "./interfaces";

import Resources from "../../experience/utils/Resources";
import sources from "../../sources/snowManSources";
import { Snowman, PollLight, Particles } from "./objects";
import Text3D from "./text";

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
  snow: Particles;
  text: Text3D;

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
  }
  createText() {
    this.text = new Text3D({ text: "Snowman Place" });
    this.text.on("textLoaded", () => {
      this.world.add(this.text.mesh);
    });
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
      bellmatcap: this.resources.items.bellmatcap,
    });
    this.pollLight.group.position.x = -1;
    this.pollLight.group.position.y = 1.7;
    this.pollLight.group.position.z = -0.5;
  }
  createSnow() {
    const particlesTexture: MeshTextureInt = {
      map: this.resources.items.snowMap,
    };
    this.snow = new Particles({
      particlesTexture,
    });
    this.snow.points.position.y = 1;
  }
  createWorld() {
    this.createText();
    this.createPollLight();

    this.createSnowMan();
    this.createSnow();
    this.createArea();

    this.world.add(
      this.area.group,
      this.snowman.group,
      this.pollLight.group,
      this.snow.points
    );
  }
  update() {
    this.snow.points.rotation.y += this.time.delta * 0.00001;
  }
}
