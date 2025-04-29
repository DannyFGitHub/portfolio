import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import FLogo3DURL from "../../../assets/models/flogo.glb";
import { Group, LoopRepeat } from "three";
import { useFrame } from "@react-three/fiber";

export function FLogo3D(props) {
  const group = useRef<Group>(null);
  const { nodes, materials, animations } = useGLTF(FLogo3DURL);
  const { actions, names, mixer } = useAnimations(animations, group);

  useEffect(() => {
    mixer.timeScale = -1;
    for (let name of names) {
      actions[name]?.setLoop(LoopRepeat, 1).reset().play();
    }
  }, []);

  useFrame((state, delta) => {
    if (!group.current || !props.position) return;
    const offset = Math.sin(state.clock.getElapsedTime() * 1) * 0.02;
    group.current.position.y = props.position[1] + offset;

    group.current.rotation.y += 0.005;
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Cube001"
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.Material}
          position={[0, 3.592, -1.37]}
        />
        <mesh
          name="Cube002"
          castShadow
          receiveShadow
          geometry={nodes.Cube002.geometry}
          material={materials.Material}
          position={[0, 3.464, 0.467]}
        />
        <mesh
          name="Cube003"
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials.Material}
          position={[0, 2.224, 0.717]}
        />
        <mesh
          name="Cube004"
          castShadow
          receiveShadow
          geometry={nodes.Cube004.geometry}
          material={materials.Material}
          position={[0, 2.285, -0.463]}
        />
        <mesh
          name="Cube005"
          castShadow
          receiveShadow
          geometry={nodes.Cube005.geometry}
          material={materials.Material}
          position={[0, 1.106, 0.943]}
        />
        <mesh
          name="Cube006"
          castShadow
          receiveShadow
          geometry={nodes.Cube006.geometry}
          material={materials.Material}
          position={[0, 2.183, 0.747]}
        />
        <mesh
          name="Cube007"
          castShadow
          receiveShadow
          geometry={nodes.Cube007.geometry}
          material={materials.Material}
          position={[0, 3.529, -0.388]}
        />
        <mesh
          name="Cube008"
          castShadow
          receiveShadow
          geometry={nodes.Cube008.geometry}
          material={materials.Material}
          position={[0, 2.223, 0.115]}
        />
        <mesh
          name="Cube009"
          castShadow
          receiveShadow
          geometry={nodes.Cube009.geometry}
          // material={nodes.Cube009.material}
        >
          <meshPhysicalMaterial
            roughness={0.8}
            metalness={0}
            ior={1}
            transmission={1}
            reflectivity={0.6}
            thickness={0.4}
            transparent
            opacity={0.2}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload(FLogo3DURL);
