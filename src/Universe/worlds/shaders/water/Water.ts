import {
  PlaneGeometry,
  Mesh,
  ShaderMaterial,
  Vector2,
  BufferAttribute,
  Color,
} from "three";
import fragmentShader from "./fragment.glsl";
import vertexShader from "./vertex.glsl";
import { Experience } from "../../../../experience/Experience";
import { Debug, Time } from "../../../../experience/utils";
import GUI from "lil-gui";

interface Props {
  width?: number;
  height?: number;
}
export default class Water {
  geometry: PlaneGeometry;
  material: ShaderMaterial;
  mesh: Mesh;

  experience: Experience;
  time: Time;
  debugFolder: GUI;
  debug: Debug;

  width: number;
  height: number;
  constructor(props?: Props) {
    Object.assign(this, props);
    this.experience = new Experience();
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    this.time.on("tick", () => this.update());
    this.createMesh();
  }

  createGeometry() {
    const width = this.width ? this.width : 1;
    const height = this.height ? this.height : 1;
    this.geometry = new PlaneGeometry(width, height, 512, 512);
  }
  createMaterial() {
    const count = this.geometry.attributes.position.count;

    const randoms = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      randoms[i] = Math.random();
    }
    this.geometry.setAttribute("aRandom", new BufferAttribute(randoms, 1));

    this.material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uBigWavesFrequency: { value: new Vector2(0, 2.301) },
        uBigWavesElevation: { value: 0.102 },
        uBigWavesSpeed: { value: 0.001 },
        // 0.102
        // 2.301

        uSmallWavesElevation: { value: 0.091 },
        uSmallWavesFrequency: { value: 2.407 },
        uSmallWavesSpeed: { value: 0.032 },
        uSmallIterations: { value: 3 },

        uColorOffset: { value: 0.28 },
        uColorMultiplier: { value: 1.05 },
        uDepthColor: { value: new Color("#045886") },
        uSurfaceColor: { value: new Color("#ccebf") },
      },
    });

    this.debugController();
  }
  debugController() {
    this.debugFolder = this.debug.ui.addFolder("water");
    this.debugFolder
      .add(this.material.uniforms.uBigWavesFrequency.value, "x")
      .name("uFrequency x")
      .min(0)
      .max(20)
      .step(0.001);
    this.debugFolder
      .add(this.material.uniforms.uBigWavesFrequency.value, "y")
      .name("uFrequency y")
      .min(0)
      .max(20)
      .step(0.001);
    this.debugFolder
      .add(this.material.uniforms.uBigWavesElevation, "value")
      .name("uBigWavesElevation")
      .min(0)
      .max(2)
      .step(0.001);
    this.debugFolder
      .add(this.material.uniforms.uBigWavesSpeed, "value")
      .name("uBigWavesSpeed")
      .min(0)
      .max(10)
      .step(0.001);
    this.debugFolder
      .add(this.material.uniforms.uColorOffset, "value")
      .name("uColorOffset")
      .min(0)
      .max(2)
      .step(0.001);
    this.debugFolder
      .add(this.material.uniforms.uColorMultiplier, "value")
      .name("uColorMultiplier")
      .min(0)
      .max(10)
      .step(0.001);

    this.debugFolder
      .add(this.material.uniforms.uSmallWavesElevation, "value")
      .name("uSmallWavesElevation")
      .min(0)
      .max(0.3)
      .step(0.001);
    this.debugFolder
      .add(this.material.uniforms.uSmallWavesFrequency, "value")
      .name("uSmallWavesFrequency")
      .min(0)
      .max(5)
      .step(0.001);
    this.debugFolder
      .add(this.material.uniforms.uSmallWavesSpeed, "value")
      .name("uSmallWavesSpeed")
      .min(0)
      .max(0.5)
      .step(0.001);
    this.debugFolder
      .add(this.material.uniforms.uSmallIterations, "value")
      .name("uSmallIterations")
      .min(0)
      .max(5)
      .step(0.001);

    this.debugFolder.addColor(this.material.uniforms.uDepthColor, "value");
    this.debugFolder.addColor(this.material.uniforms.uSurfaceColor, "value");
  }
  createMesh() {
    this.createGeometry();
    this.createMaterial();
    this.mesh = new Mesh(this.geometry, this.material);

    this.mesh.rotation.x = Math.PI * -0.5;
  }

  update() {
    this.material.uniforms.uTime.value = this.time.elapsed * 0.02;
  }
}
