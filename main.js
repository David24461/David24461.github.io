import * as THREE from './three.module.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30)
camera.position.setX(-3)


//LIGHTS
const pointLight = new THREE.PointLight(0xffffff, 90)
pointLight.position.set(0, 0, 50)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)

scene.add(pointLight)
scene.add(ambientLight)

//HELPERS
// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50)
// const axesHelper = new THREE.AxesHelper(20, 20, 20)
// scene.add(lightHelper, gridHelper, axesHelper)

const geoPog = new THREE.CylinderGeometry(20.37, 20.37, 3, 50)
const texturePog = new THREE.TextureLoader().load('eevee.png');
const matPog = new THREE.MeshStandardMaterial(
  {
    color: 0xFFFFFF,
    wireframe: false,
    map: texturePog,
  }
);
const pog = new THREE.Mesh( geoPog, matPog);
pog.rotation.x = 45;

scene.add(pog);
pog.scale.set(0.1, 0.1, 0.1)


function newStar() {
  const gemometry = new THREE.SphereGeometry(0.5, 24, 24);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff })
  const star = new THREE.Mesh(gemometry, material);
  const x = THREE.MathUtils.randFloatSpread(400)
  const y = THREE.MathUtils.randFloatSpread(300)
  const z = THREE.MathUtils.randFloatSpread(100)
  star.position.set(x, y - 25, z - 100);
  scene.add(star);
}
Array(200).fill().forEach(newStar);

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: moonTexture,
    nomralMap: normalTexture
  })
)

scene.add(moon)
moon.position.z = 30;
moon.position.setX(-10);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  pog.rotation.x += 0.01;
  pog.rotation.y += 0.013;
  pog.rotation.z += 0.01;


  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera
moveCamera();


const spaceTexture = new THREE.TextureLoader().load('space.jpg')
scene.background = spaceTexture;


function animate(time) {
  requestAnimationFrame( animate );

  pog.rotation.x += 0.01;
  // pog.rotation.y += 0.005;
  pog.rotation.z += 0.01;

  renderer.render( scene, camera );
}

animate();