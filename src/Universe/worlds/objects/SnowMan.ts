import { Group, CylinderGeometry, MeshBasicMaterial, Mesh } from "three";
import { MeshTextureInt } from "../interfaces";
import { StandardSphere } from "./";
interface Props {
  textureData?: MeshTextureInt;
  receiveShadow?: boolean;
  castShadow?: boolean;
}
export default class Snowman {
  group: Group;
  textureData: MeshTextureInt;
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
      castShadow: true,
      receiveShadow: true,
      radius: 0.4,
      widthSegments: 32,
      heightSegments: 16,
      meshSources: this.textureData,
    });
  }
  setHead() {
    this.head = new Group();
    const headSphere = new StandardSphere({
      castShadow: true,
      receiveShadow: true,
      radius: 0.15,
      widthSegments: 32,
      heightSegments: 16,
      meshSources: this.textureData,
    });

    const noseHeight = 0.09;

    const geometry = new CylinderGeometry(0.006, 0.01, noseHeight, 32);
    const nose = new Mesh(
      geometry,
      new MeshBasicMaterial({ color: "#ff932e" })
    );

    nose.position.z = 0.1 + noseHeight / 2;
    nose.position.y = 0.03;
    nose.rotation.x = Math.PI / 2;

    const eyesMaterial = new MeshBasicMaterial({ color: "#453303" });

    const eyeOne = new Mesh(geometry, eyesMaterial);
    const eyeTwo = new Mesh(geometry, eyesMaterial);

    eyeOne.position.x = 0.05;
    eyeOne.position.y = 0.06;
    eyeOne.position.z = 0.07 + noseHeight / 2;
    eyeOne.rotation.x = Math.PI / 2;
    eyeOne.scale.y = 0.5;

    eyeTwo.position.x = -0.05;
    eyeTwo.position.y = 0.06;
    eyeTwo.position.z = 0.07 + noseHeight / 2;
    eyeTwo.rotation.x = Math.PI / 2;
    eyeTwo.scale.y = 0.5;

    this.head.position.y = 0.5;
    this.head.add(headSphere.mesh, nose, eyeOne, eyeTwo);
  }

  createSnowMan() {
    this.setBody();
    this.setHead();

    this.group.add(this.body.mesh, this.head);
  }
}
