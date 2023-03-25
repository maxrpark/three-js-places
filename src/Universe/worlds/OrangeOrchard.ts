import { Group } from "three";
import { StandardBlock } from "../../blocks";

import Resources from "../../experience/utils/Resources";
import sources from "../../sources/orchardSources";
import FruitThree from "./objects/FruitThree";

export default class OrangeOrchard {
  leftArea: StandardBlock;
  centerArea: StandardBlock;
  rightArea: StandardBlock;
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
    this.leftArea = new StandardBlock({
      topReceiveShadow: true,
      height: 0.95,
      bottomTextures: {
        map: this.resources.items.dirtColor,
        normalMap: this.resources.items.dirtNormal,
      },
      topTextures: {
        map: this.resources.items.grassColor,
        normalMap: this.resources.items.grassNormal,
      },
    });
    this.leftArea.group.position.x = -1.5;
  }
  createCenterArea() {
    this.centerArea = new StandardBlock({
      topReceiveShadow: true,
      bottomTextures: {
        map: this.resources.items.dirtColor,
        normalMap: this.resources.items.dirtNormal,
      },
      topTextures: {
        map: this.resources.items.floorStoneColor,
        normalMap: this.resources.items.floorStoneNormal,
        aoMap: this.resources.items.floorStoneOcclusion,
      },
      aoMapIntensity: 1.7,
    });
  }
  createRightArea() {
    this.rightArea = new StandardBlock({
      height: 0.95,
      topReceiveShadow: true,
      bottomTextures: {
        map: this.resources.items.dirtColor,
        normalMap: this.resources.items.dirtNormal,
      },
      topTextures: {
        map: this.resources.items.grassColor,
        normalMap: this.resources.items.grassNormal,
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
        map: this.resources.items.dirtColor,
        normalMap: this.resources.items.dirtNormal,
      },
      thunkTextures: {
        map: this.resources.items.barkColor,
        normalMap: this.resources.items.barkNormal,
        aoMap: this.resources.items.barkOcclusion,
        displacementMap: this.resources.items.barkHeight,
        roughnessMap: this.resources.items.barkRoughness,
      },
      fruitTextures: {
        map: this.resources.items.orangeColor,
        normalMap: this.resources.items.orangeNormal,
        aoMap: this.resources.items.orangeOcclusion,
        displacementMap: this.resources.items.orangeHeight,
      },
      leafTextures: {
        map: this.resources.items.cloverColor,
        normalMap: this.resources.items.cloverNormal,
        aoMap: this.resources.items.cloverOcclusion,
        displacementMap: this.resources.items.cloverHeight,
        roughnessMap: this.resources.items.cloverRoughness,
      },
    });
  }
  createForest(area: StandardBlock) {
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
