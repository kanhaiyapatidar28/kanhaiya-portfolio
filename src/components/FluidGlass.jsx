import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, Environment, Text, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function GlassLens() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    // Smooth, organic rotation tied to mouse position
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x, 
      (state.pointer.y * Math.PI) / 3, 
      0.05
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y, 
      (state.pointer.x * Math.PI) / 3, 
      0.05
    );
  });

  return (
    <Float floatIntensity={3} rotationIntensity={2} speed={1.5}>
      {/* Flattened sphere creates a thick, organic lens effect */}
      <mesh ref={meshRef} scale={[1.2, 1.4, 0.35]}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={10}
          thickness={5}
          ior={1.4}
          chromaticAberration={0.08}
          anisotropy={1}
          clearcoat={1}
          clearcoatRoughness={0}
          roughness={0}
          transmission={1}
          color="#ffffff"
          attenuationDistance={8}
          attenuationColor="#10b981"
        />
      </mesh>
    </Float>
  );
}

export default function FluidGlass() {
  return (
    <div className="w-full h-full relative cursor-none flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ alpha: true, antialias: true, stencil: false, depth: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <directionalLight position={[-10, -10, -5]} intensity={2} color="#10b981" />
          
          {/* Deep Background Typography for Refraction */}
          <group position={[0, 0, -5]}>
            <Text 
              position={[0, 1, 0]} 
              fontSize={3} 
              font="https://fonts.gstatic.com/s/outfit/v36/QGYvz_MVcBeNP4NJtEtq.woff"
              letterSpacing={-0.08}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              PERFECTION
            </Text>
            <Text 
              position={[0, -1.8, 0]} 
              fontSize={1} 
              font="https://fonts.gstatic.com/s/outfit/v36/QGYvz_MVcBeNP4NJtEtq.woff"
              letterSpacing={0.4}
              color="#10b981"
              anchorX="center"
              anchorY="middle"
            >
              IN MOTION
            </Text>
          </group>

          {/* Floating Atmospheric Particles */}
          <Sparkles count={150} scale={15} size={3} speed={0.4} opacity={0.6} color="#10b981" />
          <Sparkles count={80} scale={12} size={1.5} speed={0.8} opacity={0.4} color="#ffffff" />
          
          <GlassLens />
          
          {/* Studio Environment Map for highly realistic edge reflections */}
          <Environment preset="city" />
        </Suspense>
      </Canvas>
      
      {/* Decorative Vignette Outline overlay */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(5,5,5,1)]" />
    </div>
  );
}
