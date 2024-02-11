import  * as THREE from '/node_modules/three/build/three.module.js'

const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 25;
const cameraHeight =cameraWidth / aspectRatio;

const camera = new THREE.OrthographicCamera(
    cameraWidth / -2,
    cameraWidth / 2,
    cameraHeight / 2,
    cameraHeight / -2,
    0,
    1000
);

//camera.position.set(200,-200,300);
camera.position.set(0,-90,300);
camera.up.set(0,0,1);
camera.lookAt(0,0,0);

export { camera };