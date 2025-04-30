import { JSX, useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, MathUtils, Group } from "three";
import { Center, Html, Text3D } from "@react-three/drei";
import MegrimFont from "../../../assets/fonts/Megrim_Medium-typeface.ttf";
import BrunoFont from "../../../assets/fonts/Bruno Ace SC_Regular-typeface.ttf";
import useSound from "use-sound";
import pop from "../../../assets/audio/pop.mp3";

import { useNavigate } from "react-router";

import { OpenBook } from "../../../assets/models/OpenBook/OpenBook";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

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

export interface MenuItemDetails {
  id: string;
  data: {
    line1: string;
    line2: string;
    navPath?: string;
  };
}

function BookMenuItem(
  props: JSX.IntrinsicElements["group"] & {
    menuItemDetails: MenuItemDetails;
    meshColor: string;
    isActive: boolean;
    onSelectItem: () => void;
    position: [x: number, y: number, z: number];
    rotation: [x: number, y: number, z: number];
  }
) {
  const groupRef = useRef<Group>(null!);
  const bookRef = useRef<Mesh>(null!);
  const bookTextRef = useRef<Mesh>(null!);
  const menuItemDetails = props.menuItemDetails;
  const [closedBook, setClosedBook] = useState(!props.isActive);

  const [isClicked, setIsClicked] = useState(false);

  const navigate = useNavigate();

  const [showPopover, setShowPopover] = useState(false);

  useEffect(() => {
    if (props.isActive === false) {
      setClosedBook(true);
    }
  }, [props.isActive]);

  useFrame(() => {
    if (props.isActive) {
      groupRef.current.position.x = MathUtils.lerp(
        groupRef.current.position.x,
        BookOnTable.position[0],
        0.025
      );
      groupRef.current.position.y = MathUtils.lerp(
        groupRef.current.position.y,
        BookOnTable.position[1],
        0.025
      );
      groupRef.current.position.z = MathUtils.lerp(
        groupRef.current.position.z,
        BookOnTable.position[2],
        0.025
      );

      groupRef.current.rotation.x = MathUtils.lerp(
        groupRef.current.rotation.x,
        BookOnTable.rotation[0],
        0.025
      );
      groupRef.current.rotation.y = MathUtils.lerp(
        groupRef.current.rotation.y,
        BookOnTable.rotation[1],
        0.025
      );
      groupRef.current.rotation.z = MathUtils.lerp(
        groupRef.current.rotation.z,
        BookOnTable.rotation[2],
        0.025
      );
    } else {
      groupRef.current.position.x = MathUtils.lerp(
        groupRef.current.position.x,
        props.position[0],
        0.025
      );
      groupRef.current.position.y = MathUtils.lerp(
        groupRef.current.position.y,
        props.position[1],
        0.025
      );
      groupRef.current.position.z = MathUtils.lerp(
        groupRef.current.position.z,
        props.position[2],
        0.025
      );

      groupRef.current.rotation.x = MathUtils.lerp(
        groupRef.current.rotation.x,
        props.rotation[0],
        0.025
      );
      groupRef.current.rotation.y = MathUtils.lerp(
        groupRef.current.rotation.y,
        props.rotation[1],
        0.025
      );
      groupRef.current.rotation.z = MathUtils.lerp(
        groupRef.current.rotation.z,
        props.rotation[2],
        0.025
      );
    }

    if (closedBook) {
      bookRef.current.position.x = MathUtils.lerp(
        bookRef.current.position.x,
        0.4,
        0.025
      );

      bookTextRef.current.scale.x = MathUtils.lerp(
        bookTextRef.current.scale.x,
        0.35,
        0.025
      );
      bookTextRef.current.scale.y = MathUtils.lerp(
        bookTextRef.current.scale.y,
        0.35,
        0.025
      );

      bookTextRef.current.position.x = MathUtils.lerp(
        bookTextRef.current.position.x,
        0.5,
        0.025
      );
      bookTextRef.current.position.y = MathUtils.lerp(
        bookTextRef.current.position.y,
        0.2,
        0.025
      );
      bookTextRef.current.position.z = MathUtils.lerp(
        bookTextRef.current.position.z,
        -0.13,
        0.025
      );

      bookTextRef.current.rotation.x = MathUtils.lerp(
        bookTextRef.current.rotation.x,
        0,
        0.025
      );
    } else {
      bookRef.current.position.x = MathUtils.lerp(
        bookRef.current.position.x,
        0.8,
        0.025
      );

      bookTextRef.current.scale.x = MathUtils.lerp(
        bookTextRef.current.scale.x,
        1,
        0.025
      );
      bookTextRef.current.scale.y = MathUtils.lerp(
        bookTextRef.current.scale.y,
        1,
        0.025
      );

      bookTextRef.current.position.x = MathUtils.lerp(
        bookTextRef.current.position.x,
        -0.05,
        0.025
      );
      bookTextRef.current.position.y = MathUtils.lerp(
        bookTextRef.current.position.y,
        2,
        0.025
      );

      bookTextRef.current.position.z = MathUtils.lerp(
        bookTextRef.current.position.z,
        -1,
        0.025
      );

      bookTextRef.current.rotation.x = MathUtils.lerp(
        bookTextRef.current.rotation.x,
        Math.PI * 0.2,
        0.025
      );
    }
  });

  return (
    <group
      ref={groupRef}
      position={props.position}
      rotation={props.rotation}
      scale={isClicked ? [1, 1, 1] : [0.85, 0.85, 0.85]}
      onClick={props.onSelectItem}
    >
      <OpenBook
        ref={bookRef}
        onPointerDown={() => {
          setIsClicked(true);
          if (props.isActive) {
            if (!closedBook) {
              if (menuItemDetails.data.navPath?.startsWith("http")) {
                window.location.href = menuItemDetails.data.navPath;
              } else if (menuItemDetails.data.navPath) {
                navigate(menuItemDetails.data.navPath);
              }
              setShowPopover(!showPopover);
            }
            setClosedBook(!closedBook);
          }
        }}
        onPointerUp={() => {
          setIsClicked(false);
        }}
        position={[0.4, 0.2, -0.2]}
        scale={[3, 5, 3]}
        rotation={[Math.PI * 0.5, 0, 0]}
        closed={closedBook}
        color={props.meshColor}
      />
      {!closedBook && (
        <Center>
          <Html position={[0.3, 0.2, 0]} center as="div">
            <Box
              style={{ top: "200vh", position: "absolute", display: "flex" }}
              width="200px"
            >
              <Paper elevation={2}>
                <Box p={1}>
                  <Typography>
                    Click the open book to enter this DannyVerse
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Html>
        </Center>
      )}

      <group
        ref={bookTextRef}
        scale={[0.35, 0.35, 1]}
        position={[0.5, 0.2, -0.13]}
      >
        <Text3D
          position={[0, 0.3, 0.01]}
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
          {menuItemDetails.data.line1}
          <meshStandardMaterial color="#ffffff" />
        </Text3D>

        <Text3D
          position={[0.2, 0, -0.04]}
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
          {menuItemDetails.data.line2}
          <meshStandardMaterial color="#ffffff" />
        </Text3D>
      </group>
    </group>
  );
}

