import {
  Group,
  SphereGeometry,
  CylinderGeometry,
  CircleGeometry,
  Mesh,
  MeshStandardMaterial,
  DodecahedronGeometry,
  Float32BufferAttribute,
  sRGBEncoding,
  RepeatWrapping,
  MeshLambertMaterial,
} from "three";
import { MeshSources } from "../interfaces";

interface Props {
  // // props
  leafColor?: String;
  thunkColor?: String;
  leafTextures?: MeshSources;
  thunkTextures?: MeshSources;
  baseTextures?: MeshSources;
  fruitTextures?: MeshSources;
  numberOfFruitOnThree?: number;

  baseCastShadow?: boolean;
  baseReceiveShadow?: boolean;

  leafsCastShadow?: boolean;
  leafsReceiveShadow?: boolean;

  thunkCastShadow?: boolean;
  thunkReceiveShadow?: boolean;

  fruitCastShadow?: boolean;
  fruitReceiveShadow?: boolean;
}

export default class FruitThree {
  three: Group;

  base: Mesh;
  baseGeometry: CircleGeometry;
  baseMaterial: MeshStandardMaterial;
  baseMeshTextures: any;

  thunk: Mesh;
  thunkGeometry: CylinderGeometry;
  thunkMaterial: MeshStandardMaterial;
  thunkMeshTextures: any;
  topArea: Group;

  leafs: Mesh;
  leafsGeometry: DodecahedronGeometry;
  leafsMaterial: MeshStandardMaterial;
  leafsMeshTextures: any;

  fruit: Mesh;
  fruitGeometry: SphereGeometry;
  fruitMaterial: MeshLambertMaterial;
  fruitMeshTextures: any;

  // // props
  leafColor: String;
  thunkColor: String;
  leafTextures: MeshSources;
  thunkTextures: MeshSources;
  numberOfFruitOnThree: number;
  baseTextures?: MeshSources;
  fruitTextures: MeshSources;

  baseCastShadow?: boolean;
  baseReceiveShadow?: boolean;

  leafsCastShadow?: boolean;
  leafsReceiveShadow?: boolean;

  thunkCastShadow?: boolean;
  thunkReceiveShadow?: boolean;

  fruitCastShadow?: boolean;
  fruitReceiveShadow?: boolean;

  constructor(props?: Props) {
    Object.assign(this, props);
    this.createThree();
  }

  setBaseGeometry() {
    this.baseGeometry = new CircleGeometry(0.5, 23);
  }
  setBaseTexture() {
    this.baseMeshTextures.color = this.baseTextures!.map;
    this.baseMeshTextures.normal = this.baseTextures!.normalMap;
  }
  setBaseMaterial() {
    this.baseMaterial = new MeshStandardMaterial();

    this.baseMeshTextures = {
      color: null,
      normal: null,
    };
    if (this.baseTextures) this.setBaseTexture();

    this.baseMaterial = new MeshStandardMaterial({
      map: this.baseMeshTextures.color,
      normalMap: this.baseMeshTextures.normal,
    });
  }

  createBase() {
    this.setBaseGeometry();
    this.setBaseMaterial();
    this.base = new Mesh(this.baseGeometry, this.baseMaterial);
    this.base.rotation.x = -Math.PI / 2;

    this.base.castShadow = this.baseCastShadow ? this.baseCastShadow : false;
    this.base.receiveShadow = this.baseReceiveShadow
      ? this.baseReceiveShadow
      : false;
  }

  setThunkGeometry() {
    this.thunkGeometry = new CylinderGeometry(0.04, 0.04, 0.4);
  }
  setThunkTexture() {
    this.thunkMeshTextures.color = this.thunkTextures!.map;
    this.thunkMeshTextures.normal = this.thunkTextures!.normalMap;

    this.thunkGeometry.setAttribute(
      "uv2",
      //@ts-ignore
      new Float32BufferAttribute(this.thunkGeometry.attributes.uv.array, 2)
    );

    this.thunkMeshTextures.aoMap = this.thunkTextures!.aoMap;
    this.thunkMeshTextures.displacementMap =
      this.thunkTextures!.displacementMap;
    this.thunkMeshTextures.roughnessMap = this.thunkTextures!.roughnessMap;
  }
  setThunkMaterial() {
    this.thunkMeshTextures = {
      color: null,
      normal: null,
      aoMap: null,
      displacementMap: null,
      roughnessMap: null,
    };
    if (this.thunkMeshTextures) this.setThunkTexture();

    this.thunkMaterial = new MeshStandardMaterial({
      map: this.thunkMeshTextures.color,
      normalMap: this.thunkMeshTextures.normal,
      aoMap: this.thunkMeshTextures.aoMap,
      aoMapIntensity: 1,
      displacementMap: this.thunkMeshTextures.displacementMap,
      displacementScale: 0.005,
      roughnessMap: this.thunkMeshTextures.roughnessMap,
      roughness: 0.02,
      metalness: 0,
    });
  }

  createThunk() {
    this.setThunkGeometry();
    this.setThunkMaterial();
    this.thunk = new Mesh(this.thunkGeometry, this.thunkMaterial);

    this.thunk.position.y = 0.2;

    this.thunk.castShadow = this.thunkCastShadow ? this.thunkCastShadow : false;
    this.thunk.receiveShadow = this.thunkReceiveShadow
      ? this.thunkReceiveShadow
      : false;
  }

