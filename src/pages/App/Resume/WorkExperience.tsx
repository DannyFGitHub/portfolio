import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
  ScrollControls,
  Scroll,
  useScroll,
  Loader,
  Environment,
  Center,
  Stats,
  Html,
  Bounds,
} from "@react-three/drei";
import { Color } from "three/webgpu";
import cemshirtUrl from "../../../assets/models/cemshirt.glb";
import appleshirtUrl from "../../../assets/models/appleshirt.glb";
import iptechshirtUrl from "../../../assets/models/iptechshirt.glb";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Group, MathUtils, Mesh } from "three";
import { ThemeProvider, useColorScheme } from "@mui/material";
import { theme } from "../../../themes/MainTheme";
import { useWindowSize } from "../../../hooks/useWindowsSize";

export function MousePerspectiveRig(props: {
  pageNum: number;
  onPageChange: (n: number) => void;
}) {
  const ref = useRef<Group>(null!);
  const scroll = useScroll();

  const [targetOffset, setTargetOffset] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);

  // Function to snap to the closest "page" when scroll changes
  const snapScroll = () => {
    let a = Math.floor(scroll.offset * scroll.pages + 1) - 1;
    // In case it reaches max number, set it to max pages number
    if (a >= scroll.pages) {
      a = scroll.pages - 1;
    }
    if (a !== props.pageNum) props.onPageChange(a);
    const snapPoint = a / scroll.pages + a / (scroll.pages * 2);
    setTargetOffset(snapPoint);
  };

  useFrame((state, delta) => {
    if (props?.disableScroll !== true) {
      // Interpolate between the current offset and the target offset
      setScrollOffset((prevOffset) =>
        MathUtils.lerp(prevOffset, targetOffset, 0.06)
      );

      // Update rotation based on the smoothed scroll position
      ref.current.rotation.y =
        -scrollOffset * (Math.PI * 1.33) + Math.PI * 1.35;
    }

    // Call snap function to update the target scroll position
    snapScroll();

    state.events.update(); // Raycasts every frame rather than on pointer-move
  });

  return <group ref={ref} {...props} />;
}

