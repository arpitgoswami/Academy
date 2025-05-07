"use client";

import { useEffect, useRef } from "react";

export default function Character({ isSpeaking }) {
  const containerRef = useRef();
  const rendererRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef();
  const animationFrameRef = useRef();
  const modelRef = useRef();

  useEffect(() => {
    let mounted = true;

    const initScene = async () => {
      try {
        const THREE = await import("three");
        const { GLTFLoader } = await import(
          "three/examples/jsm/loaders/GLTFLoader"
        );

        // Scene setup with fog for depth
        const scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x000000, 5, 15);
        sceneRef.current = scene;

        // Camera setup - adjusted for better view
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
        camera.position.set(0, 1, 4);
        camera.lookAt(0, 0, 0);
        cameraRef.current = camera;

        // Enhanced renderer setup
        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(300, 300);
        renderer.setClearColor(0x000000, 0);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;
        containerRef.current?.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Enhanced lighting setup
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const keyLight = new THREE.DirectionalLight(0xffffff, 2);
        keyLight.position.set(5, 5, 5);
        scene.add(keyLight);

        const fillLight = new THREE.DirectionalLight(0x7ec5ff, 1);
        fillLight.position.set(-5, 2, -5);
        scene.add(fillLight);

        const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
        backLight.position.set(0, 3, -5);
        scene.add(backLight);

        // Load model with modified position
        const loader = new GLTFLoader();
        try {
          const gltf = await new Promise((resolve, reject) => {
            loader.load(
              "/player.glb",
              resolve,
              (xhr) => console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`),
              reject
            );
          });

          if (!mounted) return;

          const model = gltf.scene;

          // Adjust model for better visibility
          model.scale.set(0.8, 0.8, 0.8);
          model.position.set(0, -0.2, 0); // Raised position
          model.rotation.y = Math.PI / 6; // Initial rotation

          // Add subtle material adjustments
          model.traverse((child) => {
            if (child.isMesh) {
              child.material.roughness = 0.8;
              child.material.metalness = 0.2;
            }
          });

          modelRef.current = model;
          scene.add(model);

          // Animation loop with smooth rotation
          const animate = () => {
            if (!mounted) return;

            animationFrameRef.current = requestAnimationFrame(animate);

            if (modelRef.current && isSpeaking) {
              // Smoother rotation during speech
              modelRef.current.rotation.y += 0.015;

              // Add subtle floating motion
              const time = Date.now() * 0.001;
              model.position.y = -0.2 + Math.sin(time * 2) * 0.05;
            }

            renderer.render(scene, camera);
          };

          animate();
        } catch (modelError) {
          console.error("Model loading error:", modelError);
        }
      } catch (error) {
        console.error("Scene initialization error:", error);
      }
    };

    initScene();

    return () => {
      mounted = false;

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }

      if (sceneRef.current) {
        sceneRef.current.clear();
      }
    };
  }, []);

  return (
    <div className="relative w-[300px] h-[300px] mx-auto mb-8">
      <div ref={containerRef} className="w-full h-full" />
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 pointer-events-none rounded-xl bg-gradient-to-b from-blue-500/5 via-transparent to-slate-900/10 dark:from-blue-400/10 dark:via-transparent dark:to-slate-800/20" />
    </div>
  );
}
