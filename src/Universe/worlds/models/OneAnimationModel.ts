import { AnimationMixer, Group, Mesh } from "three";
import { Experience } from "../../../experience/Experience";
import { Time } from "../../../experience/utils";

interface Props {
  source: any;
  animationValue?: number;
}

export default class OneAnimationModel {
  experience: Experience;
  time: Time;
  model: Group;
  animation: {
    mixer: AnimationMixer;
    action: any;
  };
  // props
  source: any;
  animationValue: number;
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
        child.receiveShadow = true;
      }
    });
    this.animate();
  }

  animate() {
    this.animation = {
      mixer: new AnimationMixer(this.model),
      action: null,
    };
    this.animation.action = this.animation.mixer.clipAction(
      this.source.animations[0]
    );
    this.animation.action.play();
  }

  update() {
    const animationValue = this.animationValue ? this.animationValue : 0.001;
    this.animation.mixer.update(this.time.delta * animationValue);
  }
}
