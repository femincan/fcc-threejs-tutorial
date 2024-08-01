import * as t from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './style.css';

const w = window.innerWidth;
const h = window.innerHeight;

const renderer = new t.WebGLRenderer();
renderer.setSize(w, h);
renderer.toneMapping = t.ACESFilmicToneMapping;
renderer.outputColorSpace = t.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const scene = new t.Scene();

const camera = new t.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 2;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const ambientLight = new t.AmbientLight();
scene.add(ambientLight);

renderer.setAnimationLoop(() => {
  renderer.render(scene, camera);
  controls.update();
});

window.addEventListener('resize', () => {
  const w = window.innerWidth;
  const h = window.innerHeight;

  camera.aspect = w / h;
  camera.updateProjectionMatrix();

  renderer.setSize(w, h);
});
