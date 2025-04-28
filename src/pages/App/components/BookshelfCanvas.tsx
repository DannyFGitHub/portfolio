import { Canvas, ThreeElements, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Group, Mesh, RectAreaLight } from "three";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import { TableBookShelf } from "../../../assets/models/TableBookShelf/TableBookShelf";
import {
  Loader,
  OrbitControls,
  Scroll,
  ScrollControls,
  useScroll,
  Html,
} from "@react-three/drei";
import Box from "@mui/material/Box";
import { OpenBook } from "../../../assets/models/OpenBook/OpenBook";
import BooksMenu from "./Books";
import { IntroductionOverlay } from "./IntroductionOverlay";

const BookOnTable = {
  position: [0, 1.018, 0.28],
  rotation: [0, 0, 0],
};
const BookOnShelf = {
  position: [0, 1.2, -0.4],
  rotation: [Math.PI * 0.5, 0, -Math.PI * 0.5],
};

function Desk(props: ThreeElements["group"] & { disableScroll?: boolean }) {
  const ref = useRef<Group>(null!);
  let scroll = useScroll();
  useFrame((state, delta) => {
    if (props?.disableScroll !== true) {
      ref.current.rotation.y = -scroll.offset * (Math.PI * 1.33) + 0.4; // Rotate contents
    }

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
      <OpenBook
        closed
        position={BookOnShelf.position}
        rotation={BookOnShelf.rotation}
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

const RectArealightWithHelper = () => {
  const { scene } = useThree();

  RectAreaLightUniformsLib.init();

  const rectLight = new RectAreaLight("white", 0.1, 1, 1);

  // width={1} height={1} position={[0, 0, -2.4]}

  rectLight.position.set(0, 0, -2.4);
  scene.add(rectLight);
  scene.add(new RectAreaLightHelper(rectLight));

  return null;
};

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
        <ambientLight intensity={Math.PI * 0.01} />
        <directionalLight position={[-40, -60, 0]} intensity={Math.PI * 0.02} />
        <RectArealightWithHelper />
        <Suspense fallback={null}>
          <ScrollControls pages={2} damping={0.25}>
            <BooksMenu
              position={[0, 0, -2.5]}
              scale={[0.1, 0.1, 0.1]}
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
              onStopLoadSound={() => {}}
            />
            <Desk />
          </ScrollControls>
        </Suspense>
        <Html>
          <Box width="100vw" height="100vh">
            <IntroductionOverlay />
          </Box>
        </Html>
      </Canvas>
      <Loader />
    </Box>
  );
}
