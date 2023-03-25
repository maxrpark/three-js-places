import * as THREE from "three";

interface Props {
  // props
  leafColor?: String;
  thunkColor?: String;
  castShadow?: boolean;
  receiveShadow?: boolean;
}

interface PineThreeInf extends Props {
  three: THREE.Group;

  leafs: THREE.Mesh;
  leafGeometry: THREE.ConeGeometry;
  leafMaterial: THREE.MeshStandardMaterial;

  // thunk
  thunk: THREE.Mesh;
  thunkGeometry: THREE.BoxGeometry;
  thunkMaterial: THREE.MeshStandardMaterial;

  // props
  castShadow: boolean;
  receiveShadow: boolean;

  setLeafsGeometry: () => void;
  setLeafsMaterial: () => void;
  setLeafsMesh: () => void;
  setLeafsTexture: () => void;

  setThunkGeometry: () => void;
  setThunkMaterial: () => void;
  setThunkTexture: () => void;
  setThunkMesh: () => void;

  createThree: () => void;
  createThrees: (numberOfThrees: number) => void;
}

export default class PineThree implements PineThreeInf {
  three: THREE.Group;

  leafs: THREE.Mesh;
  leafsGeometry: THREE.ConeGeometry;
  leafsMaterial: THREE.MeshStandardMaterial;

  // thunk
  thunk: THREE.Mesh;
  thunkGeometry: THREE.BoxGeometry;
  thunkMaterial: THREE.MeshStandardMaterial;

  // props
  castShadow: boolean;
  receiveShadow: boolean;
  leafColor: String;
  thunkColor: String;

  constructor(props?: Props) {
    Object.assign(this, props);
    this.three = new THREE.Group();
  }
  leafGeometry: THREE.ConeGeometry;
  leafMaterial: THREE.MeshStandardMaterial;
  setLeafsTexture: () => void;

  setLeafsGeometry() {
    this.leafsGeometry = new THREE.ConeGeometry(0.3, 0.7, 20, 64);
  }
  setLeafsMaterial() {
    this.leafsMaterial = new THREE.MeshStandardMaterial({
      color: "#539451",
    });
  }
  setLeafsMesh() {
    this.setLeafsGeometry();
    this.setLeafsMaterial();
    this.leafs = new THREE.Mesh(this.leafsGeometry, this.leafsMaterial);
    this.leafs.position.y = 0.6;

    this.leafs.castShadow = this.castShadow ? this.castShadow : false;
    this.leafs.receiveShadow = this.receiveShadow ? this.receiveShadow : false;
  }
  setLeafTexture() {}

  setThunkGeometry() {
    this.thunkGeometry = new THREE.BoxGeometry(0.1, 0.5, 0.1);
  }
  setThunkMaterial() {
    this.thunkMaterial = new THREE.MeshStandardMaterial({ color: "#804a00" });
  }
  setThunkTexture() {}
  setThunkMesh() {
    this.setThunkGeometry();
    this.setThunkMaterial();
    this.thunk = new THREE.Mesh(this.thunkGeometry, this.thunkMaterial);

    this.thunk.castShadow = this.castShadow ? this.castShadow : false;
    this.thunk.receiveShadow = this.receiveShadow ? this.receiveShadow : false;
  }

  createThree() {
    this.setThunkMesh();
    this.setLeafsMesh();

    this.three.position.y = 0.32;
    this.three.position.x = (Math.random() - 0.5) * 1.5;
    this.three.position.z = (Math.random() - 0.5) * 2.5;
    this.three.add(this.leafs, this.thunk);
  }

  createThrees(numberOfThrees: number = 3) {
    for (let i = 0; i < numberOfThrees; i++) {
      this.createThree();
    }
  }
}
