import { Loader, OrbitControls, Stage, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { FLogo3D } from "./FLogo3D";

export function FLogoCanvas() {
  return (
    <>
      <Canvas dpr={window.devicePixelRatio}>
        <Stage>
          <FLogo3D rotation={[0, Math.PI * 1.5, 0]} />
        </Stage>
      </Canvas>
      <Loader />
    </>
  );
}
