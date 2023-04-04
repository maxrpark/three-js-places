import { Group } from "three";

import Resources from "../../experience/utils/Resources";
import sources from "../../sources/forestSources";
import { StandardBlock } from "../../blocks";
import { WorldInt } from "../Universe";
import { MeshTextureInt } from "./interfaces";
import { PineThree } from "./objects/";
interface ForestInt extends WorldInt {
  createForest: (area: StandardBlock) => void;
}

export default class Forest implements ForestInt {
  leftArea: StandardBlock;
  centerArea: StandardBlock;
  rightArea: StandardBlock;

  world: Group;
  resources: Resources;
  textures: MeshTextureInt;
  pineThree: PineThree;
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
      topTextures: {
        map: this.resources.items.grassColorTexture,
        normalMap: this.resources.items.grassNormalTexture,
      },
      bottomTextures: {
        map: this.resources.items.dirtColorTexture,
        normalMap: this.resources.items.dirtNormalTexture,
      },
    });
    this.leftArea.group.position.x = -1.5;
  }
  createCenterArea() {
    this.centerArea = new StandardBlock({
      topReceiveShadow: true,

      height: 0.5,
      topTextures: {
        map: this.resources.items.calmWaterColorTexture,
        normalMap: this.resources.items.calmWaterNormalTexture,
      },
      bottomTextures: {
        map: this.resources.items.dirtColorTexture,
        normalMap: this.resources.items.dirtNormalTexture,
      },
    });

    this.centerArea.topMaterial.roughness = 0.2;
  }
  createRightArea() {
    this.rightArea = new StandardBlock({
      topCastShadow: true,
      topReceiveShadow: true,
      bottomCastShadow: true,

      height: 0.7,
      topTextures: {
        map: this.resources.items.grassColorTexture,
        normalMap: this.resources.items.grassNormalTexture,
      },
      bottomTextures: {
        map: this.resources.items.dirtColorTexture,
        normalMap: this.resources.items.dirtNormalTexture,
      },
    });
    this.rightArea.group.position.x = 1.5;
  }
  createForest(area: StandardBlock) {
    for (let i = 0; i < 3; i++) {
      const pineThree = new PineThree({
        castShadow: true,
        receiveShadow: true,
      });
      pineThree.createThree();
      area.group.add(pineThree.three);
    }
  }
  createWorld() {
    this.createLeftArea();
    this.createCenterArea();
    this.createRightArea();
    this.createForest(this.rightArea);
    this.createForest(this.leftArea);

    this.world.add(
      this.leftArea.group,
      this.rightArea.group,
      this.centerArea.group
    );
  }
}
