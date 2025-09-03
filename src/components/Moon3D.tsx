import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Moon3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const moonRef = useRef<THREE.Mesh>();

  useEffect(() => {
    const width = 160;
    const height = 160;
    const scene = new THREE.Scene();
    scene.background = null;
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 2.5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    rendererRef.current = renderer;
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Moon geometry and material
    const geometry = new THREE.SphereGeometry(0.7, 64, 64);
    const textureLoader = new THREE.TextureLoader();
    // Use a public domain moon texture
    const texture = textureLoader.load('https://threejs.org/examples/textures/moon.jpg');
    const material = new THREE.MeshStandardMaterial({ map: texture });
    const moon = new THREE.Mesh(geometry, material);
    scene.add(moon);
    moonRef.current = moon;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(2, 2, 2);
    scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      if (moonRef.current) {
        moonRef.current.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', right: 40, top: 40, width: 160, height: 160, zIndex: 10 }}
      aria-label="3D Moon"
    />
  );
};

export default Moon3D;
