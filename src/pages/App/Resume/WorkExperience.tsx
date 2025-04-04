import React, {
  Suspense,
  useEffect,
  useRef,
  useLayoutEffect,
  Fragment,
} from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
  Box,
  OrbitControls,
  Texture,
  ScrollControls,
  Scroll,
  useScroll,
  Loader,
  Stage,
  Stars,
  Clouds,
  Cloud,
  Center,
} from "@react-three/drei";
import { useControls } from "leva";
import gsap from "gsap";
import { cameraPosition, Color } from "three/webgpu";
import cemshirtUrl from "../../../assets/models/cemshirt.glb";
import appleshirtUrl from "../../../assets/models/appleshirt.glb";
import iptechshirtUrl from "../../../assets/models/iptechshirt.glb";
import styled from "styled-components";

const Scene = () => {
  const cemshirtRef = useRef();
  const appleshirtRef = useRef();
  const iptechshirtRef = useRef();

  const shirtsGroupRef = useRef();

  const { camera, scene, MeshBasicMaterial } = useThree();
  const scroll = useScroll();
  const timeline = useRef();

  // const { position, rotation, cameraPositionIndex, usePositionSlider, useScrollBarPosition } = useControls({
  //   useScrollBarPosition: { value: true },
  //   usePositionSlider: { value: true },
  //   cameraPositionIndex: { value: 0, min: 0, max: 2, step: 1 },
  //   position: { value: [-0.8, 0.1, 2.5], step: 0.01 },
  //   rotation: { value: [0, -1, 0], step: 0.01 },
  // });

  const [useScrollBarPosition, setUseScrollBarPosition] = React.useState(true);
  const [usePositionSlider, setUsePositionSlider] = React.useState(true);
  const [cameraPositionIndex, setCameraPositionIndex] = React.useState(0);
  const [position, setPosition] = React.useState([-0.8, 0.1, 2.5]);
  const [rotation, setRotation] = React.useState([0, -1, 0]);

  const cemshirt = useLoader(GLTFLoader, cemshirtUrl);
  const appleshirt = useLoader(GLTFLoader, appleshirtUrl);
  const iptechshirt = useLoader(GLTFLoader, iptechshirtUrl);

  const groupLocations = [
    { position: [-1.5, 0, 2.5], rotation: [0, 1, 0] },
    { position: [0.19, 0, 3.58], rotation: [0, 1, 0] },
    { position: [1.9, 0, 4.65], rotation: [0, 1, 0] },
  ];

  useFrame((state, delta) => {
    cemshirtRef.current.rotation.y += 0.005;
    appleshirtRef.current.rotation.y += 0.005;
    iptechshirtRef.current.rotation.y += 0.005;

    if (!useScrollBarPosition) {
      if (usePositionSlider) {
        shirtsGroupRef.current.position.set(
          groupLocations[cameraPositionIndex].position[0],
          groupLocations[cameraPositionIndex].position[1],
          groupLocations[cameraPositionIndex].position[2]
        );
        shirtsGroupRef.current.rotation.set(
          groupLocations[cameraPositionIndex].rotation[0],
          groupLocations[cameraPositionIndex].rotation[1],
          groupLocations[cameraPositionIndex].rotation[2]
        );
      } else {
        shirtsGroupRef.current.position.set(
          position[0],
          position[1],
          position[2]
        );
        shirtsGroupRef.current.rotation.set(
          rotation[0],
          rotation[1],
          rotation[2]
        );
      }
    }

    if (useScrollBarPosition) {
      if (scroll.offset > 0 && scroll.offset < 0.33) {
        shirtsGroupRef.current.position.set(
          groupLocations[0].position[0],
          groupLocations[0].position[1],
          groupLocations[0].position[2]
        );
        shirtsGroupRef.current.rotation.set(
          groupLocations[0].rotation[0],
          groupLocations[0].rotation[1],
          groupLocations[0].rotation[2]
        );
      } else if (scroll.offset > 0.33 && scroll.offset < 0.66) {
        shirtsGroupRef.current.position.set(
          groupLocations[1].position[0],
          groupLocations[1].position[1],
          groupLocations[1].position[2]
        );
        shirtsGroupRef.current.rotation.set(
          groupLocations[1].rotation[0],
          groupLocations[1].rotation[1],
          groupLocations[1].rotation[2]
        );
      } else if (scroll.offset > 0.66 && scroll.offset < 1) {
        shirtsGroupRef.current.position.set(
          groupLocations[2].position[0],
          groupLocations[2].position[1],
          groupLocations[2].position[2]
        );
        shirtsGroupRef.current.rotation.set(
          groupLocations[2].rotation[0],
          groupLocations[2].rotation[1],
          groupLocations[2].rotation[2]
        );
      }
    }
  });

  useEffect(() => {
    scene.background = new Color(0x000000);
  }, []);

  return (
    <>
      {/* <directionalLight position={[-1.3, 6.0, 4.4]} castShadow intensity={Math.PI * 1} /> */}

      <Center>
        <group ref={shirtsGroupRef} scale={[1, 1, 1]} rotation={[0, 0, 0]}>
          <primitive
            ref={iptechshirtRef}
            object={iptechshirt.scene}
            position={[0, -0.3, -2]}
            children-0-castShadow
            rotation={[0, -0.5, 0]}
          />
          <primitive
            ref={appleshirtRef}
            object={appleshirt.scene}
            position={[0, -0.3, 0]}
            children-0-castShadow
            rotation={[0, -0.5, 0]}
          />
          <primitive
            ref={cemshirtRef}
            object={cemshirt.scene}
            position={[0, -0.3, 2]}
            children-0-castShadow
            rotation={[0, -0.5, 0]}
          />
        </group>
        <Clouds material={MeshBasicMaterial}>
          <Cloud seed={1} scale={1} volume={5} color="hotpink" fade={200} />
        </Clouds>
      </Center>
      <Scroll html>
        <div style={{ fontSize: "1vw" }}>
          {/** Put a div next to the bounding box of the shirt that says the name of the shirt */}
          <div
            style={
              // center the div in the middle of the screen and split it in half
              {
                position: "absolute",
                top: "50vh",
                left: "30vw",
                transform: "translate(-50%, -50%)",
                color: "white",
              }
            }
          >
            <div
              style={{
                //divide this into two divs side by side
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "30vw",
                height: "50vh",
                filter: "drop-shadow(0px 0px 20px white)",
              }}
            >
              <div>
                <div style={{ textAlign: "start" }}>
                  <h1 style={{ color: "white" }}>CEM</h1>
                </div>
                <div>
                  As a not-for-profit, non-denominational, Christian
                  organisation CEM is involved in various aspects of Christian
                  Education, including the delivery of school support services,
                  developing curriculum, operating early learning centres and
                  helping home schoolers. The organisation manages five distinct
                  brands.
                </div>
                <hr />
                <div>
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
                </div>
                <div>
                  Roles:
                  <div>Software Engineer</div>
                  <div>IT Officer - Network and System Administrator</div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              color: "white",
              top: "150vh",
              left: "30vw",
              transform: "translate(-50%, -50%)",
              filter: "drop-shadow(0px 0px 20px white)",
            }}
          >
            <div
              style={{
                //divide this into two divs side by side
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "30vw",
                height: "50vh",
              }}
            >
              <div>
                <div style={{ textAlign: "center", margin: "1rem" }}>
                  <h1 style={{ color: "white" }}>Apple Inc.</h1>
                </div>
                <div>
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
                </div>
                <hr />
                <div>
                  Apple Corporate Roles:
                  <div>Apple Advisor Coach</div>
                  <div>Mac+ Senior Advisor</div>
                  <div>iOS Senior Advisor</div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              color: "white",
              transform: "translate(-50%, -50%)",
              top: "250vh",
              left: "30vw",
              filter: "drop-shadow(0px 0px 20px white)",
            }}
          >
            <div
              style={{
                //divide this into two divs side by side
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "30vw",
                height: "50vh",
              }}
            >
              <div>
                <div style={{ textAlign: "center", margin: "1rem" }}>
                  <h1 style={{ color: "white" }}>IP Technologies</h1>
                </div>
                <div>
                  IP Technologies are a highly-specialized IP hardware and
                  software supplier and IP technology integration company with
                  experience in commercial solutions in small, medium and large
                  businesses across Australia as well as in residential
                  applications.
                </div>
                <hr />
                <div>
                  <ul>
                    <li>
                      Data Cabling & Network Rack Installations, Phillips
                      Dynalite Programming, Home Automation Light & Controller
                      Installations, Boardroom Automation
                    </li>
                  </ul>
                </div>
                <div>
                  Roles:
                  <div>IT Trade Assistant</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Scroll>

      {/* <ambientLight intensity={1} /> */}
    </>
  );
};

const WorkExperienceDivWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
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
      <Canvas dpr={window.devicePixelRatio}>
        <Stage preset="rembrandt" intensity={1} environment="city">
          <Suspense fallback={null}>
            <ScrollControls pages={3} damping={0.25}>
              <Scene />
            </ScrollControls>
          </Suspense>
        </Stage>
      </Canvas>

      <Loader />
    </WorkExperienceDivWrapper>
  );
};
