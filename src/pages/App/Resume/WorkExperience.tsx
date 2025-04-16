import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
  ScrollControls,
  Scroll,
  useScroll,
  Loader,
  Clouds,
  Cloud,
  Environment,
  AccumulativeShadows,
  RandomizedLight,
  Center,
} from "@react-three/drei";
import { Color } from "three/webgpu";
import cemshirtUrl from "../../../assets/models/cemshirt.glb";
import appleshirtUrl from "../../../assets/models/appleshirt.glb";
import iptechshirtUrl from "../../../assets/models/iptechshirt.glb";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../../themes/MainTheme";

import { Group } from "three";
import { useColorScheme } from "@mui/material";
import { easing } from "maath";

export function MousePerspectiveRig(props) {
  const ref = useRef<Group>(null!);
  let scroll = useScroll();
  useFrame((state, delta) => {
    if (props?.disableScroll !== true) {
      ref.current.rotation.y = -scroll.offset * (Math.PI * 1.33) + 0.4; // Rotate contents
    }

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
    <Box
      display="flex"
      p={2}
      width="100%"
      height="100vh"
      position="relative"
      style={{
        top: 0,
        left: 0,
      }}
    >
      <Box
        display="flex"
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="end"
        flexDirection={"row"}
      >
        <Box
          flex={1}
          width="100%"
          style={{
            color: "black",
            opacity: 0.9,
            background: "white",
            borderRadius: "50px",
          }}
          p={{ sm: 2, md: 4 }}
        >
          <Box p={2} display="relative" width="100%">
            <Typography fontFamily="shrik" variant="h2">
              {businessName}
            </Typography>
          </Box>

          <Box
            p={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            width="100%"
          >
            <Typography fontFamily="jersey" variant="body2">
              {businessDescription}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" alignContent="center">
            <hr style={{ width: "50%" }} />
          </Box>
          <Box
            p={2}
            m={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            width="100%"
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
            width="100%"
          >
            <Typography variant="caption" fontFamily="faculty" align="right">
              {jobRoles}
            </Typography>
          </Box>
        </Box>
        <Box
          flex={{ lg: 1, xl: 3 }}
          sx={{
            display: { xs: "none", sm: "none", lg: "flex" },
          }}
        ></Box>
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

function Backdrop() {
  const shadows = useRef(null);
  useFrame((state, delta) =>
    easing.dampC(
      shadows.current.getMesh().material.color,
      state.color,
      0.25,
      delta
    )
  );
  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={5}
      resolution={2048}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.55 * Math.PI}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={5}
        intensity={0.25 * Math.PI}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  );
}

const Scene = () => {
  const cemshirtRef = useRef();
  const appleshirtRef = useRef();
  const iptechshirtRef = useRef();

  const shirtsGroupRef = useRef();

  const { scene, viewport } = useThree();
  const { mode, setMode } = useColorScheme();

  const cemshirt = useLoader(GLTFLoader, cemshirtUrl);
  const appleshirt = useLoader(GLTFLoader, appleshirtUrl);
  const iptechshirt = useLoader(GLTFLoader, iptechshirtUrl);

  const shirts = [
    { ref: iptechshirtRef, model: iptechshirt },
    { ref: cemshirtRef, model: cemshirt },
    { ref: appleshirtRef, model: appleshirt },
  ];
  const [shirtWithLoc] = useState(
    shirts.map((item, index: number): { ref; model; loc } => {
      const radius = 1;
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

  useFrame(() => {
    cemshirtRef.current.rotation.y += 0.005;
    appleshirtRef.current.rotation.y += 0.005;
    iptechshirtRef.current.rotation.y += 0.005;
  });

  useEffect(() => {
    scene.background = new Color(mode === "dark" ? 0x000000 : 0xffffff);
  }, [mode]);

  return (
    <>
      {/* <group position={[0, 0, -5]}>
        <Clouds material={MeshBasicMaterial}>
          <Cloud
            seed={1}
            scale={1}
            volume={5}
            color={mode === "dark" ? "hotpink" : "black"}
            fade={200}
          />
        </Clouds>
      </group> */}
      <group position={[0, 0, 0]}>
        <Backdrop />
      </group>
      <ScrollControls pages={3} damping={0.25}>
        <Scroll>
          <MousePerspectiveRig position={[0, 0.16, 0]}>
            <group rotation={[0, Math.PI * 0.2, 0]}>
              {shirtWithLoc.map((shirt, index) => {
                return (
                  <primitive
                    ref={shirt.ref}
                    object={shirt.model.scene}
                    position={shirt.loc}
                    castShadow
                    rotation={[0, Math.PI * 0.5, 0]}
                    scale={[0.4, 0.4, 0.4]}
                  />
                );
              })}
            </group>
          </MousePerspectiveRig>
        </Scroll>

        <Scroll html>
          <Box
            flex={{ sm: 8, md: 3 }}
            display="flex"
            position="relative"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            style={{ top: 0, left: 0 }}
          >
            <Page
              pageNumber={1}
              businessName={"CEM"}
              businessDescription={
                <>
                  As a not-for-profit, non-denominational, Christian
                  organisation CEM is involved in various aspects of Christian
                  Education, including the delivery of school support services,
                  developing curriculum, operating early learning centres and
                  helping home schoolers. The organisation manages five distinct
                  brands.
                </>
              }
              jobDescription={
                <ul>
                  <li>
                    Designed and developed multiple web applications and
                    services using various technologies: Syncing Services, .NET,{" "}
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

            <Page
              pageNumber={2}
              businessName={"Apple Inc."}
              businessDescription={
                <>
                  Apple Inc. is an American multinational corporation and
                  technology company headquartered and incorporated in
                  Cupertino, California, in Silicon Valley. It is best known for
                  its consumer electronics, software, and services. Founded in
                  1976 as Apple Computer Company by Steve Jobs, Steve Wozniak
                  and Ronald Wayne, the company was incorporated by Jobs and
                  Wozniak as Apple Computer, Inc. the following year. It was
                  renamed Apple Inc. in 2007 as the company had expanded its
                  focus from computers to consumer electronics. Apple is the
                  largest technology company by revenue, with US$391.04 billion
                  in 2024.
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

            <Page
              pageNumber={3}
              businessName={"IP Technologies"}
              businessDescription={
                <>
                  IP Technologies are a highly-specialized IP hardware and
                  software supplier and IP technology integration company with
                  experience in commercial solutions in small, medium and large
                  businesses across Australia as well as in residential
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
          </Box>
        </Scroll>
      </ScrollControls>
    </>
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
  const { mode } = useColorScheme();

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
          position: [0, 0, 0],
          fov: 25,
        }}
        gl={{ antialias: false }}
      >
        <ambientLight intensity={0.5 * Math.PI} />
        <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
        {/* <Stats /> */}
        {/* <directionalLight
          position={[-1.3, 6.0, 4.4]}
          castShadow
          intensity={Math.PI * (mode === "dark" ? 0.45 : 2)}
        /> */}
        {/* <ambientLight intensity={1} /> */}
        <Suspense fallback={null}>
          <Center>
            <Scene />
          </Center>
        </Suspense>
      </Canvas>

      <Loader />
    </WorkExperienceDivWrapper>
  );
};