const BookOnTable = {
  position: [-0.65, -0.85, 0.9],
  rotation: [-Math.PI * 0.2, 0, 0],
};
const BookOnShelf = [
  {
    position: [1.2, -0.98, -0.4],
    rotation: [0, Math.PI * 0.3, Math.PI * 0.0],
  },
  {
    position: [0.75, -0.98, -0.4],
    rotation: [0, Math.PI * 0.3, Math.PI * 0.0],
  },
  {
    position: [0.35, -0.98, -0.4],
    rotation: [0, Math.PI * 0.3, Math.PI * 0.0],
  },
  {
    position: [-0.1, -0.98, -0.4],
    rotation: [0, Math.PI * 0.3, Math.PI * 0.0],
  },
  {
    position: [-0.5, -0.98, -0.4],
    rotation: [0, Math.PI * 0.3, Math.PI * 0.0],
  },
  {
    position: [-0.9, -0.98, -0.4],
    rotation: [0, Math.PI * 0.3, Math.PI * 0.0],
  },
  {
    position: [-1.35, -0.98, -0.4],
    rotation: [0, Math.PI * 0.3, Math.PI * 0.0],
  },
  {
    position: [-1.75, -0.98, -0.4],
    rotation: [0, Math.PI * 0.3, Math.PI * 0.0],
  },
];

export function BooksMenu(
  props: JSX.IntrinsicElements["group"] & {
    responses: MenuItemDetails[];
    onZoomInOnBook: () => void;
  }
) {
  const { responses } = props;

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

  const [randomColors, setRandomColors] = useState(
    consecutiveColors(responses)
  );

  const [activeBookId, setActiveBookId] = useState(null);

  return (
    <group {...props}>
      {responses.map((response, index) => {
        return (
          <BookMenuItem
            key={index}
            menuItemDetails={response}
            position={BookOnShelf[index].position}
            rotation={BookOnShelf[index].rotation}
            meshColor={randomColors[index]}
            onSelectItem={() => {
              setActiveBookId(index);
              props.onZoomInOnBook();
              playPop();
            }}
            isActive={activeBookId === index}
          />
        );
      })}
    </group>
  );
}
