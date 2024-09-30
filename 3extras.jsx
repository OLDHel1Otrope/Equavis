 // Create a cube
 const geometry = new THREE.BoxGeometry();
 const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
 const cube = new THREE.Mesh(geometry, material);
 // scene.add(cube);

 // camera.position.z = 5;

 const quadGeometry = new THREE.BufferGeometry();
 const outlineGeometry = new THREE.BufferGeometry();
 const vertices = [];
 const outlines = [];

 // Generating vertices and outlines (sine wave example)
 for (let i = -5; i < 5; i += 0.5) {
   for (let j = -5; j < 5; j += 0.5) {
     const z1 = Math.sin(Math.sqrt(i * i + j * j));
     const z2 = Math.sin(Math.sqrt((i + 0.5) * (i + 0.5) + j * j));
     const z3 = Math.sin(Math.sqrt((i + 0.5) * (i + 0.5) + (j + 0.5) * (j + 0.5)));
     const z4 = Math.sin(Math.sqrt(i * i + (j + 0.5) * (j + 0.5)));

     vertices.push(i, z1, j, i + 0.5, z2, j, i + 0.5, z3, j + 0.5);
     vertices.push(i, z1, j, i + 0.5, z3, j + 0.5, i, z4, j + 0.5);

     outlines.push(i, z1, j, i + 0.5, z2, j);
     outlines.push(i + 0.5, z2, j, i + 0.5, z3, j + 0.5);
     outlines.push(i + 0.5, z3, j + 0.5, i, z4, j + 0.5);
     outlines.push(i, z4, j + 0.5, i, z1, j);
   }
 }

 // Assigning geometry and materials
 quadGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
 outlineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(outlines), 3));

 const quadMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
 const mesh = new THREE.Mesh(quadGeometry, quadMaterial);
 // scene.add(mesh);

 const outlineMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
 const outlineLines = new THREE.LineSegments(outlineGeometry, outlineMaterial);
 // scene.add(outlineLines);
