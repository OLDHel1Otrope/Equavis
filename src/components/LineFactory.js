import * as THREE from 'three';

export const createLine = (coordinates, color) => {
  const points = coordinates.map(coord => new THREE.Vector3(coord.x / 10, coord.y / 10, coord.z));
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color });
  const line = new THREE.Line(geometry, material);
  return line;
};
