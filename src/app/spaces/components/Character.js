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

        // Simple scene setup
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Basic camera setup
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
        camera.position.set(0, 1, 4);
        camera.lookAt(0, 0, 0);
        cameraRef.current = camera;

        // Simple renderer setup
        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
        });
        renderer.setSize(300, 300);
        renderer.setClearColor(0x000000, 0);
        containerRef.current?.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Basic lighting setup
        const mainLight = new THREE.DirectionalLight(0xffffff, 1);
        mainLight.position.set(1, 1, 1);
        scene.add(mainLight);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

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

          // Simple model setup
          model.scale.set(0.8, 0.8, 0.8);
          model.position.set(0, 0, 0);
          model.rotation.y = Math.PI / 4;

          modelRef.current = model;
          scene.add(model);

          // Simple animation loop
          const animate = () => {
            if (!mounted) return;

            animationFrameRef.current = requestAnimationFrame(animate);

            if (modelRef.current && isSpeaking) {
              modelRef.current.rotation.y += 0.01;
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
    <div className="w-[300px] h-[300px] mx-auto mb-8">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}
