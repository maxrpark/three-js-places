import { AnimationMixer, Mesh } from "three";
import { Experience } from "../../../experience/Experience";
import { Time } from "../../../experience/utils";

interface Props {
  source: any;
}

export default class Jaguar {
  experience: Experience;
  time: Time;
  model: Mesh;
  source: any;
  animation: {
    mixer: AnimationMixer;
    action: any;
  };

  constructor(props: Props) {
    Object.assign(this, props);
    this.experience = new Experience();
    this.time = this.experience.time;
    this.createJaguar();
  }
  createJaguar() {
    this.model = this.source.scene;

    this.model.traverse((child: any) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
      }
    });
    this.animateJaguar();
  }
  animateJaguar() {
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
    this.animation.mixer.update(this.time.delta * 0.001);
  }
}
