import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { LinearToneMapping } from 'three';
import { Environment, useGLTF, PerspectiveCamera, OrbitControls, MeshReflectorMaterial } from '@react-three/drei';
import envFile from '../../assets/images/modern_bathroom_2k.hdr';
import sceneFile from '../../assets/models/phone1.glb'

// import Model from './model';
import './index.scss';

function Scene() {

  extend({ MeshReflectorMaterial })

  const gltf = useGLTF(sceneFile);
  // const mat = new MeshReflectorMaterial();
  console.log(gltf.nodes);

  return (
    <Canvas
      className="scene"
      color="black"
      gl={{
        toneMapping: LinearToneMapping,
        toneMappingExposure: .65,
      }}
    >

      {/* <fog attach="fog" args={['black', 20, 60]} /> */}
      {/* <ambientLight intensity={0.1} /> */}
      <Environment files={envFile} intensity={1} />
      <OrbitControls></OrbitControls>

      <Suspense>
        <group>
          <primitive object={gltf.scene} />
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
          // position={[0, 0, 0]}
          // geometry={gltf.nodes.Phone.geometry}

          >
            <planeGeometry args={[50, 50, 50]} />
            <MeshReflectorMaterial
              // ref={reflectionMaterialRef}
              blur={[0, 0]} // Blur ground reflections (width, height), 0 skips blur
              color={0x444444}
              mixBlur={0} // How much blur mixes with surface roughness (default = 1)
              mixStrength={10} // Strength of the reflections
              mixContrast={1} // Contrast of the reflections
              resolution={256} // Off-buffer resolution, lower=faster, higher=better quality, slower
              mirror={1} // Mirror environment, 0 = texture colors, 1 = pick up env colors
              depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
              minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
              maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
              depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
              distortion={1} // Amount of distortion based on the distortionMap texture
              // distortionMap={distortionTexture} // The red channel of this texture is used as the distortion map. Default is null
              debug={0}
            // Depending on the assigned value, one of the following channels is shown:
            // 0 = no debug
            // 1 = depth channel
            // 2 = base channel
            // 3 = distortion channel
            // 4 = lod channel (based on the roughness)
            // reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
            />
          </mesh>
        </group>
      </Suspense>
      <PerspectiveCamera
        position={[0, 5, 10]}
        makeDefault={true}
        fov={70}
        near={1}
        far={80}
      />
      {/* <EffectComposer>
      </EffectComposer> */}
    </Canvas>
  );
}

export default Scene;
