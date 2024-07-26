import * as t from 'three';
import './style.css';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';

const w = document.body.clientWidth;
const h = document.body.clientHeight;
const scene = new t.Scene();
const camera = new t.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;

const renderer = new t.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);

document.body.appendChild(renderer.domElement);

const controls = new TrackballControls(camera, renderer.domElement);
controls.rotateSpeed = 10;

const geometry = new t.IcosahedronGeometry(1, 12);
const material = new t.MeshStandardMaterial({
  color: 0xffff00,
});
const earthMesh = new t.Mesh(geometry, material);
scene.add(earthMesh);

const hemiLight = new t.HemisphereLight(0xffffff, 0x444444);
scene.add(hemiLight);

function animate() {
  renderer.render(scene, camera);
  controls.update();

  requestAnimationFrame(animate);
}

animate();
