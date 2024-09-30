import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './App.css';
import FunctionInput from './components/FunctionInput';
import { createLine } from './components/lineFactory';
import { convertMathExpression } from './components/Coorinates';

const App = () => {
  const canvasRef = useRef(null);
  const [is2D, setIs2D] = useState(false); // State to track the camera mode

  useEffect(() => {
    const scene = new THREE.Scene();
    const frustumSize = 10;
    const aspect = window.innerWidth / window.innerHeight;

    const camera = new THREE.OrthographicCamera(
      -frustumSize * aspect / 2,
      frustumSize * aspect / 2,
      frustumSize / 2,
      -frustumSize / 2,
      0.00,
      1000000
    );

    const setCameraPosition = () => {
      if (is2D) {
        camera.position.set(0, 0, 0);
      } else {
        camera.position.set(10, 10, 10);
      }
      camera.lookAt(0, 0, 0);
    };

    setCameraPosition(); // Set initial camera position based on state

    const coordinates = [
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 1, z: 0 },
      { x: 2, y: 4, z: 0 },
      { x: 3, y: 9, z: 0 },
      { x: 4, y: 16, z: 0 },
      { x: 5, y: 25, z: 0 },
      { x: 6, y: 36, z: 0 },
      { x: 7, y: 49, z: 0 },
      { x: 8, y: 64, z: 0 },
      { x: 9, y: 81, z: 0 },
      { x: 10, y: 100, z: 0 },
      { x: 11, y: 121, z: 0 },
      { x: 12, y: 144, z: 0 },
      { x: 13, y: 169, z: 0 },
      { x: 14, y: 196, z: 0 },
      { x: 15, y: 225, z: 0 },
      { x: 16, y: 256, z: 0 },
      { x: 17, y: 289, z: 0 },
      { x: 18, y: 324, z: 0 },
      { x: 19, y: 361, z: 0 },
      { x: 20, y: 400, z: 0 },
      { x: 21, y: 441, z: 0 },
      { x: 22, y: 484, z: 0 },
      { x: 23, y: 529, z: 0 },
      { x: 24, y: 576, z: 0 },
      { x: 25, y: 625, z: 0 },
      { x: 26, y: 676, z: 0 },
      { x: 27, y: 729, z: 0 },
      { x: 28, y: 784, z: 0 },
      { x: 29, y: 841, z: 0 },
      { x: 30, y: 900, z: 0 },
    ];

    // Use the imported createLine function to create the line graph
    const line = createLine(coordinates, 0xff0000); // Red line
    scene.add(line);

    const coordinates2 = [
      { x: 1, y: Math.log(1), z: 0 },
      { x: 2, y: Math.log(2), z: 0 },
      { x: 3, y: Math.log(3), z: 0 },
      { x: 4, y: Math.log(4), z: 0 },
      { x: 5, y: Math.log(5), z: 0 },
      { x: 6, y: Math.log(6), z: 0 },
      { x: 7, y: Math.log(7), z: 0 },
      { x: 8, y: Math.log(8), z: 0 },
      { x: 9, y: Math.log(9), z: 0 },
      { x: 10, y: Math.log(10), z: 0 },
      { x: 11, y: Math.log(11), z: 0 },
      { x: 12, y: Math.log(12), z: 0 },
      { x: 13, y: Math.log(13), z: 0 },
      { x: 14, y: Math.log(14), z: 0 },
      { x: 15, y: Math.log(15), z: 0 },
      { x: 16, y: Math.log(16), z: 0 },
      { x: 17, y: Math.log(17), z: 0 },
      { x: 18, y: Math.log(18), z: 0 },
      { x: 19, y: Math.log(19), z: 0 },
      { x: 20, y: Math.log(20), z: 0 },
      { x: 21, y: Math.log(21), z: 0 },
      { x: 22, y: Math.log(22), z: 0 },
      { x: 23, y: Math.log(23), z: 0 },
      { x: 24, y: Math.log(24), z: 0 },
      { x: 25, y: Math.log(25), z: 0 },
      { x: 26, y: Math.log(26), z: 0 },
      { x: 27, y: Math.log(27), z: 0 },
      { x: 28, y: Math.log(28), z: 0 },
      { x: 29, y: Math.log(29), z: 0 },
      { x: 30, y: Math.log(30), z: 0 }
    ];

    const line2 = createLine(coordinates2, 0xff0560); // Red line
    scene.add(line2);
    
    const coordinates3 = [
      { x: 1, y: 1, z: 0 },
      { x: 2, y: 2, z: 0 },
      { x: 3, y: 3, z: 0 },
      { x: 4, y: 4, z: 0 },
      { x: 5, y: 5, z: 0 },
      { x: 6, y: 6, z: 0 },
      { x: 7, y: 7, z: 0 },
      { x: 8, y: 8, z: 0 },
      { x: 9, y: 9, z: 0 },
      { x: 10, y: 10, z: 0 },
      { x: 11, y: 11, z: 0 },
      { x: 12, y: 12, z: 0 },
      { x: 13, y: 13, z: 0 },
      { x: 14, y: 14, z: 0 },
      { x: 15, y: 15, z: 0 },
      { x: 16, y: 16, z: 0 },
      { x: 17, y: 17, z: 0 },
      { x: 18, y: 18, z: 0 },
      { x: 19, y: 19, z: 0 },
      { x: 20, y: 20, z: 0 },
      { x: 21, y: 21, z: 0 },
      { x: 22, y: 22, z: 0 },
      { x: 23, y: 23, z: 0 },
      { x: 24, y: 24, z: 0 },
      { x: 25, y: 25, z: 0 },
      { x: 26, y: 26, z: 0 },
      { x: 27, y: 27, z: 0 },
      { x: 28, y: 28, z: 0 },
      { x: 29, y: 29, z: 0 },
      { x: 30, y: 30, z: 0 }
    ];

    const line3 = createLine(coordinates3, 0x440fff5); // Red line
    scene.add(line3);


    scene.background = new THREE.Color(0xffffff);

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

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
  }, [is2D]); // Re-run the effect if is2D changes

  const toggle2D = () => {
    setIs2D((prev) => !prev); // Toggle the 2D state
  };

  return (
    <div className="app">
      <canvas ref={canvasRef} className="three-canvas"></canvas>
      <div className="overlay top-left"><h2><b>EQUAVIS</b></h2></div>
      <div 
        className="overlay top-right" 
        style={{ color: 'white',transition: 'color 0.2s ease',cursor: 'pointer' }} 
        onMouseOver={(e) => e.currentTarget.style.color = '  #9479f4  '} 
        onMouseOut={(e) => e.currentTarget.style.color = 'white'}>
          <img src="./src/assets/account.svg" alt="Logo" style={{ width: '50px', height: '35px' }} />
          <b><h3>USER</h3></b>
      </div>
      <div className="overlay bottom-left"><FunctionInput /></div>
      <div className="overlay bottom-right">
        <button onClick={toggle2D}>{is2D ? 'Switch to 3D' : 'Switch to 2D'}</button>
      </div>
    </div>
  );
};

export default App;
