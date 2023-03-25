import * as THREE from "three";
import { MeshSources } from "../Universe/worlds/interfaces";
interface Props {
  width?: number;
  height?: number;
  oneMesh?: boolean;
  wireframe?: boolean;
  segments?: number;

  topTextures?: MeshSources;
  topColor?: string;
  topCastShadow?: boolean;
  topReceiveShadow?: boolean;

  bottomTextures?: MeshSources;
  bottomColor?: string;
  bottomCastShadow?: boolean;
  bottomReceiveShadow?: boolean;
  displacementScale?: number;
  roughness?: number;
  metalness?: number;
  aoMapIntensity?: number;
}

interface StandardBlockInt {
  group: THREE.Group;
  wireframe: boolean;
  segments: number;

  topMesh: THREE.Mesh;
  topGeometry: THREE.BoxGeometry;
  topMaterial: THREE.MeshStandardMaterial;
  topMeshTextures: any;
  topMeshHeight: number;
  topColor?: string;
  geometryWidth: number;

  // bottom
  bottomMesh: THREE.Mesh;
  bottomGeometry: THREE.BoxGeometry;
  bottomMaterial: THREE.MeshStandardMaterial;
  bottomMeshHeight: number;
  bottomMeshTextures: any;
  bottomColor?: string;

  // props
  height: number;
  oneMesh: boolean;
  topTextures: MeshSources;
  bottomTextures: MeshSources;

  topCastShadow: boolean;
  topReceiveShadow: boolean;
  bottomCastShadow: boolean;
  bottomReceiveShadow: boolean;
  width: number;

  displacementScale: number;
  roughness: number;
  metalness: number;
  aoMapIntensity: number;

  setTopGeometry: () => void;
  setTopMaterial: () => void;
  setTopMesh: () => void;
  setTopTexture: () => void;

  setBottomGeometry: () => void;
  setBottomMaterial: () => void;
  setBottomTexture: () => void;
  setBottomMesh: () => void;

  createBlock: () => void;
}

export class StandardBlock implements StandardBlockInt {
  group: THREE.Group;
  wireframe: boolean;
  segments: number;
  // top
  topMesh: THREE.Mesh;
  topGeometry: THREE.BoxGeometry;
  topMaterial: THREE.MeshStandardMaterial;
  topMeshHeight: number;
  topMeshTextures: any;
  topColor: string;

  // bottom
  bottomMesh: THREE.Mesh;
  bottomGeometry: THREE.BoxGeometry;
  bottomMaterial: THREE.MeshStandardMaterial;
  bottomMeshHeight: number;
  bottomMeshTextures: any;
  bottomColor: string;
  geometryWidth: number;

  // props
  width: number;
  height: number;
  oneMesh: boolean;
  topTextures: MeshSources;
  bottomTextures: MeshSources;
  topCastShadow: boolean;
  topReceiveShadow: boolean;
  bottomCastShadow: boolean;
  bottomReceiveShadow: boolean;
  displacementScale: number;
  roughness: number;
  metalness: number;
  aoMapIntensity: number;

  constructor(props?: Props) {
    Object.assign(this, props);
    this.group = new THREE.Group();

    this.geometryWidth = this.width ? this.width : 1.5;
    this.createBlock();
  }

  setTopGeometry() {
    this.topMeshHeight = 0.2;
    if (this.height && !this.oneMesh) {
      this.topMeshHeight = this.height * 0.2;
    } else if (this.height && this.oneMesh) {
      this.topMeshHeight = this.height;
    } else if (!this.height && this.oneMesh) {
      this.topMeshHeight = 1;
    }

    const segments = this.segments ? this.segments : 1;

    this.topGeometry = new THREE.BoxGeometry(
      this.geometryWidth,
      this.topMeshHeight,
      3,
      segments,
      segments,
      segments
    );
  }
  setTopTexture() {
    this.topMeshTextures.color = this.topTextures!.map;
    this.topMeshTextures.normal = this.topTextures!.normalMap;

    this.topGeometry.setAttribute(
      "uv2",
      //@ts-ignore
      new THREE.Float32BufferAttribute(this.topGeometry.attributes.uv.array, 2)
    );

    this.topMeshTextures.aoMap = this.topTextures.aoMap
      ? this.topTextures!.aoMap
      : null;

    this.topMeshTextures.displacementMap = this.topTextures.displacementMap
      ? this.topTextures.displacementMap
      : null;
    this.topMeshTextures.roughnessMap = this.topTextures.roughnessMap
      ? this.topTextures.roughnessMap
      : null;

    if (this.topMeshTextures.aoMap) {
      this.topGeometry.setAttribute(
        "uv2",
        new THREE.Float32BufferAttribute(
          //@ts-ignore
          this.topGeometry.attributes.uv.array,
          2
        )
      );
    }
  }

