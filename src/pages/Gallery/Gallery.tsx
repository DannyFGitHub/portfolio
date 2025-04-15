import Box from "@mui/material/Box";
import {
  Html,
  KeyboardControls,
  Loader,
  PointerLockControls,
  Stats,
  Text3D,
} from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { Canvas, ThreeElements } from "@react-three/fiber";
import ConcertFont from "../../assets/fonts/Concert One_Regular-typeface.ttf";
import { useRef, useState } from "react";
import { Floor } from "./Environment/Floor";
import { Mesh } from "three";

function GalleryWall(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <mesh
      {...props}
      ref={meshRef}
      onClick={(event) => {
        if (props.onClick) {
          props.onClick(event);
        }
      }}
      onPointerDown={(event) => {
        setActive(true);
      }}
      onPointerUp={(event) => {
        setActive(false);
      }}
    >
      <planeGeometry args={[4, 2, 1]} />
      <meshStandardMaterial color={"beige"} />
    </mesh>
  );
}

function SimpleBox(props: ThreeElements["mesh"]) {
  const meshRef = useRef<Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <mesh
      {...props}
      ref={meshRef}
      onClick={(event) => {
        if (props.onClick) {
          props.onClick(event);
        }
      }}
      onPointerDown={(event) => {
        setActive(true);
      }}
      onPointerUp={(event) => {
        setActive(false);
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshNormalMaterial />
    </mesh>
  );
}

export function Gallery(props) {
  return (
    <Box position="absolute" style={{ height: "100%", width: "100%" }}>
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "w", "W", "ц", "Ц"] },
          { name: "backward", keys: ["ArrowDown", "s", "S", "ы", "Ы"] },
          { name: "left", keys: ["ArrowLeft", "a", "A", "ф", "Ф"] },
          {
            name: "right",
            keys: ["ArrowRight", "d", "D", "в", "В"],
          },
          { name: "jump", keys: ["Space"] },
        ]}
      >
        <Canvas
          style={{
            width: "100%",
            height: "100%",
          }}
          camera={{
            position: [0, 1, 0],
            rotation: [Math.PI, 0, 0],
            fov: 50,
          }}
          shadows
          dpr={window.devicePixelRatio}
        >
          <Stats />
          <ambientLight />
          <Physics gravity={[0, -9.8, 0]}>
            <group position={[0, 1, 0]}>
              <GalleryWall position={[0, 0, -2]} />
              <GalleryWall
                position={[2, 0, 0]}
                rotation={[0, Math.PI * -0.5, 0]}
              />
              <GalleryWall position={[-2, 0, 0]} rotation={[0, 0, 0]} />
              <Floor rotation={[Math.PI / -2, 0, 0]} color="white" />
              <SimpleBox scale={[0.3, 0.3, 0.3]} position={[0, 1, 1]} />
            </group>
          </Physics>
          <PointerLockControls makeDefault />

          <Text3D
            position={[0, 0.3, 0]}
            size={0.5}
            height={0.05}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.01}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
            rotation={[0, 0, 0]}
            font={ConcertFont}
          >
            Artist Name
            <meshNormalMaterial />
          </Text3D>
          <Html center>Welcome to the Virtual Gallery</Html>
          <Loader />
        </Canvas>
      </KeyboardControls>
    </Box>
  );
}
