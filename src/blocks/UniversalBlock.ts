import * as THREE from "three";
import { ResourceItemsInt } from "../experience/utils/Resources";
interface Props {
  height?: number;
  oneMesh?: boolean;

  topTextures?: ResourceItemsInt;
  topColor?: string;
  topCastShadow?: boolean;
  topReceiveShadow?: boolean;

  bottomTextures?: ResourceItemsInt;
  bottomColor?: string;
  bottomCastShadow?: boolean;
  bottomReceiveShadow?: boolean;
}

interface UniversalBlockInt {
  group: THREE.Group;

  topMesh: THREE.Mesh;
  topGeometry: THREE.BoxGeometry;
  topMaterial: THREE.MeshStandardMaterial;
  topMeshTextures: any;
  topMeshHeight: number;
  topColor?: string;

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
  topTextures: ResourceItemsInt;
  bottomTextures: ResourceItemsInt;

  topCastShadow: boolean;
  topReceiveShadow: boolean;
  bottomCastShadow: boolean;
  bottomReceiveShadow: boolean;

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

export class UniversalBlock implements UniversalBlockInt {
  group: THREE.Group;

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

  // props
  height: number;
  oneMesh: boolean;
  topTextures: ResourceItemsInt;
  bottomTextures: ResourceItemsInt;
  topCastShadow: boolean;
  topReceiveShadow: boolean;
  bottomCastShadow: boolean;
  bottomReceiveShadow: boolean;

  constructor(props?: Props) {
    Object.assign(this, props);
    this.group = new THREE.Group();

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

    this.topGeometry = new THREE.BoxGeometry(1.5, this.topMeshHeight, 3);
  }
  setTopTexture() {
    this.topMeshTextures.color = this.topTextures!.color;
    // this.topMeshTextures.color.encoding = THREE.sRGBEncoding;

    this.topMeshTextures.normal = this.topTextures!.normal;
  }

  setTopMaterial() {
    this.topMeshTextures = {
      color: null,
      normal: null,
    };
    if (this.topTextures) this.setTopTexture();
    this.topMaterial = new THREE.MeshStandardMaterial({
      color: this.topColor ? this.topColor : "",
      map: this.topMeshTextures.color,
      normalMap: this.topMeshTextures.normal,
    });
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

    this.bottomGeometry = new THREE.BoxGeometry(1.5, this.bottomMeshHeight, 3);
  }

  setBottomTexture() {
    this.bottomMeshTextures.color = this.bottomTextures!.color;
    // this.bottomMeshTextures.color.encoding = THREE.sRGBEncoding;
    // this.bottomMeshTextures.color.repeat.set(1.5, 1.5);
    // this.bottomMeshTextures.color.wrapS = THREE.RepeatWrapping;
    // this.bottomMeshTextures.color.wrapT = THREE.RepeatWrapping;

    this.bottomMeshTextures.normal = this.bottomTextures!.normal;
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
