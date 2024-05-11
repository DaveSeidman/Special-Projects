import sceneFile from '../../assets/models/phone1.glb'
import { useGLTF } from '@react-three/drei';
import React, { useState, Suspense } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

function Model() {
  const gltf = useGLTF(sceneFile);
  const { x, y, z } = gltf.nodes.light.position;
  const [lightIntensity, setLightIntensity] = useState(1);
  const { clock } = useThree();

  useFrame(() => {
    setLightIntensity(Math.sin(clock.elapsedTime * 10) + 1);
  })


  return (
    <Suspense>
      <group>
        <primitive object={gltf.scene} />
        <pointLight
          color={0x666666}
          position={[x, y, z]}
          intensity={lightIntensity}
        />
        <mesh position={[x, y, z]}>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial
            color={0xffaaaa}
            emissive={0xffaaaa}
            emissiveIntensity={lightIntensity}
          />
        </mesh>
      </group>
    </Suspense>
  )

}

export default Model;