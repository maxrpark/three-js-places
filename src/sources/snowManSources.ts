export interface SourceInt {
  type: "cubeTextureLoader" | "textureLoader" | "gltfLoader";
  name: string;
  path: string & string[];
}

export default [
  {
    name: "snowFloorColor",
    type: "textureLoader",
    path: "textures/snow-floor/color.jpg",
  },
  {
    name: "snowFloorNormal",
    type: "textureLoader",
    path: "textures/snow-floor/normal.jpg",
  },
  {
    name: "snowFloorOcclusion",
    type: "textureLoader",
    path: "textures/snow-floor/occlusion.jpg",
  },
  {
    name: "snowFloorHeight",
    type: "textureLoader",
    path: "textures/snow-floor/height.png",
  },
  {
    name: "snowFloorRoughness",
    type: "textureLoader",
    path: "textures/snow-floor/roughness.jpg",
  },
  {
    name: "snowColor",
    type: "textureLoader",
    path: "textures/snow/color.jpg",
  },
  {
    name: "snowNormal",
    type: "textureLoader",
    path: "textures/snow/normal.jpg",
  },
  {
    name: "snowOcclusion",
    type: "textureLoader",
    path: "textures/snow/occlusion.jpg",
  },
  {
    name: "snowHeight",
    type: "textureLoader",
    path: "textures/snow/height.png",
  },
  {
    name: "snowRoughness",
    type: "textureLoader",
    path: "textures/snow/roughness.jpg",
  },
  {
    name: "dirtColor",
    type: "textureLoader",
    path: "textures/dirt/color.jpg",
  },
  {
    name: "dirtNormal",
    type: "textureLoader",
    path: "textures/dirt/normal.jpg",
  },

  {
    name: "barkColor",
    type: "textureLoader",
    path: "textures/bark/color.jpg",
  },
  {
    name: "barkNormal",
    type: "textureLoader",
    path: "textures/bark/normal.jpg",
  },
  {
    name: "barkHeight",
    type: "textureLoader",
    path: "textures/bark/height.png",
  },
  {
    name: "barkOcclusion",
    type: "textureLoader",
    path: "textures/bark/occlusion.jpg",
  },
  {
    name: "barkRoughness",
    type: "textureLoader",
    path: "textures/bark/roughness.jpg",
  },
] as SourceInt[];
