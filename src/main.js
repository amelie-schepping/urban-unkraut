import * as THREE from "three";
import { ARButton } from "three/examples/jsm/webxr/ARButton.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera();

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);
document.body.appendChild(
  ARButton.createButton(renderer, { requiredFeatures: ["hit-test"] })
);

const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
scene.add(light);

const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, -0.5);
scene.add(cube);

renderer.setAnimationLoop(() => {
  renderer.render(scene, camera);
});
