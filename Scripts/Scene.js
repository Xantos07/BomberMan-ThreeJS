import  * as THREE from '/node_modules/three/build/three.module.js'
import {camera} from "/Scripts/Camera.js";

const scene = new THREE.Scene();
const renderer  = new THREE.WebGLRenderer({canvas});
renderer.render(scene, camera);

export { scene, renderer };