export interface ProjectSettings {
  resolutions: Resolution[];
}

export interface RunSettings {
  resolutions: Resolution[];
}

export interface PathSettings {
  resolution: Resolution;
}

export interface Resolution {
  width: number;
  height: number;
  // scale - for mobile
}
