export interface MeshSources {
  color?: any;
  map?: any;
  normalMap?: any;
  aoMap?: any;
  aoMapIntensity?: any;
  roughnessMap?: any;
  displacementMap?: any;
  displacementScale?: any;
}
export interface MeshTextureInt {
  meshSources: MeshSources;
  roughness?: number;
  metalness?: number;
  aoMapIntensity?: number;
}
