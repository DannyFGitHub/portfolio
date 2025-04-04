import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
  ScrollControls,
  Scroll,
  useScroll,
  Loader,
  Stage,
  Clouds,
  Cloud,
  Center,
  Html,
  OrbitControls,
  Stats,
} from "@react-three/drei";
import { Color } from "three/webgpu";
import cemshirtUrl from "../../../assets/models/cemshirt.glb";
import appleshirtUrl from "../../../assets/models/appleshirt.glb";
import iptechshirtUrl from "../../../assets/models/iptechshirt.glb";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Group } from "three";

export function MousePerspectiveRig(props) {
  const ref = useRef<Group>(null!);
  let scroll = useScroll();
  useFrame((state, delta) => {
    if (props?.disableScroll !== true) {
      ref.current.rotation.y = -scroll.offset * (Math.PI * 1.32); // Rotate contents
    }
    state.events.update(); // Raycasts every frame rather than on pointer-move
  });
  return <group ref={ref} {...props} />;
}

function Shirt(props) {
  const ref = useRef();
  const data = useScroll();

  const [pos, setPos] = useState();

  useFrame(() => {
    // data.offset = current scroll position, between 0 and 1, dampened
    // data.delta = current delta, between 0 and 1, dampened

    // Will be 0 when the scrollbar is at the starting position,
    // then increase to 1 until 1 / 3 of the scroll distance is reached
    const a = data.range(0, 1 / 3);
    // Will start increasing when 1 / 3 of the scroll distance is reached,
    // and reach 1 when it reaches 2 / 3rds.
    const b = data.range(1 / 3, 1 / 3);
    // Same as above but with a margin of 0.1 on both ends
    const c = data.range(1 / 3, 1 / 3, 0.1);
    // Will move between 0-1-0 for the selected range
    const d = data.curve(1 / 3, 1 / 3);
    // Same as above, but with a margin of 0.1 on both ends
    const e = data.curve(1 / 3, 1 / 3, 0.1);
    // Returns true if the offset is in range and false if it isn't
    const f = data.visible(2 / 3, 1 / 3);
    // The visible function can also receive a margin
    const g = data.visible(2 / 3, 1 / 3, 0.1);

    console.log(a, b, c, d, e, f, g);
  });
  return <primitive ref={ref} {...props} />;
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
      style={{
        position: "relative",
        color: "white",
        height: "100vh",
        width: "100%",
        top: 0 * pageNumber + "vh",
      }}
      p={{ sm: 0, md: 2, lg: 4 }}
      m={1}
    >
      <Box
        p={{ sm: 0, md: 2, lg: 4 }}
        m={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        height="100%"
        width="100%"
        style={{
          filter: "drop-shadow(0px 0px 20px white)",
        }}
      >
        <Box
          p={{ sm: 0, md: 2, lg: 4 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Typography flex="1" variant="h1">
            {businessName}
          </Typography>
          <Box flex="2">{businessDescription}</Box>
        </Box>
        <hr style={{ width: "100%" }} />
        <Box
          m={1}
          p={{ sm: 0, md: 2, lg: 4 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          {jobDescription}
        </Box>
        <Box
          m={1}
          p={{ sm: 0, md: 2, lg: 4 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          {jobRoles}
        </Box>
      </Box>
    </Box>
  );
}

const Scene = () => {
  const cemshirtRef = useRef();
  const appleshirtRef = useRef();
  const iptechshirtRef = useRef();

  const shirtsGroupRef = useRef();

  const { scene, MeshBasicMaterial, viewport } = useThree();

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
    scene.background = new Color(0x000000);
  }, []);

  return (
    <>
      <group position={[0, 0, -5]}>
        <Clouds material={MeshBasicMaterial}>
          <Cloud seed={1} scale={1} volume={5} color="hotpink" fade={200} />
        </Clouds>
      </group>
      <ScrollControls pages={3} damping={0.25}>
        <Scroll>
          <MousePerspectiveRig>
            <group position={[0, 0, 0]} rotation={[0, Math.PI * 0.2, 0]}>
              {shirtWithLoc.map((shirt, index) => {
                return (
                  <Shirt
                    ref={shirt.ref}
                    object={shirt.model.scene}
                    position={shirt.loc}
                    castShadow
                    rotation={[0, -0.5, 0]}
                  />
                );
              })}
            </group>
          </MousePerspectiveRig>
        </Scroll>

        <Scroll html>
          <Box display="flex">
            <Box
              flex={1}
              display="flex"
              justifyContent="center"
              flexDirection="column"
            >
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
                      services using various technologies: (.NET), React.js,
                      NodeJs, Typescript, Swift, Firebase, AWS Serverless,
                      Canvas LMS (JS Development)
                    </li>
                    <li>Integrations with Intercom, Twilio (SMS) & BurstSMS</li>
                    <li>
                      Implemented cloud-based solutions using AWS Serverless &
                      Workato
                    </li>
                    <li>
                      CICD with Bitbucket Pipelines for automated testing &
                      deployment
                    </li>
                  </ul>
                }
                jobRoles={
                  <>
                    {" "}
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
                jobDescription={undefined}
              />

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
                      Data Cabling & Network Rack Installations, Phillips
                      Dynalite Programming, Home Automation Light & Controller
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
            <Box flex={1}></Box>
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
  return (
    <WorkExperienceDivWrapper>
      <Canvas
        dpr={window.devicePixelRatio}
        camera={{
          position: [0, 0, 0],
          fov: 75,
        }}
        gl={{ antialias: false }}
      >
        <Stats />
        <directionalLight
          position={[-1.3, 6.0, 4.4]}
          castShadow
          intensity={Math.PI * 1}
        />
        <ambientLight intensity={1} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      <Loader />
    </WorkExperienceDivWrapper>
  );
};
