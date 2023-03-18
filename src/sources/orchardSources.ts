export interface SourceInt {
  type: "cubeTextureLoader" | "textureLoader" | "gltfLoader";
  name: string;
  path: string & string[];
}

export default [
  {
    name: "floorStoneColor",
    type: "textureLoader",
    path: "textures/floorStones/color.jpg",
  },
  {
    name: "floorStoneNormal",
    type: "textureLoader",
    path: "textures/floorStones/normal.jpg",
  },

  {
    name: "grassColor",
    type: "textureLoader",
    path: "textures/grass/color.jpg",
  },
  {
    name: "grassNormal",
    type: "textureLoader",
    path: "textures/grass/normal.jpg",
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
    name: "orangeColor",
    type: "textureLoader",
    path: "textures/orange/color.jpg",
  },
  {
    name: "orangeNormal",
    type: "textureLoader",
    path: "textures/orange/normal.jpg",
  },
  {
    name: "orangeHeight",
    type: "textureLoader",
    path: "textures/orange/height.png",
  },
  {
    name: "orangeOcclusion",
    type: "textureLoader",
    path: "textures/orange/occlusion.jpg",
  },
  {
    name: "orangeRoughness",
    type: "textureLoader",
    path: "textures/orange/roughness.jpg",
  },
  {
    name: "cloverColor",
    type: "textureLoader",
    path: "textures/clover/color.jpg",
  },
  {
    name: "cloverNormal",
    type: "textureLoader",
    path: "textures/clover/normal.jpg",
  },
  {
    name: "cloverHeight",
    type: "textureLoader",
    path: "textures/clover/height.png",
  },
  {
    name: "cloverOcclusion",
    type: "textureLoader",
    path: "textures/clover/occlusion.jpg",
  },
  {
    name: "cloverRoughness",
    type: "textureLoader",
    path: "textures/clover/roughness.jpg",
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
