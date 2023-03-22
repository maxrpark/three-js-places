import { Group } from "three";

import { StandardSphere } from "./";
interface Props {
  textureData: any;
}
export default class Snowman {
  group: Group;
  textureData: any;
  textures: any;
  snowman: Group;
  body: StandardSphere;
  head: Group;
  constructor(props?: Props) {
    Object.assign(this, props);
    this.group = new Group();
    this.textures = {};
    this.createSnowMan();
  }

  setBody() {
    this.body = new StandardSphere({
      radius: 0.4,
      widthSegments: 32,
      heightSegments: 16,
      ...this.textureData,
    });
  }
  setHead() {
    this.head = new Group();
    const headSphere = new StandardSphere({
      radius: 0.15,
      widthSegments: 32,
      heightSegments: 16,
      ...this.textureData,
    });
    headSphere.mesh.position.y = 0.53;
    this.head.add(headSphere.mesh);
  }

  createSnowMan() {
    this.group.position.set(1, 1.35, -0.6);
    this.setBody();
    this.setHead();

    this.group.add(this.body.mesh, this.head);
  }
}
