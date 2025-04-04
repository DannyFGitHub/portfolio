import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { LayerInterface } from "./birthdaymixer";
import { Text3D, useScroll, ScrollControls } from "@react-three/drei";
import ExplosionConfetti from "./r3fConfetti";
import NatureBeautyFont from "../fonts/NatureBeauty-Typeface.ttf";
import LavishlyYoursFont from "../fonts/LavishlyYours-typeface.ttf";
import { MousePerspectiveRig } from "../../../../components/PerspectiveRig";

function Plate(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);
  return (
    <mesh {...props} ref={meshRef} receiveShadow>
      <cylinderGeometry args={[4.5, 4.5, 0.25, 32]} />
      <meshStandardMaterial color={"white"} metalness={0} roughness={1} />
    </mesh>
  );
}

function CakeBread(props: ThreeElements["mesh"]) {
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
      <cylinderGeometry args={[4, 4, 2, 32]} />
      <meshStandardMaterial color={"#FFA239"} metalness={0} roughness={1} />
    </mesh>
  );
}

function CakeTop(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const color = props.color ? props.color : "#ED9CA3";

  return (
    <mesh
      {...props}
      ref={meshRef}
      onPointerDown={(event) => {
        setActive(true);
      }}
      onPointerUp={(event) => {
        setActive(false);
      }}
      receiveShadow
      castShadow
    >
      <cylinderGeometry args={[4.05, 4.05, 1, 32]} />
      <meshStandardMaterial color={color} metalness={0} roughness={1} />
    </mesh>
  );
}

function CandleBodyOutline(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.2 : 1}
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
      castShadow
    >
      <cylinderGeometry args={[0.132, 0.152, 1.9, 6]} />
      <meshBasicMaterial color={"#2f74c0"} wireframe />
    </mesh>
  );
}

function CandleBody(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const color = props.color ? props.color : "#2f74c0";

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.2 : 1}
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
      castShadow
    >
      <cylinderGeometry args={[0.13, 0.15, 2, 16]} />
      <meshStandardMaterial color={color} metalness={0} roughness={0.5} />
    </mesh>
  );
}

function FlameOutside(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame((state, delta) => (meshRef.current.rotation.y += delta * 3.4));
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.6 : 1.4}
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
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => {
        if (props.onClick) {
          props.onClick(event);
        }
        setHover(false);
      }}
    >
      <octahedronGeometry args={[0.3, 0]} />
      <meshBasicMaterial color={hovered ? "#FF332C" : "hotpink"} wireframe />
    </mesh>
  );
}

function Flame(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame((state, delta) => (meshRef.current.rotation.y += delta * 3.4));
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.2 : 1}
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
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => {
        if (props.onClick) {
          props.onClick(event);
        }
        setHover(false);
      }}
    >
      <octahedronGeometry args={[0.3, 0]} />
      <meshBasicMaterial color={hovered ? "#FF332C" : "hotpink"} />
    </mesh>
  );
}

const sprinkleColors = [
  "#FF332C",
  "#80D5FD",
  "#B9F266",
  "#FFE464",
  "#794645",
  "#FFCAE4",
  "#8C6EFF",
];
const cakeTopRandomColorIndex = randomIntBetween(0, sprinkleColors.length - 1);

function Sprinkle(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);
  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[0.03, 0.04, 0.1]} />
      <meshStandardMaterial
        color={
          props.sprinkleColorIndex !== undefined
            ? sprinkleColors[props.sprinkleColorIndex]
            : sprinkleColors[0]
        }
      />
    </mesh>
  );
}

const notes = ["D", "E", "F#", "G", "A", "B", "C#"];
const octaves = ["2", "3", "4", "5"];

function randomIntBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function Environment3D({
  age,
  candleLogic,
  setCandleLogic,
  audioMixer,
  isGameCompleted,
}) {
  const [candleLocations, setCandleLocations] = useState(
    candleLogic.map((item, index) => {
      const radius = 7;
      return [
        Math.sin((index / candleLogic.length) * Math.PI * 2) * radius,
        3,
        Math.cos((index / candleLogic.length) * Math.PI * 2) * radius,
      ];
    })
  );
  const [candleColorIndexes, setCandleColorIndexes] = useState<number[]>(
    candleLogic.map(() => {
      return randomIntBetween(0, sprinkleColors.length - 1);
    })
  );

  const [sprinkleLocations, setSprinkleLocations] = useState<
    [number, number, number][]
  >(
    Array.from({ length: 300 }, (item, index) => {
      return [
        (-Math.random() * 11) / 2 + 2.6,
        1.1,
        (-Math.random() * 11) / 2 + 2.6,
      ];
    })
  );

  const [currentNoteIndex, setCurrentNoteIndex] = useState<number>(0);
  const [currentOctaveIndex, setCurrentOctaveIndex] = useState<number>(0);

  function handleClickOnCandleIndex(index: number) {
    if (candleLogic[index].numBlowsToExtinguish === 0) {
      return;
    }
    // Reduce the number for the current candle index
    candleLogic[index].numBlowsToExtinguish =
      candleLogic[index].numBlowsToExtinguish - 1;
    setCandleLogic((prevState) => {
      return [...candleLogic];
    });
    // If its zero, then set the candle to unlit Candle
    if (candleLogic[index].numBlowsToExtinguish === 0) {
      audioMixer.mixer
        .find((i: LayerInterface) => {
          return i.name === "ShortFx";
        })
        ?.sampler?.triggerAttack(
          notes[currentNoteIndex] + octaves[currentOctaveIndex]
        );
      if (currentNoteIndex === notes.length - 1) {
        setCurrentNoteIndex(0);
        setCurrentOctaveIndex(
          currentOctaveIndex === octaves.length - 1 ? 0 : currentOctaveIndex + 1
        );
      } else {
        setCurrentNoteIndex(currentNoteIndex + 1);
      }
    }
  }

  function getOrdinalString() {
    if ((age + "").endsWith("1") && !(age + "").endsWith("11")) {
      return "st";
    } else if ((age + "").endsWith("2") && !(age + "").endsWith("12")) {
      return "nd";
    } else if ((age + "").endsWith("3") && !(age + "").endsWith("13")) {
      return "rd";
    }
    return "th";
  }

  return (
    <>
      <ScrollControls pages={4} infinite>
        <MousePerspectiveRig rotation={[0.7, 0, 0]}>
          <group position={[0, 0, 0]} scale={[0.2, 0.2, 0.2]}>
            {Array.from({ length: age }, (_, index) => {
              const pos = candleLocations[index];
              return (
                <group key={index}>
                  {candleLogic[index].numBlowsToExtinguish !== 0 ? (
                    <>
                      <Flame
                        position={[pos[0], pos[1] + 1.5, pos[2]]}
                        onClick={(
                          event: React.MouseEvent<HTMLButtonElement>
                        ) => {
                          handleClickOnCandleIndex(index);
                        }}
                      />
                      <FlameOutside
                        position={[pos[0], pos[1] + 1.5, pos[2]]}
                        onClick={(
                          event: React.MouseEvent<HTMLButtonElement>
                        ) => {
                          handleClickOnCandleIndex(index);
                        }}
                      />
                    </>
                  ) : null}
                  <>
                    <CandleBody
                      position={pos}
                      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        handleClickOnCandleIndex(index);
                      }}
                      color={sprinkleColors[candleColorIndexes[index]]}
                    />
                    <CandleBodyOutline
                      position={pos}
                      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        handleClickOnCandleIndex(index);
                      }}
                    />
                  </>
                </group>
              );
            })}
            <group scale={[2, 2, 2]}>
              {sprinkleLocations.map((sprinkleLocation, index) => {
                return (
                  <Sprinkle
                    key={index}
                    position={sprinkleLocation}
                    rotation={[0, index % sprinkleColors.length, 0]}
                    sprinkleColorIndex={index % sprinkleColors.length}
                  />
                );
              })}
              <CakeTop
                position={[0, 0.6, 0]}
                color={sprinkleColors[cakeTopRandomColorIndex]}
              />
              <Text3D
                size={1}
                height={0.2}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
                position={[-1.5, 0.95, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                font={LavishlyYoursFont}
              >
                {age}
                {getOrdinalString(age)}
                <meshNormalMaterial />
              </Text3D>
              <Text3D
                size={0.7}
                height={0.2}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
                position={[-1.7, 1, -1.2]}
                rotation={[-Math.PI / 2, 0, 0]}
                font={NatureBeautyFont}
              >
                Happy
                <meshNormalMaterial />
              </Text3D>
              <Text3D
                size={0.7}
                height={0.2}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
                position={[-2, 1, 1.2]}
                rotation={[-Math.PI / 2, 0, 0]}
                font={NatureBeautyFont}
              >
                Birthday
                <meshNormalMaterial />
              </Text3D>
              <CakeBread position={[0, 0, 0]} />
              <Plate position={[0, -1, 0]} />
            </group>
          </group>
        </MousePerspectiveRig>
      </ScrollControls>
      <ExplosionConfetti
        isExploding={isGameCompleted}
        radius={20}
        areaHeight={2}
      />
    </>
  );
}

export function BDayCanvas({
  age,
  candleLogic,
  setCandleLogic,
  audioMixer,
  isGameCompleted,
}) {
  return (
    <Canvas
      style={{
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        background:
          "linear-gradient(90deg, rgba(121,9,89,1) 0%, rgba(109,127,195,1) 27%, rgba(5,102,181,1) 64%, rgba(66,0,255,1) 100%)",
      }}
      shadows
      dpr={window.devicePixelRatio}
      camera={{ position: [0, 0, 0], fov: 20 }}
    >
      <ambientLight intensity={0.3} />
      {isGameCompleted ? (
        <spotLight
          position={[0.1, 2, 0.1]}
          intensity={1.5}
          decay={1}
          distance={3}
          castShadow
        />
      ) : null}
      {isGameCompleted ? (
        <spotLight
          position={[2, 2, 1]}
          intensity={1}
          decay={1}
          distance={5}
          castShadow
        />
      ) : null}
      {isGameCompleted ? (
        <spotLight
          position={[-1, 2, 0.1]}
          intensity={0.5}
          decay={1}
          distance={5}
          castShadow
        />
      ) : null}
      <fog attach="fog" args={["#000", 10, 12.5]} />
      <Environment3D
        age={age}
        candleLogic={candleLogic}
        setCandleLogic={setCandleLogic}
        audioMixer={audioMixer}
        isGameCompleted={isGameCompleted}
      />
    </Canvas>
  );
}
