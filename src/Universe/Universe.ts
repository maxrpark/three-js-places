import { Experience, ExperienceInt } from "../experience/Experience";
import { Environment } from "./Environment";
import { Debug } from "../experience/utils";
import GUI from "lil-gui";
import {
  BasicWorld,
  Forest,
  OrangeOrchard,
  SnowmanPlace,
  Wild,
  BoxesWorld,
} from "./worlds";
import { Mesh, Group } from "three";
import { StandardBlock } from "../blocks";
import Resources from "../experience/utils/Resources";

export interface WorldInt {
  leftArea: StandardBlock;
  centerArea: StandardBlock;
  rightArea: StandardBlock;
  world: Group;
  resources: Resources;
  textures: any;
}

export class Universe {
  world: WorldInt | null;
  selectedWorld: any;
  experience: ExperienceInt;
  environment: Environment;
  debug: Debug;
  debugFolder: GUI;
  worlds: any;
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;

    this.debugFolder = this.debug.ui.addFolder("worlds");

    this.worlds = {
      "Basic World": BasicWorld,
      Forest: Forest,
      "Orange Orchard": OrangeOrchard,
      SnowmanPlace: SnowmanPlace,
      Wild: Wild,
      "Boxes World": BoxesWorld,
    };

    this.environment = new Environment({
      hasAmbientLight: true,
      hasDirectionalLight: true,
      castShadow: true,
    });

    this.selectedWorld = Forest;
    this.createNewWorld();

    this.debugFolder
      .add({}, "worlds", {
        "Boxes World": "Boxes World",
        "Basic World": "Basic World",
        Forest: "Forest",
        "Orange Orchard": "Orange Orchard",
        SnowmanPlace: "SnowmanPlace",
        Wild: "Wild",
      })
      .onChange((value: string) => this.destroyWorld(value))
      .setValue("Wild");
  }
  destroyWorld(value: string) {
    this.selectedWorld = this.worlds[value];
    this.experience.scene.traverse((child) => {
      // Test if it's a mesh
      if (child instanceof Mesh) {
        child.geometry.dispose();
        this.experience.scene.remove(child.geometry);

        // Loop through the material properties
        for (const key in child.material) {
          const value = child.material[key];

          // Test if there is a dispose function
          if (value && typeof value.dispose === "function") {
            value.dispose();
            this.experience.scene.remove(child.material);
          }
        }
      }
    });
    if (this.world) this.experience.scene.remove(this.world.world);
    this.world = null;

    this.createNewWorld();
  }

  createNewWorld() {
    const world = this.selectedWorld;

    this.world = new world();

    if (this.world) this.experience.scene.add(this.world.world);
    this.experience.camera.camera.position.set(1.5, 3.5, 5);
  }
}
