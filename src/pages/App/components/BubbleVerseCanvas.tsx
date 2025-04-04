import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import {
  Center,
  Text3D,
  OrbitControls,
  Html,
  ScrollControls,
  Loader,
} from "@react-three/drei";
import MegrimFont from "../../../assets/fonts/Megrim_Medium-typeface.ttf";
import BrunoFont from "../../../assets/fonts/Bruno Ace SC_Regular-typeface.ttf";
import useSound from "use-sound";
import pop from "../../../assets/audio/pop.mp3";

import { useNavigate } from "react-router";
import { MousePerspectiveRig } from "../../../components/PerspectiveRig";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { FLogo3D } from "./FLogo3D";

const colors = [
  "#D32F2F",
  "#00BCD4",
  "#FF5722",
  "#795548",
  "#303F9F",
  "#388E3C",
  "#FBC02D",
  "#7B1FA2",
  "#FFA000",
  "#607D8B",
];

function CanvasBox(props) {
  // const font = new FontLoader().parse(defaultFont);
  // This reference will give us direct access to the mesh
  const mesh = useRef<Mesh>(null!);

  const navigate = useNavigate();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const { position, navigationLink } = props;
  const [showPopover, setShowPopover] = useState(false);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => (mesh.current.rotation.x += delta));

  return (
    <>
      <mesh
        {...props}
        ref={mesh}
        onClick={(event) => {
          setActive(!active);
          if (navigationLink.startsWith("http")) {
            window.location.href = navigationLink;
          } else {
            navigate(navigationLink);
          }
          setShowPopover(!showPopover);
        }}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}
        position={position}
      >
        <sphereGeometry args={[active ? 1.1 : 1, 30, 20]} />
        {/* <meshBasicMaterial
          color={active ? "hotpink" : hovered ? "white" : props.meshColor}
          opacity={0.3}
          transparent
        /> */}
        <meshPhysicalMaterial
          color={hovered ? "#EAEAEA" : props.meshColor}
          roughness={0.4}
          metalness={0}
          ior={hovered ? 1 : 1.3}
          transmission={1}
          reflectivity={0.6}
          thickness={0.2}
          transparent
          opacity={0.4}
        />
      </mesh>
    </>
  );
}

export default function BubbleVerseCanvas(props) {
  const { responses, onStopLoadSound } = props;
  const canvasRef = useRef(null);
  const mainGroupRef = useRef(null);

  const [orbitalControlsPositioning, setOrbitalControlsPositioning] =
    useState();

  const [playPop] = useSound(pop, { volume: 0.75 });

  const calculateRandomColors = (currResponses) => {
    return currResponses.map(
      () => colors[Math.floor(Math.random() * colors.length)]
    );
  };

  const consecutiveColors = (currResponses) => {
    return currResponses.map((item, index) => {
      return colors[index % colors.length];
    });
  };

  const calculateRandomPositions = (currResponses) => {
    let currentPositions = [];
    const radius = 2.5;
    currentPositions = currResponses.map((response, index) => {
      return [
        Math.sin((index / currResponses.length) * Math.PI * 2) * radius +
          Math.random() * 0.1,
        Math.cos((index / currResponses.length) * Math.PI * 2) * radius +
          Math.random() * 0.1,
        3,
      ];
    });
    return currentPositions;
  };

  const [positions, setPositions] = useState(
    calculateRandomPositions(responses)
  );
  const [randomColors, setRandomColors] = useState(
    consecutiveColors(responses)
  );

  useEffect(() => {
    if (responses.length > 0) {
      onStopLoadSound();
      playPop();
    }
    // setPositions(calculateRandomPositions(responses));
  }, [responses, playPop, onStopLoadSound]);

  const handleOnEndOrbital = (e) => {
    setOrbitalControlsPositioning(
      e.target.object.position.x +
        " " +
        e.target.object.position.y +
        " " +
        e.target.object.position.z
    );
  };

  return (
    <Canvas
      ref={canvasRef}
      dpr={window.devicePixelRatio}
      style={{
        height: "100%",
        width: "100%",
      }}
      camera={{ position: [0, 0, 20], fov: 20 }}
    >
      <directionalLight position={[20, -30, 20]} intensity={Math.PI * 1} />
      <directionalLight position={[-30, 50, 5]} intensity={Math.PI * 1} />
      <directionalLight position={[-40, -60, 0]} intensity={Math.PI * 1} />
      <directionalLight position={[10, 20, 5]} intensity={Math.PI * 1} />

      <MousePerspectiveRig
        ref={mainGroupRef}
        rotation={[-Math.PI * 0.1, 0, 0]}
        scale={[0.5, 0.5, 0.5]}
        disableScroll
      >
        <group rotation={[0, 0, 0]}>
          {responses.map((response, index) => {
            const [x, y, z] = positions[index] || [0, 0, 0];
            return (
              <group key={index} position={[x, y, 0]}>
                <CanvasBox
                  canvasRef={canvasRef}
                  key={index}
                  navigationLink={response.data.navPath}
                  position={[0, 0, 0]}
                  orbitalControlsPosition={orbitalControlsPositioning}
                  responseId={response.id}
                  meshColor={randomColors[index]}
                />
                <Center>
                  <Text3D
                    position={[0, 0.3, 0]}
                    size={0.2}
                    height={0.05}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.01}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                    rotation={[0, 0, 0]}
                    font={BrunoFont}
                  >
                    {response.data.line1}
                    {/* <meshNormalMaterial /> */}
                    <meshStandardMaterial color="#E6E1C5" />
                  </Text3D>
                  <Text3D
                    position={[0.2, 0, 0]}
                    size={0.25}
                    height={0.1}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.01}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                    rotation={[0, 0, 0]}
                    font={MegrimFont}
                  >
                    {response.data.line2}
                    {/* <meshNormalMaterial /> */}
                    <meshStandardMaterial color="#893168" />
                  </Text3D>
                </Center>
              </group>
            );
          })}
          <FLogo3D
            rotation={[0, Math.PI * 1.5, 0]}
            position={[0, -0.3, 0]}
            scale={[0.2, 0.2, 0.2]}
          />
        </group>
      </MousePerspectiveRig>
      <Loader />
    </Canvas>
  );
}
