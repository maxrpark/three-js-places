import { CircleGeometry, Mesh, ShaderMaterial } from "three";

export default class Water {
  geometry: CircleGeometry;
  material: ShaderMaterial;
  mesh: Mesh;

  constructor() {
    this.createMesh();
  }

  createGeometry() {
    this.geometry = new CircleGeometry(1, 32);
  }
  createMaterial() {
    this.material = new ShaderMaterial();
  }
  createMesh() {
    this.createGeometry();
    this.createMaterial();
    this.mesh = new Mesh(this.geometry, this.material);

    this.mesh.rotation.x = Math.PI * -0.5;
  }
}
