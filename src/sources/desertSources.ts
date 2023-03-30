export interface SourceInt {
  type: "cubeTextureLoader" | "textureLoader" | "gltfLoader";
  name: string;
  path: string & string[];
}

export default [
  {
    name: "floorColor",
    type: "textureLoader",
    path: "textures/desert_ground/color.jpg",
  },
  {
    name: "floorNormal",
    type: "textureLoader",
    path: "textures/desert_ground/normal.jpg",
  },
  {
    name: "floorHeight",
    type: "textureLoader",
    path: "textures/desert_ground/height.png",
  },
  {
    name: "floorOcclusion",
    type: "textureLoader",
    path: "textures/desert_ground/occlusion.jpg",
  },
  {
    name: "floorRoughness",
    type: "textureLoader",
    path: "textures/desert_ground/roughness.jpg",
  },
  {
    name: "Jaguar",
    type: "gltfLoader",
    path: "models/jaguar/scene.gltf",
  },
] as SourceInt[];
