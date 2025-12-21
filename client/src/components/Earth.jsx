import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

const Earth = () => {
    const meshRef = useRef();

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.1;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <group>
            {/* Ambient Light for base illumination */}
            <ambientLight intensity={0.5} />

            {/* Directional Light to create shadows/depth */}
            <directionalLight position={[10, 10, 5]} intensity={1.5} color="#6EE7B7" />

            {/* The "Earth" - Abstract Representation */}
            <Sphere args={[2.8, 64, 64]} ref={meshRef}>
                <MeshDistortMaterial
                    color="#0A0D12"
                    attach="material"
                    distort={0.4}
                    speed={1.5}
                    roughness={0.2}
                    metalness={0.9}
                    emissive="#6EE7B7"
                    emissiveIntensity={0.1}
                    wireframe
                />
            </Sphere>

            {/* Inner Glowing Core */}
            <Sphere args={[2.2, 64, 64]}>
                <meshBasicMaterial color="#0A0D12" />
            </Sphere>

            {/* Floating Particles/Stars */}
            {Array.from({ length: 50 }).map((_, i) => (
                <mesh
                    key={i}
                    position={[
                        (Math.random() - 0.5) * 15,
                        (Math.random() - 0.5) * 15,
                        (Math.random() - 0.5) * 10
                    ]}
                >
                    <sphereGeometry args={[0.03, 16, 16]} />
                    <meshStandardMaterial
                        color={Math.random() > 0.5 ? "#6EE7B7" : "#7DD3FC"}
                        emissive={Math.random() > 0.5 ? "#6EE7B7" : "#7DD3FC"}
                        emissiveIntensity={2}
                    />
                </mesh>
            ))}
        </group>
    );
};

export default Earth;
