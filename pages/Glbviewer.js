import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const GLBViewer = ({ src }) => {
    const canvasRef = useRef(null);
    const mouseX = useRef(0);
    const mouseY = useRef(0);
    useEffect(() => {

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            canvasRef.current.clientWidth / canvasRef.current.clientHeight,
            0.1,

            1000,
        );

        scene.background = new THREE.Color(0xffffff);
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
        renderer.setSize(500, 400);

        const controls = new OrbitControls(camera, renderer.domElement);

        const loader = new GLTFLoader();
        loader.load(src, (gltf) => {
            scene.add(gltf.scene);
            camera.position.z = 15;


            // Add a point light to the scene
            const pointLight = new THREE.PointLight(0xffffff, 3);
            pointLight.position.set(0, 5, 5);
            scene.add(pointLight);
            controls.update();
            const animate = () => {
                requestAnimationFrame(animate);

                renderer.render(scene, camera);
            };
            animate();
        });

        const handleMouseMove = (event) => {
            mouseX.current = (event.clientX / canvasRef.current.clientWidth) * 2 - 1;
            mouseY.current = -(event.clientY / canvasRef.current.clientHeight) * 2 + 1;
        };

        canvasRef.current.addEventListener('mousemove', handleMouseMove);

        return () => {
            canvasRef.current.removeEventListener('mousemove', handleMouseMove);
        };
    }, [src]);

    return <canvas ref = { canvasRef }
    />;
};

export default GLBViewer;