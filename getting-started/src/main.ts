import * as t from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import './style.css';

const clientWidth = document.body.clientWidth;
const clientHeight = document.body.clientHeight;

const renderer = new t.WebGLRenderer({ antialias: true });
renderer.setSize(clientWidth, clientHeight);

document.body.appendChild(renderer.domElement);

const fov = 75;
const aspectRatio = clientWidth / clientHeight;
const near = 0.1;
const far = 10;
const camera = new t.PerspectiveCamera(fov, aspectRatio, near, far);
camera.position.z = 2;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.02;

const scene = new t.Scene();

const geo = new t.IcosahedronGeometry(1.0, 2);
const mat = new t.MeshStandardMaterial({
  color: 0xffffff,
  flatShading: true,
});
const mesh = new t.Mesh(geo, mat);
scene.add(mesh);

const wireMat = new t.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
const wireMesh = new t.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh);

const hemiLight = new t.HemisphereLight(0x0012ff, 0xaa3500);
scene.add(hemiLight);

function animate(t = 0) {
  mesh.rotation.y = t * 0.0001;
  renderer.render(scene, camera);
  controls.update();

  requestAnimationFrame(animate);
}

animate();
