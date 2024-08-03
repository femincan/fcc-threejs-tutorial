import * as t from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import spline from './spline';
import './style.css';

const w = window.innerWidth;
const h = window.innerHeight;

const renderer = new t.WebGLRenderer();
renderer.setSize(w, h);
renderer.toneMapping = t.ACESFilmicToneMapping;
renderer.outputColorSpace = t.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const scene = new t.Scene();
scene.fog = new t.FogExp2(0x000000, 0.2);

const camera = new t.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 25;
camera.position.x = 20;
camera.position.y = 10;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// const points = spline.getPoints(100);
// const geometry = new t.BufferGeometry().setFromPoints(points);
// const material = new t.LineBasicMaterial({ color: 0x00ff00 });
// const line = new t.Line(geometry, material);

const tubeGeometry = new t.TubeGeometry(spline, 222, 0.65, 16, true);
const tubeMaterial = new t.MeshBasicMaterial({
  color: 0x0099ff,
  // side: t.DoubleSide,
  wireframe: true,
});
const tubeMesh = new t.Mesh(tubeGeometry, tubeMaterial);
// scene.add(tubeMesh);

const tubeEdges = new t.EdgesGeometry(tubeGeometry, 0.2);
const tubeLineMaterial = new t.LineBasicMaterial({ color: 0xffffff });
const tubeLines = new t.LineSegments(tubeEdges, tubeLineMaterial);
scene.add(tubeLines);

function updateCamera(t: number) {
  const time = t * 0.1;
  const loopTime = 8 * 1000;
  const p = (time % loopTime) / loopTime;
  const pos = tubeGeometry.parameters.path.getPointAt(p);
  const lookAt = tubeGeometry.parameters.path.getPointAt((p + 0.03) % 1);
  camera.position.copy(pos);
  camera.lookAt(lookAt);
}

renderer.setAnimationLoop((t) => {
  renderer.render(scene, camera);
  controls.update();
  updateCamera(t);
});

window.addEventListener('resize', () => {
  const w = window.innerWidth;
  const h = window.innerHeight;

  camera.aspect = w / h;
  camera.updateProjectionMatrix();

  renderer.setSize(w, h);
});
