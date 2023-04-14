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
    name: "jaguar",
    type: "gltfLoader",
    path: "models/jaguar/scene.gltf",
  },
  {
    name: "simple_bush",
    type: "gltfLoader",
    path: "models/simple_bush/scene.gltf",
  },
  {
    name: "tree_animation",
    type: "gltfLoader",
    path: "models/tree_animation/scene.gltf",
  },
  {
    name: "tree_isolated",
    type: "gltfLoader",
    path: "models/tree_isolated/scene.gltf",
  },
  {
    name: "fliesMap",
    type: "textureLoader",
    path: "textures/particles/trace_05.png",
  },
] as SourceInt[];