  setTopMaterial() {
    this.topMeshTextures = {
      color: null,
      normal: null,
      aoMap: null,
      displacementMap: null,
    };
    if (this.topTextures) this.setTopTexture();
    this.topMaterial = new THREE.MeshStandardMaterial({
      color: this.topColor ? this.topColor : "",
      map: this.topMeshTextures.color,
      normalMap: this.topMeshTextures.normal,
      aoMap: this.topMeshTextures.aoMap,
      aoMapIntensity: this.aoMapIntensity ? this.aoMapIntensity : 1,
      displacementMap: this.topMeshTextures.displacementMap,
      displacementScale: this.displacementScale
        ? this.displacementScale
        : 0.005,
      roughness: this.roughness ? this.roughness : 1,
      metalness: this.metalness ? this.metalness : 0.0,
    });
    this.topMaterial.wireframe = this.wireframe ? this.wireframe : false;
    // this.topMaterial.wireframe = true;
  }

  setTopMesh() {
    this.setTopGeometry();
    this.setTopMaterial();
    this.topMesh = new THREE.Mesh(this.topGeometry, this.topMaterial);
    this.topMesh.castShadow = this.topCastShadow ? this.topCastShadow : false;
    this.topMesh.receiveShadow = this.topReceiveShadow
      ? this.topReceiveShadow
      : false;
  }

  setBottomGeometry() {
    this.bottomMeshHeight = 0.8;
    if (this.height) {
      this.bottomMeshHeight = this.height * 0.8;
    }

    this.bottomGeometry = new THREE.BoxGeometry(
      this.geometryWidth,
      this.bottomMeshHeight,
      3
    );
  }

  setBottomTexture() {
    this.bottomMeshTextures.color = this.bottomTextures!.map;
    // this.bottomMeshTextures.color.encoding = THREE.sRGBEncoding;
    // this.bottomMeshTextures.color.repeat.set(1.5, 1.5);
    // this.bottomMeshTextures.color.wrapS = THREE.RepeatWrapping;
    // this.bottomMeshTextures.color.wrapT = THREE.RepeatWrapping;

    this.bottomMeshTextures.normal = this.bottomTextures!.normalMap;
    // this.bottomMeshTextures.normal.repeat.set(1.5, 1.5);
    // this.bottomMeshTextures.normal.wrapS = THREE.RepeatWrapping;
    // this.bottomMeshTextures.normal.wrapT = THREE.RepeatWrapping;
  }

  setBottomMaterial() {
    this.bottomMeshTextures = {
      color: null,
      normal: null,
    };
    if (this.bottomTextures) this.setBottomTexture();

    this.bottomMaterial = new THREE.MeshStandardMaterial({
      color: this.bottomColor ? this.bottomColor : "",
      map: this.bottomMeshTextures.color,
      normalMap: this.bottomMeshTextures.normal,
    });
    this.bottomMaterial.wireframe = this.wireframe ? this.wireframe : false;
  }

  setBottomMesh() {
    this.setBottomGeometry();
    this.setBottomMaterial();
    this.bottomMesh = new THREE.Mesh(this.bottomGeometry, this.bottomMaterial);
    this.bottomMesh.position.y = -this.topMeshHeight * 2.5;

    this.bottomMesh.castShadow = this.bottomCastShadow
      ? this.bottomCastShadow
      : false;
    this.bottomMesh.receiveShadow = this.bottomReceiveShadow
      ? this.bottomReceiveShadow
      : false;
  }

  createBlock() {
    this.setTopMesh();
    this.group.add(this.topMesh);

    if (!this.oneMesh) {
      this.setBottomMesh();
      this.group.add(this.bottomMesh);
    }

    this.group.position.y = this.oneMesh
      ? this.topMeshHeight / 2
      : this.topMeshHeight / 2 + this.bottomMeshHeight;
  }
}
