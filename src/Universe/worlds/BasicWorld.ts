import { Group } from "three";
import { StandardBlock } from "../../blocks";

import Resources from "../../experience/utils/Resources";
import sources from "../../sources/baseWorldSources";

export default class SnowmanPlace {
  leftArea: StandardBlock;
  centerArea: StandardBlock;
  rightArea: StandardBlock;
  world: Group;
  resources: Resources;
  constructor() {
    this.world = new Group();
    this.resources = new Resources(sources);

    this.resources.on("loaded", () => {
      this.createWorld();
    });
  }
  createLeftArea() {
    this.leftArea = new StandardBlock({
      topTextures: {
        map: this.resources.items.grassColorTexture,
        normalMap: this.resources.items.grassNormalTexture,
      },
      bottomTextures: {
        map: this.resources.items.dirtColorTexture,
        normalMap: this.resources.items.dirtNormalTexture,
      },
    });
  }
  createCenterArea() {
    this.centerArea = new StandardBlock({
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

  createRightArea() {
    this.rightArea = new StandardBlock({
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
