import { Canvas, ThreeElements, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { Group, Mesh } from "three";

import { TableBookShelf } from "../../../assets/models/TableBookShelf/TableBookShelf";
import {
  Loader,
  ScrollControls,
  useScroll,
  Scroll,
  SoftShadows,
  BakeShadows,
} from "@react-three/drei";
import Box from "@mui/material/Box";

import { BooksMenu } from "./Books";
import { IntroductionOverlay } from "./IntroductionOverlay";
import { FLogo3D } from "./FLogo3D";
import { useWindowSize } from "../../../hooks/useWindowsSize";
import { radioGroupClasses } from "@mui/material";

function Desk(props: ThreeElements["group"] & { disableScroll?: boolean }) {
  const ref = useRef<Group>(null!);

  const [bookView, setBookView] = useState(false);

  let scroll = useScroll();
  useFrame((state, delta) => {
    if (props?.disableScroll !== true) {
      ref.current.rotation.y = -scroll.offset * (Math.PI * 0.25) + 0.4; // Rotate contents
    }

    state.events.update(); // Raycasts every frame rather than on pointer-move
  });

  return (
    <group
      ref={ref}
      position={bookView ? [0, -1.2, -2.7] : [0, -1.24, -3]}
      rotation={[Math.PI * 0.07, Math.PI * 0, 0]}
    >
      <directionalLight position={[0, 2, 3]} intensity={0.5} />
      <directionalLight position={[1, 2, 3]} intensity={0.6} />
      <BakeShadows />
      <Bookshelf position={[0, 0, 0]} />
      <BooksMenu
        onZoomInOnBook={() => {
          setBookView(true);
        }}
        position={[0, 1.48, 0]}
        scale={[0.35, 0.35, 0.35]}
        responses={[
          {
            id: "0",
            data: {
              line1: "Danny",
              line2: "Work",
              navPath: "/work",
            },
          },
          {
            id: "1",
            data: {
              line1: "Danny",
              line2: "Research",
              navPath: "https://arxiv.org/pdf/2410.12589v1",
            },
          },
          {
            id: "2",
            data: {
              line1: "Danny",
              line2: "Projects",
              navPath: "",
            },
          },
          {
            id: "3",
            data: {
              line1: "Danny",
              line2: "Theology",
              navPath: "",
            },
          },
          {
            id: "4",
            data: {
              line1: "Danny",
              line2: "Music",
              navPath: "",
            },
          },
          {
            id: "5",
            data: {
              line1: "Danny",
              line2: "Misc",
              navPath: "/misc",
            },
          },
          {
            id: "6",
            data: {
              line1: "Danny",
              line2: "Advocacy",
              // navPath: "/abolish",
            },
          },
          {
            id: "7",
            data: {
              line1: "Danny",
              line2: "Gallery",
              navPath: "/gallery",
            },
          },
        ]}
      />
      <FLogo3D
        rotation={[0, Math.PI * -0.5, 0]}
        position={[0.5, 1.05, 0.3]}
        scale={[0.03, 0.03, 0.03]}
      />
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
        <Suspense fallback={null}>
          <ScrollControls pages={2} damping={0.25}>
            <Desk />
            <Scroll html>
              <IntroductionOverlay />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
      <Loader />
    </Box>
  );
}
