import { OrbitControls, Bounds } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Model from "./Crt";
import { EffectComposer, SSAO } from "@react-three/postprocessing";
import { OrderedDither } from "./ordered dither/OrderedDither";
import { useControls } from "leva";

function App() {
  const { backgroundColor, ambientColor } = useControls({
    backgroundColor: ["#0c0e11"],
    ambientColor: "#b3c3ff",
  });
  function Mesh() {
    return (
      <mesh>
        <boxGeometry />
        <meshLambertMaterial />
      </mesh>
    );
  }

  return (
    <>
      <Canvas gl={{ stencil: false, antialias: false }}>
        <color attach="background" args={["#0c0e11"]} />
        <OrbitControls />
        <ambientLight intensity={2} color={ambientColor} />
        <directionalLight intensity={2} position={[0, 10, 20]} />
        <Bounds fit observe margin={1.2}>
          <Model />
        </Bounds>
        <EffectComposer>
          <OrderedDither invertDither={false} darkThreshold={35} />
          <SSAO
            radius={0.4}
            intensity={50}
            luminanceInfluence={0.4}
            color="#0a3be7"
          />
        </EffectComposer>
      </Canvas>
    </>
  );
}

export default App;
