import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useBox } from "@react-three/cannon";

const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

export function Player() {
  const [ref, api] = useBox(
    () => ({
      args: [3.4, 1, 3],
      type: "Kinematic",
    }),
    useRef<THREE.Mesh>(null)
  );

  const [, get] = useKeyboardControls();
  useFrame((state, delta) => {
    const { forward, backward, left, right, jump } = get();
    // const velocity = ref.current!.linvel();

    // update camera
    const { x, y, z } = ref.current!.position;
    state.camera.position.set(x, y, z);
    // movement
    frontVector.set(0, 0, +backward - +forward);
    sideVector.set(+left - +right, 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(9)
      .applyEuler(state.camera.rotation);
    // ref.current!.setLinvel({ x: direction.x, y: velocity.y, z: direction.z });
    // jumping
    // const world = rapier.world.raw();
    // const ray = world.castRay(
    //   new RAPIER.Ray(ref.current!.translation(), { x: 0, y: -1, z: 0 })
    // );
    // const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1.75;
    // if (jump && grounded) ref.current!.setLinvel({ x: 0, y: 7.5, z: 0 });
  });
  return (
    <mesh ref={ref} dispose={null}></mesh>
    // <RigidBody
    //   ref={ref}
    //   colliders={false}
    //   mass={1}
    //   type="dynamic"
    //   position={[-2, 4, 24]}
    //   enabledRotations={[false, false, false]}
    // >
    //   <CapsuleCollider args={[0.75, 1]} />
    // </RigidBody>
  );
}
