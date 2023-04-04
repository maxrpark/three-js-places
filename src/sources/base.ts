export interface SourceInt {
  type: "cubeTextureLoader" | "textureLoader" | "gltfLoader";
  name: string;
  path: string & string[];
}

export default [
  {
    name: "environmentMapTexture",
    type: "cubeTextureLoader",
    path: [
      "textures/environmentMap/px.jpg",
      "textures/environmentMap/nx.jpg",
      "textures/environmentMap/py.jpg",
      "textures/environmentMap/ny.jpg",
      "textures/environmentMap/pz.jpg",
      "textures/environmentMap/nz.jpg",
    ],
  },
  {
    name: "dirtColorTexture",
    type: "textureLoader",
    path: "textures/dirt/color.jpg",
  },
  {
    name: "dirtNormalTexture",
    type: "textureLoader",
    path: "textures/dirt/normal.jpg",
  },

  {
    name: "grassColorTexture",
    type: "textureLoader",
    path: "textures/grass/color.jpg",
  },
  {
    name: "grassNormalTexture",
    type: "textureLoader",
    path: "textures/grass/normal.jpg",
  },
  // water
  {
    name: "calmWaterColorTexture",
    type: "textureLoader",
    path: "textures/water/color.jpg",
  },
  {
    name: "calmWaterNormalTexture",
    type: "textureLoader",
    path: "textures/water/normal.jpg",
  },
  {
    name: "calmWaterDisplacementTexture",
    type: "textureLoader",
    path: "textures/water/displacement.png",
  },
  {
    name: "calmWaterOcclusionTexture",
    type: "textureLoader",
    path: "textures/water/occlusion.jpg",
  },
  {
    name: "calmWaterRoughnessTexture",
    type: "textureLoader",
    path: "textures/water/roughness.jpg",
  },
] as SourceInt[];