function Page({
  pageNumber,
  businessName,
  businessDescription,
  jobDescription,
  jobRoles,
}) {
  return (
    <Box p={1}>
      <Box p={{ sm: 1, md: 2 }}>
        <Box p={1}>
          <Typography fontFamily="shrik" variant="h2">
            {businessName}
          </Typography>
        </Box>

        <Box
          p={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Typography fontFamily="jersey" variant="body2">
            {businessDescription}
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          alignContent="center"
          flexDirection="column"
        >
          <hr style={{ width: "50%" }} />
        </Box>
        <Box
          p={2}
          m={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Typography fontFamily="faculty" variant="body1">
            {jobDescription}
          </Typography>
        </Box>
        <Box
          p={2}
          display="flex"
          justifyContent="center"
          alignItems="right"
          flexDirection="column"
        >
          <Typography variant="caption" fontFamily="faculty" align="right">
            {jobRoles}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

function TempLink({ loc, disp }: { loc: string; disp: string }) {
  return (
    <a style={{ color: "purple" }} href={loc}>
      {disp}
    </a>
  );
}

const Scene = () => {
  const cemshirtRef = useRef();
  const appleshirtRef = useRef();
  const iptechshirtRef = useRef();
  const baseRef = useRef();

  const scrollRef = useRef();
  const scrollPosRef = useRef();

  const { scene, viewport } = useThree();
  const { mode, setMode } = useColorScheme();

  const cemshirt = useLoader(GLTFLoader, cemshirtUrl);
  const appleshirt = useLoader(GLTFLoader, appleshirtUrl);
  const iptechshirt = useLoader(GLTFLoader, iptechshirtUrl);

  const [pageNum, setPageNum] = useState<number>(0);

  const shirts = [
    { ref: iptechshirtRef, model: iptechshirt },
    { ref: cemshirtRef, model: cemshirt },
    { ref: appleshirtRef, model: appleshirt },
  ];
  const [shirtWithLoc] = useState(
    shirts.map((item, index: number): { ref; model; loc } => {
      const radius = 0.65;
      return {
        ...item,
        loc: [
          Math.sin((index / shirts.length) * Math.PI * 2) * radius,
          -0.3,
          Math.cos((index / shirts.length) * Math.PI * 2) * radius,
        ],
      };
    })
  );

  useFrame((state, delta) => {
    const offset1 = Math.sin(state.clock.getElapsedTime() * 1) * 0.018;
    cemshirtRef.current.position.y = offset1 - 0.2;

    const offset2 = Math.sin(state.clock.getElapsedTime() * 1.1) * 0.018;
    appleshirtRef.current.position.y = offset2 - 0.2;

    const offset3 = Math.sin(state.clock.getElapsedTime() * 0.9) * 0.018;
    iptechshirtRef.current.position.y = offset3 - 0.2;

    cemshirtRef.current.rotation.y += 0.005;
    appleshirtRef.current.rotation.y += 0.005;
    iptechshirtRef.current.rotation.y += 0.005;
  });

  useEffect(() => {
    scene.background = new Color(mode === "dark" ? 0x000000 : 0xffffff);
  }, [mode]);

  return (
    <>
      <ScrollControls ref={scrollRef} pages={3} damping={0.25} horizontal>
        <MousePerspectiveRig
          position={[0, 0.2, -3]}
          // rotation={[Math.PI * 0.05, 0, 0]}
          pageNum={pageNum}
          onPageChange={setPageNum}
        >
          <group>
            {shirtWithLoc.map((shirt, index) => {
              return (
                <group key={index}>
                  <spotLight
                    target={shirt.ref.current}
                    position={[
                      shirt.loc[0] - 0.04,
                      shirt.loc[1] + 0.46,
                      shirt.loc[2],
                    ]}
                    color="beige"
                    intensity={0.1}
                    penumbra={0.3}
                    castShadow
                  />

                  <primitive
                    receiveShadow
                    castShadow
                    ref={shirt.ref}
                    object={shirt.model.scene}
                    rotation={[0, Math.PI * 0, 0]}
                    scale={[0.4, 0.4, 0.4]}
                    position={[shirt.loc[0], shirt.loc[1] + 0.1, shirt.loc[2]]}
                  />
                  <group
                    position={[shirt.loc[0], shirt.loc[1] + 0.71, shirt.loc[2]]}
                  >
                    <mesh
                      position={[0, 0.5, 0]}
                      name="shirtbasetop"
                      receiveShadow
                      castShadow
                    >
                      <cylinderGeometry args={[0.16, 0.16, 1.5, 10]} />
                      <meshStandardMaterial
                        color={"silver"}
                        metalness={1}
                        roughness={0.7}
                      />
                    </mesh>
                  </group>
                  <mesh
                    name="shirtlighttop"
                    position={[
                      shirt.loc[0],
                      shirt.loc[1] + 0.455,
                      shirt.loc[2],
                    ]}
                  >
                    <cylinderGeometry args={[0.14, 0.14, 0.005, 32]} />
                    <meshBasicMaterial color={"white"} />
                  </mesh>
                  <mesh
                    name="shirtlightbottom"
                    position={[shirt.loc[0], shirt.loc[1] + 0.02, shirt.loc[2]]}
                  >
                    <cylinderGeometry args={[0.14, 0.14, 0.005, 32]} />
                    <meshBasicMaterial color={"white"} />
                  </mesh>

                  <mesh
                    name="shirtglass"
                    receiveShadow
                    position={[shirt.loc[0], shirt.loc[1] + 0.21, shirt.loc[2]]}
                  >
                    <cylinderGeometry args={[0.141, 0.141, 0.5, 32]} />
                    <meshStandardMaterial
                      color={"white"}
                      metalness={0}
                      roughness={1}
                      transparent
                      opacity={0.15}
                    />
                  </mesh>
                  <mesh
                    name="shirtbasebottom"
                    receiveShadow
                    castShadow
                    position={shirt.loc}
                  >
                    <cylinderGeometry args={[0.15, 0.15, 0.03, 32]} />
                    <meshStandardMaterial
                      color={"silver"}
                      metalness={1}
                      roughness={0.6}
                    />
                  </mesh>
                </group>
              );
            })}

            <mesh
              ref={baseRef}
              name="base"
              receiveShadow
              position={[0, -0.33, 0]}
            >
              <cylinderGeometry args={[1, 1, 0.04, 32]} />
              <meshStandardMaterial
                color={"silver"}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          </group>
        </MousePerspectiveRig>
        <spotLight
          target={baseRef.current}
          position={[0, 0, 0]}
          color="beige"
          intensity={4}
          penumbra={0}
          castShadow
        />

        <InformationGroup pageNum={pageNum} />
      </ScrollControls>
      <Bounds fit clip observe margin={1.05}>
        <group position={[-0.22, 0.15, -2.3]}>
          <mesh visible={false}>
            <boxGeometry args={[0.8, 0.85, 0.3]} />
          </mesh>
        </group>
      </Bounds>
    </>
  );
};

const InformationGroup = function (props) {
  const pageNum = props.pageNum;
  const scrollData = useScroll();

  return (
    <group
      position={[-0.35, 0.16, -2]}
      rotation={[Math.PI * 0, Math.PI * 0.2, 0]}
    >
      <group position={[0, 0, -0.006]}>
        <mesh
          position={[0, 0.265, 0]}
          rotation={[Math.PI * 0.5, 0, Math.PI * 0.5]}
        >
          <cylinderGeometry args={[0.02, 0.02, 0.41, 32]} />
          <meshStandardMaterial color="#444" metalness={0} roughness={1} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.4, 0.5, 0.01]} />
          <meshStandardMaterial color="#555" metalness={0} roughness={1} />
        </mesh>
        <mesh
          position={[0, 0.249, 0.003]}
          rotation={[Math.PI * 0.5, 0, Math.PI * 0.5]}
        >
          <cylinderGeometry args={[0.005, 0.005, 0.405, 32]} />
          <meshBasicMaterial color="#dff" />
        </mesh>
        <mesh
          position={[0, -0.246, 0.003]}
          rotation={[Math.PI * 0.5, 0, Math.PI * 0.5]}
        >
          <cylinderGeometry args={[0.005, 0.005, 0.399, 32]} />
          <meshBasicMaterial color="#444" />
        </mesh>
      </group>
      <Html
        scale={0.03}
        portal={{ current: scrollData.fixed }}
        rotation={[0, 0, 0]}
        position={[0, 0, 0]}
        transform
        as="div"
        // occlude="blending"
      >
        <ThemeProvider theme={theme}>
          <Box
            width="540px"
            height="680px"
            style={
              {
                // border: "5px solid white",
              }
            }
          >
            {pageNum === 0 && (
              <Page
                pageNumber={1}
                businessName={"CEM"}
                businessDescription={
                  <>
                    As a not-for-profit, non-denominational, Christian
                    organisation CEM is involved in various aspects of Christian
                    Education, including the delivery of school support
                    services, developing curriculum, operating early learning
                    centres and helping home schoolers. The organisation manages
                    five distinct brands.
                  </>
                }
                jobDescription={
                  <ul>
                    <li>
                      Designed and developed multiple web applications and
                      services using various technologies: Syncing Services,
                      .NET,{" "}
                      <TempLink
                        loc="https://dannyfgithub.github.io/Timesheets-Demo-FrontEnd"
                        disp="React.js"
                      />
                      , NodeJs, Typescript,{" "}
                      <TempLink
                        loc="https://apps.apple.com/au/app/cem-plain-conference-mode/id1490047083"
                        disp="Swift"
                      />
                      , Firebase, AWS Serverless, Canvas LMS (JS Development)
                    </li>
                    <li>Integrations with Intercom, Twilio (SMS) & BurstSMS</li>
                    <li>Google Apps Script & Google APIs</li>
                    <li>
                      Implemented cloud-based solutions using AWS Serverless &
                      Workato (Workato Automation Pro I & II, III)
                    </li>
                    <li>
                      CICD with Bitbucket Pipelines for automated testing &
                      deployment
                    </li>
                  </ul>
                }
                jobRoles={
                  <>
                    Roles:
                    <div>Software Engineer</div>
                    <div>IT Officer - Network and System Administrator</div>
                  </>
                }
              />
            )}
            {pageNum === 1 && (
              <Page
                pageNumber={2}
                businessName={"Apple Inc."}
                businessDescription={
                  <>
                    Apple Inc. is an American multinational corporation and
                    technology company headquartered and incorporated in
                    Cupertino, California, in Silicon Valley. It is best known
                    for its consumer electronics, software, and services.
                    Founded in 1976 as Apple Computer Company by Steve Jobs,
                    Steve Wozniak and Ronald Wayne, the company was incorporated
                    by Jobs and Wozniak as Apple Computer, Inc. the following
                    year. It was renamed Apple Inc. in 2007 as the company had
                    expanded its focus from computers to consumer electronics.
                    Apple is the largest technology company by revenue, with
                    US$391.04 billion in 2024.
                  </>
                }
                jobRoles={
                  <>
                    Apple Corporate Roles:
                    <div>Apple Advisor Coach</div>
                    <div>Mac+ Senior Advisor</div>
                    <div>iOS Senior Advisor</div>
                  </>
                }
                jobDescription={<>Applecare Excellence Award Winner</>}
              />
            )}
            {pageNum === 2 && (
              <Page
                pageNumber={3}
                businessName={"IP Technologies"}
                businessDescription={
                  <>
                    IP Technologies are a highly-specialized IP hardware and
                    software supplier and IP technology integration company with
                    experience in commercial solutions in small, medium and
                    large businesses across Australia as well as in residential
                    applications.
                  </>
                }
                jobDescription={
                  <ul>
                    <li>
                      Data Cabling & Network Rack Installations,{" "}
                      <TempLink
                        loc="https://dynalite.com/"
                        disp="Phillips Dynalite"
                      />{" "}
                      Programming, Home Automation Light & Controller
                      Installations, Boardroom Automation
                    </li>
                  </ul>
                }
                jobRoles={
                  <>
                    Roles:
                    <div>IT Trade Assistant</div>
                  </>
                }
              />
            )}
          </Box>
        </ThemeProvider>
      </Html>
    </group>
  );
};

const WorkExperienceDivWrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  background-color: #272727;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  overflow: hidden;
`;

export const WorkExperienceCanvas = () => {
  const { width, height } = useWindowSize();

  return (
    <WorkExperienceDivWrapper>
      <Canvas
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
        dpr={window.devicePixelRatio}
        camera={{
          position: [0, 0.3, 0],
          fov: 35,
        }}
        gl={{ antialias: false }}
        shadows
      >
        {width > 765 && <fog attach="fog" near={1} far={5} args={["black"]} />}
        <ambientLight intensity={0.2 * Math.PI} />
        {/* <Stats /> */}
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      <Loader />
    </WorkExperienceDivWrapper>
  );
};
