import { PlaneProps, usePlane } from "@react-three/cannon";
import { Color } from "three";

export const Floor = (props: PlaneProps & { color: Color }) => {
  const [ref] = usePlane((_index) => ({ type: "Static", mass: 0, ...props }));

  return (
    <mesh receiveShadow rotation={props.rotation} ref={ref}>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial color={props.color} />
    </mesh>
  );
};
