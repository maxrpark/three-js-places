import { Mesh } from "three";
import { Experience } from "../../../experience/Experience";
import { Time } from "../../../experience/utils";
interface Props {
  source: any;
}

export default class OneAnimationModel {
  experience: Experience;
  time: Time;

  source: any;
  model: Mesh;
  constructor(props: Props) {
    Object.assign(this, props);

    this.experience = new Experience();
    this.time = this.experience.time;
    this.createModel();
  }

  createModel() {
    this.model = this.source.scene;

    this.model.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
        child.receiveShadow;
      }
    });
  }
}
