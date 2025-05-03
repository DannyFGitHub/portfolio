import { Canvas, ThreeElements, useFrame, useLoader } from "@react-three/fiber";

import { Suspense, useRef, useState } from "react";
import {
  Group,
  Mesh,
  TextureLoader,
  EquirectangularReflectionMapping,
  DoubleSide,
  BackSide,
} from "three";

import { TableBookShelf } from "../../../assets/models/TableBookShelf/TableBookShelf";
import {
  Loader,
  ScrollControls,
  useScroll,
  Scroll,
  Bounds,
  Stage,
} from "@react-three/drei";
import Box from "@mui/material/Box";

import Texture360Url from "../../../assets/images/skybox1.jpeg";

import { BooksMenu } from "./Books";
import { IntroductionOverlay } from "./IntroductionOverlay";
import { FLogo3D } from "./FLogo3D";

function Desk(props: ThreeElements["group"] & { disableScroll?: boolean }) {
  const ref = useRef<Group>(null!);

  const [bookView, setBookView] = useState(false);

  let scroll = useScroll();
  useFrame((state, delta) => {
    if (props?.disableScroll !== true) {
      ref.current.rotation.y = -scroll.offset * (Math.PI * 0.2) + 0.4; // Rotate contents
    }

    state.events.update(); // Raycasts every frame rather than on pointer-move
  });

  return (
    <group
      ref={ref}
      position={[0, -1.2, -2.7]}
      rotation={[Math.PI * 0.09, 0, 0]}
    >
      <Skybox />
      <Bookshelf name="desk" position={[0, 0, 0]} />
      <Bounds fit clip observe margin={1.2}>
        <BooksMenu
          name="booksMenu"
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
      </Bounds>
      <FLogo3D
        rotation={[0, Math.PI * -0.5, 0]}
        position={[0.5, 1, 0.3]}
        scale={[0.03, 0.03, 0.03]}
      />

      {/* <Floor position={[0, 0, 0]} /> */}
    </group>
  );
}

function Floor(props: ThreeElements["mesh"]) {
  const meshRef = useRef<Mesh>(null!);
  return (
    <mesh {...props} ref={meshRef} receiveShadow>
      <cylinderGeometry args={[4.5, 4.5, 0.1, 32]} />
      <meshStandardMaterial color={"white"} />
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

function Skybox() {
  const texture = useLoader(TextureLoader, Texture360Url);

  // Configure the texture settings
  // texture.mapping = EquirectangularReflectionMapping;

  return (
    <mesh scale={[0.05, 0.05, 0.05]}>
      <sphereGeometry args={[50, 60, 60]} />
      <meshBasicMaterial map={texture} side={BackSide} />
    </mesh>
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
          display: "block",
        }}
        camera={{ position: [0, 0, 0], fov: 30 }}
      >
        <Suspense fallback={null}>
          <Stage
            preset="soft"
            environment="apartment"
            intensity={1}
            center={{ disable: true }}
            adjustCamera={false}
          >
            <ScrollControls pages={2} damping={0.25}>
              <Desk />
              <Scroll html>
                <IntroductionOverlay />
              </Scroll>
            </ScrollControls>
          </Stage>
        </Suspense>
      </Canvas>

      <Loader />
    </Box>
  );
}
