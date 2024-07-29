import * as t from 'three';
import './style.css';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new t.Scene();
scene.background = new t.CubeTextureLoader()
  .setPath('/background/')
  .load([
    'right.png',
    'left.png',
    'top.png',
    'bottom.png',
    'front.png',
    'back.png',
  ]);
const camera = new t.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 4;

const renderer = new t.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const earthGroup = new t.Group();
earthGroup.rotation.z = (-23.4 * Math.PI) / 100;
scene.add(earthGroup);

const loader = new t.TextureLoader();

const geometry = new t.IcosahedronGeometry(1, 16);
const material = new t.MeshStandardMaterial({
  map: loader.load('/earth-map.jpg'),
});
const earthMesh = new t.Mesh(geometry, material);
earthGroup.add(earthMesh);

const nightMat = new t.MeshBasicMaterial({
  map: loader.load('/earth-night-map.jpg'),
  blending: t.AdditiveBlending,
});
const nightMesh = new t.Mesh(geometry, nightMat);
earthGroup.add(nightMesh);

const sunLight = new t.DirectionalLight(0xffffff);
sunLight.position.set(-2, 0.5, 1);
scene.add(sunLight);

function animate() {
  renderer.render(scene, camera);

  controls.update();

  earthGroup.rotation.y += 0.002;
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', () => {
  const w = window.innerWidth;
  const h = window.innerHeight;

  camera.aspect = w / h;
  camera.updateProjectionMatrix();

  renderer.setSize(w, h);
});
