declare module './starfield.js' {
  interface StarfieldConfig {
    numStars?: number;
    baseSpeed?: number;
    trailLength?: number;
    starColor?: string;
    canvasColor?: string;
    hueJitter?: number;
    maxAcceleration?: number;
    accelerationRate?: number;
    decelerationRate?: number;
    minSpawnRadius?: number;
    maxSpawnRadius?: number;
    auto?: boolean;
    originX?: number | null;
    originY?: number | null;
  }

  class Starfield {
    static config: StarfieldConfig;
    static setup(options?: StarfieldConfig): void;
    static setOrigin(x: number, y: number): void;
    static setOriginX(x: number): void;
    static setOriginY(y: number): void;
    static setAccelerate(state: boolean): void;
  }

  export default Starfield;
}