import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { LinearToneMapping } from 'three';
import { Environment, useGLTF, PerspectiveCamera, OrbitControls, MeshReflectorMaterial } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import envFile from '../../assets/images/modern_bathroom_2k.hdr';
import Model from './model';

import './index.scss';

function Scene() {

  return (
    <Canvas
      className="scene"
      color="black"
      gl={{
        toneMapping: LinearToneMapping,
        toneMappingExposure: 0.65,
      }}
    >
      <PerspectiveCamera
        position={[0, 5, 10]}
        makeDefault={true}
        fov={60}
        near={1}
        far={80}
      />
      <fog attach="fog" args={['black', 10, 20]} />
      <Environment files={envFile} intensity={1} />

      <group>
        <Model />
        <mesh rotation={[-Math.PI / 2, 0, 0]} >
          <planeGeometry args={[100, 100, 1]} />
          <MeshReflectorMaterial
            blur={[0, 0]} // Blur ground reflections (width, height), 0 skips blur
            color={0x444444}
            mixBlur={0.1} // How much blur mixes with surface roughness (default = 1)
            mixStrength={5} // Strength of the reflections
            mixContrast={1} // Contrast of the reflections
            resolution={512} // Off-buffer resolution, lower=faster, higher=better quality, slower
            mirror={.9} // Mirror environment, 0 = texture colors, 1 = pick up env colors
            depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
            minDepthThreshold={0} // Lower edge for the depthTexture interpolation (default = 0)
            maxDepthThreshold={0} // Upper edge for the depthTexture interpolation (default = 0)
            depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
            distortion={1} // Amount of distortion based on the distortionMap texture
          />
        </mesh>
      </group>

      <EffectComposer>
        <Bloom
          luminanceThreshold={.8}
          intensity={2}
          mipmapBlur
        />
      </EffectComposer>
      <OrbitControls
        enableZoom={false}
      ></OrbitControls>
    </Canvas>
  );
}

export default Scene;
