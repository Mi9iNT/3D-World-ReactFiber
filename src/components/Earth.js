import React, { useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

import { TextureLoader } from 'three';
import EarthJour from '../assets/textures/terre2K.jpg';
import Moon from '../assets/textures/lune2K.jpg';
import EarthNormalMap from '../assets/textures/8k_earth_normal_map.jpg';
import EarthSpecularMap from '../assets/textures/8k_earth_specular_map.jpg';
import EarthCloudsMap from '../assets/textures/nuages2K.jpg';



export function Earth(props) {

    const [colorMap, normalMap, cloudsMap, specularMap, moonMap] = useLoader(TextureLoader, [EarthJour, EarthNormalMap, EarthCloudsMap, EarthSpecularMap, Moon]);

    const earthRef = useRef();
    const cloudsRef = useRef();
    const moonRef = useRef();

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        earthRef.current.rotation.y = elapsedTime / -10;
        cloudsRef.current.rotation.y = elapsedTime / -10;
        moonRef.current.position.x = elapsedTime / 4;
        moonRef.current.rotation.y = elapsedTime / -4;
    });

    // ne pas utiliser de balise spécifique (div,span...) en premier élément html /!\ important
    return <>
        <pointLight color="#f6f3ea" position={[-190, -360, 210]} intensity={1.3} />
        <Stars
            radius={300}
            depth={60}
            count={2000}
            factor={7}
            saturation={0}
            fade={true}
        />
        <mesh ref={cloudsRef} position={[0, -2, 0]}>
            <sphereGeometry args={[1.045, 36, 36]} />
            <meshPhongMaterial
                map={cloudsMap}
                opacity={0.45} depthWrite={true} transparent={true} side={THREE.DoubleSide}
            />
        </mesh>
        <mesh>

        </mesh>
        <mesh ref={earthRef} position={[0, -2, 0]}>
            <sphereGeometry args={[1, 36, 36]} />
            <meshPhongMaterial specularMap={specularMap} />
            <meshStandardMaterial
                map={colorMap}
                normalMap={normalMap}
                metalness={0.5}
                roughness={0.9}
            />
            <OrbitControls
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                zoomSpeed={0.5}
                panSpeed={0.2}
                rotateSpeed={0.2}
            />
        </mesh>

        <mesh ref={moonRef} position={[-10, 5, -10]}>
            <sphereGeometry args={[1, 12, 12]} />
            <meshStandardMaterial
                map={moonMap}
                metalness={0.5}
                roughness={0.9}
            />
            <OrbitControls
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                zoomSpeed={0.5}
                panSpeed={0.2}
                rotateSpeed={0.2}
            />
        </mesh>
    </>

}