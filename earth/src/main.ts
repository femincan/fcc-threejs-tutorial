import * as t from 'three';
import './style.css';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { getStarfield } from './utils';

const w = document.body.clientWidth;
const h = document.body.clientHeight;
const scene = new t.Scene();
const camera = new t.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 4;

const renderer = new t.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);

document.body.appendChild(renderer.domElement);

const controls = new TrackballControls(camera, renderer.domElement);
controls.rotateSpeed = 1;

const earthGroup = new t.Group();
earthGroup.rotation.z = (-23.4 * Math.PI) / 100;
scene.add(earthGroup);

const loader = new t.TextureLoader();

const geometry = new t.IcosahedronGeometry(1, 12);
const material = new t.MeshStandardMaterial({
  map: loader.load('/earth-map.jpg'),
});
const earthMesh = new t.Mesh(geometry, material);
earthGroup.add(earthMesh);

const stars = getStarfield();
scene.add(stars);

const sunLight = new t.DirectionalLight(0xffffff);
sunLight.position.set(-2, 0.5, 1);
scene.add(sunLight);

function animate() {
  renderer.render(scene, camera);
  controls.update();
  earthMesh.rotation.y += 0.002;

  requestAnimationFrame(animate);
}

animate();
