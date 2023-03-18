import { Group } from "three";
import { UniversalBlock } from "../../blocks";

import Resources from "../../experience/utils/Resources";
import sources from "../../sources/forestSources";
import { WorldInt } from "../Universe";
import PineThree from "./objects/PineThree";

interface ForestInt extends WorldInt {
  createForest: (area: UniversalBlock) => void;
}

export default class Forest implements ForestInt {
  leftArea: UniversalBlock;
  centerArea: UniversalBlock;
  rightArea: UniversalBlock;
  world: Group;
  resources: Resources;
  textures: any;
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
    this.leftArea = new UniversalBlock({
      topReceiveShadow: true,
      topTextures: {
        color: this.resources.items.grassColorTexture,
        normal: this.resources.items.grassNormalTexture,
      },
      bottomTextures: {
        color: this.resources.items.dirtColorTexture,
        normal: this.resources.items.dirtNormalTexture,
      },
    });
    this.leftArea.group.position.x = -1.5;
  }
  createCenterArea() {
    this.centerArea = new UniversalBlock({
      topReceiveShadow: true,

      height: 0.5,
      topTextures: {
        color: this.resources.items.calmWaterColorTexture,
        normal: this.resources.items.calmWaterNormalTexture,
      },
      bottomTextures: {
        color: this.resources.items.dirtColorTexture,
        normal: this.resources.items.dirtNormalTexture,
      },
    });

    this.centerArea.topMaterial.roughness = 0.2;
  }
  createRightArea() {
    this.rightArea = new UniversalBlock({
      topCastShadow: true,
      topReceiveShadow: true,
      bottomCastShadow: true,

      height: 0.7,
      topTextures: {
        color: this.resources.items.grassColorTexture,
        normal: this.resources.items.grassNormalTexture,
      },
      bottomTextures: {
        color: this.resources.items.dirtColorTexture,
        normal: this.resources.items.dirtNormalTexture,
      },
    });
    this.rightArea.group.position.x = 1.5;
  }
  createForest(area: UniversalBlock) {
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
