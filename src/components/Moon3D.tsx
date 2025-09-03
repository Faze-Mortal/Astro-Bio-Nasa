import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';

const Moon3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const moonRef = useRef<THREE.Group>();

  useEffect(() => {
    const width = 600;
    const height = 600;
    const scene = new THREE.Scene();
    scene.background = null;
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    rendererRef.current = renderer;
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Load moon.glb model
    const loader = new GLTFLoader();
    loader.load('/moon.glb', (gltf) => {
      const moon = gltf.scene;
      moonRef.current = moon;
      moon.position.set(0, 0, 0);
      moon.scale.set(2, 2, 2);
      scene.add(moon);
    });

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 4.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      if (moonRef.current) {
        moonRef.current.rotation.y += 0.002;
      }
      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 600,
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.85,
      }}
      aria-label="3D Moon"
    />
  );
};

export default Moon3D;
