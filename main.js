import * as THREE from 'three';
//Starting postition of the images from the top
const STARTY = -2;

//Create a new scene
const scene = new THREE.Scene();

//Create and posistion the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = STARTY
camera.position.z = 30;
camera.position.x = 15;

//Create list of images in the 'img' folder
let imgList = [
    'classpic.png',
    'cert.png',
    'cert2.png'
]


//Add every listed image as a plane mesh with texture to scene
for (const image in imgList) {
    //Every mesh has a geometry, texture, and material
    const geometry = new THREE.PlaneGeometry(25, 20);
    const texture = new THREE.TextureLoader().load(imgList[image])
    const material = new THREE.MeshBasicMaterial(
        {
            // color: 0xffff00,
            side: THREE.DoubleSide,
            map: texture // add the texture image here
        }
    );
    const plane = new THREE.Mesh(geometry, material);
    plane.position.x = -10
    //add the new plane to the scene
    scene.add(plane);
}

// Move the camera with the scrollbar
function moveCamera() {
    const top = document.body.getBoundingClientRect().top;
    camera.position.y = STARTY + top * 0.05;
}
//add scrollbar event to move camera
document.body.onscroll = moveCamera;

// resize the threejs canvas with the window
// and adjust for phone sizes
function resizeWindow() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // adjust for phone or desktop size
    if (window.innerWidth <= 600) {
        camera.position.x = 0;
        for (const child in scene.children) {
            scene.children[child].rotation.y = 0;
            scene.children[child].position.y = child * -50;
        }
    } else {
        camera.position.x = 15;
        for (const child in scene.children) {
            scene.children[child].rotation.y = 15 * (Math.PI / 180);
            scene.children[child].position.y = child * -27;
        }
    };

};

// resize canvas on window resize
window.addEventListener('resize', resizeWindow, false);

// creat the renderer and attach to the canvas
const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#bg')
}
);
// set initial canvas size
resizeWindow();

// set renderer size and add it to the page
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// animation loop (calls itself recursively)
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera)
}

 //start the animation
animate();