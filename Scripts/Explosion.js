import  * as THREE from '/node_modules/three/build/three.module.js'
import {scene} from "/Scripts/Scene.js";

class Explosion {
    constructor(initCooldown, position) {

        this.explosion = new THREE.Group();

        const explosionMesh = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.MeshBasicMaterial({ map:  new THREE.TextureLoader().load('/ressources/Explosion.jpg') })
        );

        explosionMesh.position.set(position.x,position.y,0);

        this.isActive = true;
        this.explosion.add(explosionMesh);
        this.lastTime = Date.now();
        this.cooldown = initCooldown;
    }

    ExplosionCoolDown() {

        const currentTime = Date.now();
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        this.cooldown -= deltaTime;

        if (this.cooldown <= 0) {
            this.isActive = false;
            scene.remove(this.explosion);
            this.explosion = null;
        }
    }
}

export { Explosion };