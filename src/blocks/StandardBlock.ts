import * as THREE from "three";
import { MeshTextureInt } from "../Universe/worlds/interfaces";
interface Props {
  width?: number;
  height?: number;
  oneMesh?: boolean;
  wireframe?: boolean;
  segments?: number;

  topTextures?: MeshTextureInt;
  topColor?: string;
  topCastShadow?: boolean;
  topReceiveShadow?: boolean;

  bottomTextures?: MeshTextureInt;
  bottomColor?: string;
  bottomCastShadow?: boolean;
  bottomReceiveShadow?: boolean;
}

interface StandardBlockInt {
  group: THREE.Group;
  wireframe: boolean;
  segments: number;

  topMesh: THREE.Mesh;
  topGeometry: THREE.BoxGeometry;
  topMaterial: THREE.MeshStandardMaterial;
  topMeshTextures: MeshTextureInt;
  topMeshHeight: number;
  topColor?: string;
  geometryWidth: number;

  // bottom
  bottomMesh: THREE.Mesh;
  bottomGeometry: THREE.BoxGeometry;
  bottomMaterial: THREE.MeshStandardMaterial;
  bottomMeshHeight: number;
  bottomMeshTextures: MeshTextureInt;
  bottomColor?: string;

  // props
  height: number;
  oneMesh: boolean;
  topTextures: MeshTextureInt;
  bottomTextures: MeshTextureInt;

  topCastShadow: boolean;
  topReceiveShadow: boolean;
  bottomCastShadow: boolean;
  bottomReceiveShadow: boolean;
  width: number;

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
  topMeshTextures: MeshTextureInt;
  topColor: string;

  // bottom
  bottomMesh: THREE.Mesh;
  bottomGeometry: THREE.BoxGeometry;
  bottomMaterial: THREE.MeshStandardMaterial;
  bottomMeshHeight: number;
  bottomMeshTextures: MeshTextureInt;
  bottomColor: string;
  geometryWidth: number;

  // props
  width: number;
  height: number;
  oneMesh: boolean;
  topTextures: MeshTextureInt;
  bottomTextures: MeshTextureInt;
  topCastShadow: boolean;
  topReceiveShadow: boolean;
  bottomCastShadow: boolean;
  bottomReceiveShadow: boolean;

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
    this.topMeshTextures = {
      map: null,
      normalMap: null,
      aoMap: null,
      displacementMap: null,
      roughnessMap: null,
      aoMapIntensity: null,
      displacementScale: 0.005,
      roughness: 1,
      metalness: 0.0,
    };

    if (!this.topTextures) {
      return;
    }

    this.topMeshTextures = Object.assign(
      this.topMeshTextures,
      this.topTextures
    );
    this.topMeshTextures.map.encoding = THREE.sRGBEncoding;

    this.topGeometry.setAttribute(
      "uv2",
      //@ts-ignore
      new THREE.Float32BufferAttribute(this.topGeometry.attributes.uv.array, 2)
    );

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
    this.setTopTexture();
    this.topMaterial = new THREE.MeshStandardMaterial({
      color: this.topColor ? this.topColor : "",
      ...this.topMeshTextures,
    });
    this.topMaterial.wireframe = this.wireframe ? this.wireframe : false;
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
    if (this.bottomTextures) {
      this.bottomMeshTextures = this.bottomTextures;
    } else {
      this.bottomMeshTextures = {
        map: null,
        normalMap: null,
      };
    }
    this.bottomTextures.map.encoding = THREE.sRGBEncoding;
  }

  setBottomMaterial() {
    this.setBottomTexture();
    this.bottomMaterial = new THREE.MeshStandardMaterial({
      color: this.bottomColor ? this.bottomColor : "",
      ...this.bottomMeshTextures,
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