  setLeafGeometry() {
    this.leafsGeometry = new DodecahedronGeometry(0.4, 0);
  }
  setLeafTexture() {
    this.leafsMeshTextures.color = this.leafTextures!.map;
    this.leafsMeshTextures.normal = this.leafTextures!.normalMap;

    this.leafsMeshTextures.color.encoding = sRGBEncoding;
    this.leafsMeshTextures.color.repeat.set(1.5, 1.5);
    this.leafsMeshTextures.color.wrapS = RepeatWrapping;
    this.leafsMeshTextures.color.wrapT = RepeatWrapping;

    this.leafsMeshTextures.normal.repeat.set(1.5, 1.5);
    this.leafsMeshTextures.normal.wrapS = RepeatWrapping;
    this.leafsMeshTextures.normal.wrapT = RepeatWrapping;

    this.leafsGeometry.setAttribute(
      "uv2",
      //@ts-ignore
      new Float32BufferAttribute(this.leafsGeometry.attributes.uv.array, 2)
    );

    this.leafsMeshTextures.aoMap = this.leafTextures!.aoMap;
    this.leafsMeshTextures.displacementMap = this.leafTextures!.displacementMap;
    this.leafsMeshTextures.roughnessMap = this.leafTextures!.roughnessMap;
  }
  setLeafMaterial() {
    const color = this.leafColor
      ? (this.leafColor as THREE.ColorRepresentation)
      : "";

    this.leafsMeshTextures = {
      color: null,
      normal: null,
      aoMap: null,
      displacementMap: null,
      roughnessMap: null,
    };

    if (this.leafTextures) this.setLeafTexture();

    this.leafsMaterial = new MeshStandardMaterial({
      color,
      map: this.leafsMeshTextures.color,
      normalMap: this.leafsMeshTextures.normal,
      aoMap: this.leafsMeshTextures.aoMap,
      aoMapIntensity: 1,
      displacementMap: this.leafsMeshTextures.displacementMap,
      displacementScale: 0.0005,
      roughnessMap: this.leafsMeshTextures.roughnessMap,
      roughness: 0.002,
      metalness: 0,
    });
  }

  createLeafs() {
    this.setLeafGeometry();
    this.setLeafMaterial();
    this.leafs = new Mesh(this.leafsGeometry, this.leafsMaterial);

    this.leafs.castShadow = this.leafsCastShadow ? this.leafsCastShadow : false;
    this.leafs.receiveShadow = this.leafsReceiveShadow
      ? this.leafsReceiveShadow
      : false;
  }

  setFruitGeometry() {
    this.fruitGeometry = new SphereGeometry(0.04, 32, 64);
  }
  setFruitTexture() {
    this.fruitMeshTextures.color = this.fruitTextures!.map;
    this.fruitMeshTextures.normal = this.fruitTextures!.normalMap;

    this.fruitGeometry.setAttribute(
      "uv2",
      //@ts-ignore
      new Float32BufferAttribute(this.fruitGeometry.attributes.uv.array, 2)
    );

    this.fruitMeshTextures.aoMap = this.fruitTextures!.aoMap;
    this.fruitMeshTextures.displacementMap =
      this.fruitTextures!.displacementMap;
  }
  setFruitMaterial() {
    this.fruitMeshTextures = {
      color: null,
      normal: null,
      aoMap: null,
      displacementMap: null,
    };
    if (this.fruitMeshTextures) this.setFruitTexture();

    this.fruitMaterial = new MeshLambertMaterial({
      map: this.fruitMeshTextures.color,
      normalMap: this.fruitMeshTextures.normal,
      aoMap: this.fruitMeshTextures.aoMap,
      aoMapIntensity: 1,
      displacementMap: this.fruitMeshTextures.displacementMap,
      displacementScale: 0.05,
    });
  }

  createFruit() {
    this.setFruitGeometry();
    this.setFruitMaterial();

    const fruit = new Mesh(this.fruitGeometry, this.fruitMaterial);

    fruit.castShadow = this.fruitCastShadow ? this.fruitCastShadow : false;
    fruit.receiveShadow = this.fruitReceiveShadow
      ? this.fruitReceiveShadow
      : false;

    return fruit;
  }

  createFruitsOnThree() {
    const count = this.numberOfFruitOnThree ? this.numberOfFruitOnThree : 10;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2; // Random angle

      const x = Math.cos(angle) * 0.32; // Get the x position using cosines
      const z = Math.sin(angle) * 0.32; // Get the z position using sinus

      const fruit = this.createFruit();
      fruit.position.set(x, (Math.random() - 0.5) * 1 * 0.5, z);

      const scale = 0.2 + Math.random();
      fruit.scale.x = scale;
      fruit.scale.y = scale;
      fruit.scale.z = scale;

      // Rotation
      fruit.rotation.z = (Math.random() - 0.5) * 0.4;
      fruit.rotation.y = (Math.random() - 0.5) * 0.4;
      this.topArea.add(fruit);
    }
  }
  createFruitsBase() {
    const count = Math.floor(3 + Math.random() * 5);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2; // Random angle
      const radius = 0.08 + Math.random() * 0.6; // Random radius
      const x = Math.cos(angle) * radius; // Get the x position using cosines
      const y = Math.sin(angle) * radius; // Get the z position using sinus

      const orange = this.createFruit();
      orange.position.set(x, y, 0.04);

      this.base.add(orange);
    }
  }

  setTopThree() {
    this.topArea = new Group();
    this.createLeafs();
    this.createFruitsOnThree();
    this.createFruitsBase();

    this.topArea.add(this.leafs);

    this.topArea.position.y = 0.7;
  }

  createThree() {
    this.three = new Group();

    // this.three.position.x = -2;
    this.three.position.y = 0.1;

    this.createBase();
    this.createThunk();
    this.setTopThree();

    this.three.add(this.base, this.thunk, this.topArea);
  }
}
