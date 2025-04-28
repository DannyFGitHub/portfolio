import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { Center, Text3D } from "@react-three/drei";
import MegrimFont from "../../../assets/fonts/Megrim_Medium-typeface.ttf";
import BrunoFont from "../../../assets/fonts/Bruno Ace SC_Regular-typeface.ttf";
import useSound from "use-sound";
import pop from "../../../assets/audio/pop.mp3";

import { useNavigate } from "react-router";

import { FLogo3D } from "./FLogo3D";
import { useWindowSize } from "../../../hooks/useWindowsSize";
import { OpenBook } from "../../../assets/models/OpenBook/OpenBook";

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
        onPointerDown={() => {
          setActive(true);
        }}
        onPointerUp={() => {
          setActive(false);
        }}
        onClick={(event) => {
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
        {/* <sphereGeometry args={[active ? 1.1 : 1, 30, 20]} /> */}
        {/* <meshBasicMaterial
          color={active ? "hotpink" : hovered ? "white" : props.meshColor}
          opacity={0.3}
          transparent
        /> */}
        {/* <meshPhysicalMaterial
          color={hovered ? "#EAEAEA" : props.meshColor}
          roughness={0.4}
          metalness={0}
          ior={hovered ? 1 : 1.3}
          transmission={1}
          reflectivity={0.6}
          thickness={0.2}
          transparent
          opacity={0.4}
        /> */}
        <OpenBook
          position={[0, -0.1, -0.2]}
          scale={active ? [4, 4, 4] : [3.5, 3.5, 3.5]}
          rotation={hovered ? [Math.PI * 0.5, 0, 0] : [Math.PI * 0.35, 0, 0]}
        />
      </mesh>
    </>
  );
}

export default function BooksMenu(
  props: JSX.IntrinsicElements["group"] & {
    responses: {
      id: string;
      data: {
        line1: string;
        line2: string;
        navPath: stirng;
      };
    };
    onStopLoadSound: () => {};
  }
) {
  const { responses, onStopLoadSound } = props;
  const canvasRef = useRef(null);
  const mainGroupRef = useRef(null);
  const { width, height } = useWindowSize();

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
  }, [responses, playPop, onStopLoadSound]);

  return (
    <group {...props}>
      {responses.map((response, index) => {
        const [x, y, z] = positions[index] || [0, 0, 0];
        return (
          <group key={index} position={[x, y, 0]} scale={[0.85, 0.85, 0.85]}>
            <CanvasBox
              canvasRef={canvasRef}
              key={index}
              navigationLink={response.data.navPath}
              position={[0, 0, 0]}
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
  );
}
