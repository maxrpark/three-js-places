import { Group } from "three";
import { StandardBlock } from "../../blocks";

import Resources from "../../experience/utils/Resources";
import sources from "../../sources/orchardSources";

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
      bottomColor: "#724818",
      height: 0.95,

      topTextures: {
        color: this.resources.items.grassColorTexture,
        normal: this.resources.items.grassNormalTexture,
      },
    });
    this.leftArea.group.position.x = -1.5;
  }
  createCenterArea() {
    this.centerArea = new StandardBlock({
      bottomColor: "#724818",

      topTextures: {
        color: this.resources.items.floorStoneColor,
        normal: this.resources.items.floorStoneTexture,
      },
    });
  }
  createRightArea() {
    this.rightArea = new StandardBlock({
      bottomColor: "#724818",
      height: 0.95,

      topTextures: {
        color: this.resources.items.grassColorTexture,
        normal: this.resources.items.grassNormalTexture,
      },
    });
    this.rightArea.group.position.x = 1.5;
  }
  // createForest(area: StandardBlock) {}
  createWorld() {
    this.createLeftArea();
    this.createCenterArea();
    this.createRightArea();

    this.world.add(
      this.leftArea.group,
      this.rightArea.group,
      this.centerArea.group
    );
  }
}
