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
    name: "pollColor",
    type: "textureLoader",
    path: "textures/metal_art_1/color.jpg",
  },
  {
    name: "pollNormal",
    type: "textureLoader",
    path: "textures/metal_art_1/normal.jpg",
  },
  {
    name: "pollHeight",
    type: "textureLoader",
    path: "textures/metal_art_1/height.png",
  },
  {
    name: "pollOcclusion",
    type: "textureLoader",
    path: "textures/metal_art_1/occlusion.jpg",
  },
  {
    name: "pollRoughness",
    type: "textureLoader",
    path: "textures/metal_art_1/roughness.jpg",
  },
  {
    name: "pollMetalness",
    type: "textureLoader",
    path: "textures/metal_art_1/metalness.jpg",
  },
  {
    name: "bellmatcap",
    type: "textureLoader",
    path: "textures/mapCaps/15100F_241D1B_292424_2C2C27-512px.png",
  },
  {
    name: "snowMap",
    type: "textureLoader",
    path: "textures/particles/star_09.png",
  },
] as SourceInt[];
