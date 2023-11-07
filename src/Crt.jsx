import React, { useRef } from "react";
import { RGBELoader } from "three-stdlib";
import { useLoader, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import CRT from "./assets/crt.glb";
import HDR from "./assets/aerodynamics_workshop_1k.hdr";
import { useControls } from "leva";

export default function Model(props) {
  const { nodes } = useGLTF(CRT);
  const donut = useRef();
  const { monitor, screen, screenEmissive, donutColor } = useControls({
    monitor: "#c69c00",
    screen: "#0c0e11",
    screenEmissive: "#0c0e11",
    donutColor: "#c69c00",
  });

  const texture = useLoader(RGBELoader, HDR);

  useFrame(() => {
    donut.current.rotation.x += 0.01;
    donut.current.rotation.y += 0.01;
  });

  const materialConfig = {
    backside: true,
    backsideThickness: 1,
    resolution: 1024,
    transmission: 0.7,
    thickness: 0.1,
    chromaticAberration: 5,
    anisotropy: 0.3,
    roughness: 0,
    distortion: 0.5,
    distortionScale: 0.8,
    temporalDistortion: 0.24,
    ior: 0.8,
    color: "#ffffff",
  };
  return (
    <group {...props} dispose={null}>
      <group
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0.6]}
        scale={4.608}
      >
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group
            position={[0, -7.127, 5.522]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={10}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.CRT_Monitor_monitor_glass_0.geometry}
            >
              <meshLambertMaterial
                emissive={screenEmissive}
                color={screen}
                emissiveIntensity={0.4}
              />
            </mesh>
            <Float>
              <mesh
                ref={donut}
                scale={0.5}
                position={[0, -2.5, 1]}
                rotation={[-2, -0.1, 0]}
              >
                <torusGeometry />
                <meshLambertMaterial wireframe color={donutColor} />
              </mesh>
            </Float>

            <mesh geometry={nodes.CRT_Monitor_monitor_plastic_0.geometry}>
              {/* <MeshTransmissionMaterial {...materialConfig} /> */}
              <meshLambertMaterial color={monitor} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}
