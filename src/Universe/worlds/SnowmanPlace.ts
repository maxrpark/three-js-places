import { Group } from "three";
import { StandardBlock } from "../../blocks";

import Resources from "../../experience/utils/Resources";
import sources from "../../sources/snowManSources";
import { Snowman } from "./objects";

export default class SnowmanPlace {
  area: StandardBlock;
  world: Group;
  resources: Resources;
  textures: any;
  snowman: Snowman;
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
      // topCastShadow: true,
      // topReceiveShadow: true,
      // bottomCastShadow: true,
      // bottomReceiveShadow: true,
      // wireframe: true,
      segments: 10,
      width: 4.5,
      topTextures: {
        color: this.resources.items.snowFloorColor,
        normal: this.resources.items.snowFloorNormal,
        roughnessMap: this.resources.items.snowFloorRoughness,
        aoMap: this.resources.items.snowFloorOcclusion,
        displacementMap: this.resources.items.snowFloorHeight,
      },
      displacementScale: 0.0003,
      bottomTextures: {
        color: this.resources.items.dirtColor,
        normal: this.resources.items.dirtNormal,
      },
    });
  }

  createSnowMan() {
    // this.snowman = new Group();

    const textureData = {
      sphereTextures: {
        map: this.resources.items.snowColor,
        normalMap: this.resources.items.snowNormal,
        aoMap: this.resources.items.snowOcclusion,
        displacementMap: this.resources.items.snowHeight,
        roughnessMap: this.resources.items.snowRoughness,
      },
      displacementScale: 0.005,
      aoMapIntensity: 1,
    };

    this.snowman = new Snowman({ textureData });
  }

  createWorld() {
    this.createSnowMan();
    this.createArea();

    this.world.add(this.area.group, this.snowman.group);
  }
}
