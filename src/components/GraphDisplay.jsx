import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import '../App.css';
import FunctionInput from './FunctionInput';
import { createLine } from './lineFactory';
import { convertMathExpression } from './Coorinates';
import { evaluateExpression } from './FormPoints';

const GraphDisplay = () => {
  const canvasRef = useRef(null);
  const [is2D, setIs2D] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);  // Store camera reference to update it later
  const rendererRef = useRef(null); // Store renderer reference
  const lineObjects = useRef([]);   // Holds the line objects in the scene

  // Initialize scene, camera, renderer once
  useEffect(() => {
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const frustumSize = 10;
    const aspect = window.innerWidth / window.innerHeight;

    const camera = new THREE.OrthographicCamera(
      -frustumSize * aspect / 2,
      frustumSize * aspect / 2,
      frustumSize / 2,
      -frustumSize / 2,
      0.1,
      1000
    );
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;

    // Set default camera and scene settings
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    scene.background = new THREE.Color(0xffffff); // Light mode by default

    // Axes setup (remains static, so this won't be re-created)
    const redMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const greenMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
    const blueMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });

    const xAxis = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-100, 0, 0), new THREE.Vector3(100, 0, 0)]),
      redMaterial
    );
    scene.add(xAxis);

    const yAxis = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -100, 0), new THREE.Vector3(0, 100, 0)]),
      greenMaterial
    );
    scene.add(yAxis);

    const zAxis = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, -100), new THREE.Vector3(0, 0, 100)]),
      blueMaterial
    );
    scene.add(zAxis);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update camera position when is2D changes
  useEffect(() => {
    const camera = cameraRef.current;
    if (camera) {
      if (is2D) {
        camera.position.set(0, 0, 10); // 2D view
      } else {
        camera.position.set(10, 10, 10); // 3D view
      }
      camera.lookAt(0, 0, 0); // Reset look at position
    }
  }, [is2D]);

  // Update background color when isDarkMode changes
  useEffect(() => {
    const scene = sceneRef.current;
    if (scene) {
      scene.background = new THREE.Color(isDarkMode ? 0x000000 : 0xffffff);
    }
  }, [isDarkMode]);

  const plotEquation = (equation) => {
    const expression = convertMathExpression(equation);
    const coordinates = evaluateExpression(expression, 0, 100);  // Generate coordinates for plotting
    const newLine = createLine(coordinates, 0xff0000);
    sceneRef.current.add(newLine);
    lineObjects.current = [newLine]; // Store the newly plotted line
  };

  const toggle2D = () => setIs2D((prev) => !prev);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div className="app">
      <canvas ref={canvasRef} className="three-canvas"></canvas>
      <div className="overlay bottom-left">
        <FunctionInput onSubmit={plotEquation} />
      </div>
      <div className="overlay bottom-right">
        <button onClick={toggle2D}>{is2D ? 'Switch to 3D' : 'Switch to 2D'}</button>
      </div>
      <div className="overlay bottom-right-1">
        <button onClick={toggleDarkMode}>{isDarkMode ? 'Light' : 'Dark'}</button>
      </div>
    </div>
  );
};

export default GraphDisplay;
