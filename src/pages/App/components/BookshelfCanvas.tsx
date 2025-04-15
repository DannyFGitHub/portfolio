import { Canvas, ThreeElements, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Group, Mesh } from "three";
import { TableBookShelf } from "../../../assets/models/TableBookShelf/TableBookShelf";
import {
  Loader,
  OrbitControls,
  Scroll,
  ScrollControls,
  useScroll,
} from "@react-three/drei";
import Box from "@mui/material/Box";
import { OpenBook } from "../../../assets/models/OpenBook/OpenBook";

function Desk(props: ThreeElements["group"]) {
  const ref = useRef<Group>(null!);
  let scroll = useScroll();
  useFrame((state, delta) => {
    if (props?.disableScroll !== true) {
      ref.current.rotation.y = -scroll.offset * (Math.PI * 1.33) + 0.4; // Rotate contents
    }

    console.log(scroll.offset);

    state.events.update(); // Raycasts every frame rather than on pointer-move
  });

  return (
    <group
      ref={ref}
      position={[0, -1.27, -3]}
      rotation={[Math.PI * 0.11, Math.PI * 0, 0]}
    >
      <spotLight
        position={[-0.2, 2, -0.5]}
        penumbra={Math.PI * 0.2}
        intensity={Math.PI * 0.6}
      />
      <spotLight
        position={[0, 1.4, -1.0]}
        penumbra={0.8}
        intensity={Math.PI * 0.3}
      />
      <Bookshelf position={[0, 0, 0]} />
      <OpenBook position={[0, 1.018, 0.28]} />
      <Floor position={[0, 0, 0]} />
    </group>
  );
}

function Floor(props: ThreeElements["mesh"]) {
  const meshRef = useRef<Mesh>(null!);
  return (
    <mesh {...props} ref={meshRef} receiveShadow>
      <cylinderGeometry args={[4.5, 4.5, 0.1, 32]} />
      <meshStandardMaterial color={"white"} metalness={0} roughness={1} />
    </mesh>
  );
}

function Bookshelf(props: ThreeElements["group"]) {
  // const font = new FontLoader().parse(defaultFont);

  // Set up state for the hovered and active state

  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => (mesh.current.rotation.x += delta));

  return (
    <group {...props}>
      <TableBookShelf />
    </group>
  );
}

export function BookshelfCanvas(props) {
  const canvasRef = useRef(null);

  return (
    <Box
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <Canvas
        ref={canvasRef}
        dpr={window.devicePixelRatio}
        style={{
          height: "100%",
          width: "100%",
        }}
        camera={{ position: [0, 0, 0], fov: 30 }}
        shadows
      >
        <OrbitControls makeDefault />
        <ambientLight intensity={Math.PI * 0.01} />
        <directionalLight position={[-40, -60, 0]} intensity={Math.PI * 0.02} />
        <Suspense fallback={null}>
          <ScrollControls pages={2} damping={0.25}>
            <Desk />
          </ScrollControls>
        </Suspense>
      </Canvas>
      <Loader />
    </Box>
  );
}
