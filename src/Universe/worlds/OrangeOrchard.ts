import { Group } from "three";
import { UniversalBlock } from "../../blocks";

import Resources from "../../experience/utils/Resources";
import sources from "../../sources/orchardSources";
import FruitThree from "./objects/FruitThree";

export default class OrangeOrchard {
  leftArea: UniversalBlock;
  centerArea: UniversalBlock;
  rightArea: UniversalBlock;
  world: Group;
  resources: Resources;
  textures: any;
  constructor() {
    this.world = new Group();
    this.resources = new Resources(sources);
    this.textures = {};

    this.resources.on("loaded", () => {
      this.createWorld();
    });
  }
  createLeftArea() {
    this.leftArea = new UniversalBlock({
      topReceiveShadow: true,

      bottomColor: "#724818",
      height: 0.95,

      topTextures: {
        color: this.resources.items.grassColor,
        normal: this.resources.items.grassNormal,
      },
    });
    this.leftArea.group.position.x = -1.5;
  }
  createCenterArea() {
    this.centerArea = new UniversalBlock({
      topReceiveShadow: true,

      bottomColor: "#724818",

      topTextures: {
        color: this.resources.items.floorStoneColor,
        normal: this.resources.items.floorStoneNormal,
      },
    });
  }
  createRightArea() {
    this.rightArea = new UniversalBlock({
      bottomColor: "#724818",
      height: 0.95,
      topReceiveShadow: true,

      topTextures: {
        color: this.resources.items.grassColor,
        normal: this.resources.items.grassNormal,
      },
    });
    this.rightArea.group.position.x = 1.5;
  }

  createOrangeThree() {
    return new FruitThree({
      numberOfFruitOnThree: 15,

      baseReceiveShadow: true,

      leafsCastShadow: true,
      leafsReceiveShadow: true,

      thunkCastShadow: true,
      thunkReceiveShadow: true,

      fruitCastShadow: true,
      fruitReceiveShadow: true,

      baseTextures: {
        color: this.resources.items.dirtColor,
        normal: this.resources.items.dirtNormal,
      },
      thunkTextures: {
        color: this.resources.items.barkColor,
        normal: this.resources.items.barkNormal,
        aoMap: this.resources.items.barkOcclusion,
        displacementMap: this.resources.items.barkHeight,
        roughnessMap: this.resources.items.barkRoughness,
      },
      fruitTextures: {
        color: this.resources.items.orangeColor,
        normal: this.resources.items.orangeNormal,
        aoMap: this.resources.items.orangeOcclusion,
        displacementMap: this.resources.items.orangeHeight,
      },
      leafTextures: {
        color: this.resources.items.cloverColor,
        normal: this.resources.items.cloverNormal,
        aoMap: this.resources.items.cloverOcclusion,
        displacementMap: this.resources.items.cloverHeight,
        roughnessMap: this.resources.items.cloverRoughness,
      },
    });
  }
  createForest(area: UniversalBlock) {
    const threeOne = this.createOrangeThree();
    const threeTwo = this.createOrangeThree();

    threeOne.three.position.z = 0.8;
    threeTwo.three.position.z = -0.8;

    area.group.add(threeOne.three, threeTwo.three);
  }
  createWorld() {
    this.createLeftArea();
    this.createCenterArea();
    this.createRightArea();
    this.createForest(this.leftArea);
    this.createForest(this.rightArea);
    this.world.add(
      this.leftArea.group,
      this.rightArea.group,
      this.centerArea.group
    );
  }
}
