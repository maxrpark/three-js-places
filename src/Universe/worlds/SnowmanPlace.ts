import { Group } from "three";
import { StandardBlock } from "../../blocks";

import Resources from "../../experience/utils/Resources";
import sources from "../../sources/snowManSources";
import { Snowman, PollLight } from "./objects";
import { MeshTextureInt } from "./interfaces";

export default class SnowmanPlace {
  area: StandardBlock;
  world: Group;
  resources: Resources;
  textures: any;
  snowman: Snowman;
  pollLight: PollLight;
  constructor() {
    this.world = new Group();
    this.resources = new Resources(sources);
    this.textures = {};

    this.resources.on("loaded", () => {
      this.createWorld();
    });
  }
  createArea() {
    this.area = new StandardBlock({
      topReceiveShadow: true,

      roughness: 1,
      metalness: 0.07,
      segments: 10,
      width: 4.5,
      topTextures: {
        map: this.resources.items.snowFloorColor,
        normalMap: this.resources.items.snowFloorNormal,
        roughnessMap: this.resources.items.snowFloorRoughness,
        aoMap: this.resources.items.snowFloorOcclusion,
      },
      bottomTextures: {
        map: this.resources.items.dirtColor,
        normalMap: this.resources.items.dirtNormal,
      },
    });
  }

  createSnowMan() {
    // this.snowman = new Group();

    const textureData: MeshTextureInt = {
      meshSources: {
        map: this.resources.items.snowColor,
        normalMap: this.resources.items.snowNormal,
        aoMap: this.resources.items.snowOcclusion,
        roughnessMap: this.resources.items.snowRoughness,
      },
      metalness: 0.07,
      aoMapIntensity: 1,
    };

    this.snowman = new Snowman({ textureData });
    this.snowman.group.position.set(1, 1.3, -0.6);
  }
  createPollLight() {
    this.pollLight = new PollLight();
    this.pollLight.group.position.x = -1;
    0.5;
    this.pollLight.group.position.y = 1.7;
    this.pollLight.group.position.z = -0.5;
  }
  createWorld() {
    this.createPollLight();

    this.createSnowMan();
    this.createArea();

    //
    this.world.add(this.area.group, this.snowman.group, this.pollLight.group);

    console.log(this.area);
  }
}
