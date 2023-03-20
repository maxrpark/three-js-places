import { Group } from "three";
import { StandardBlock } from "../../blocks";

import Resources from "../../experience/utils/Resources";
import sources from "../../sources/baseWorldSources";

export default class BasicWorld {
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
      this.leftArea = new StandardBlock({
        // topCastShadow: true,
        // topReceiveShadow: true,
        // bottomCastShadow: true,
        // bottomReceiveShadow: true,
        topTextures: {
          color: this.resources.items.grassColorTexture,
          normal: this.resources.items.grassNormalTexture,
        },
        bottomTextures: {
          color: this.resources.items.dirtColorTexture,
          normal: this.resources.items.dirtNormalTexture,
        },
      });
      this.centerArea = new StandardBlock({
        // topCastShadow: true,
        // topReceiveShadow: true,
        // bottomCastShadow: true,
        // bottomReceiveShadow: true,

        topTextures: {
          color: this.resources.items.grassColorTexture,
          normal: this.resources.items.grassNormalTexture,
        },
        bottomTextures: {
          color: this.resources.items.dirtColorTexture,
          normal: this.resources.items.dirtNormalTexture,
        },
      });
      this.rightArea = new StandardBlock({
        // topCastShadow: true,
        // topReceiveShadow: true,
        // bottomCastShadow: true,
        // bottomReceiveShadow: true,

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
      this.rightArea.group.position.x = 1.5;

      this.world.add(
        this.leftArea.group,
        this.rightArea.group,
        this.centerArea.group
      );
    });
  }
}
