import  * as THREE from '/node_modules/three/build/three.module.js'
import {scene} from "/Scripts/Scene.js";
import {Explosion} from "/Scripts/Explosion.js";
import { addExplosion, addBomb } from "/Scripts/GameManager.js";

class Bomb {
    constructor(initCooldown, position) {

        this.bomb = new THREE.Group();

        const bombMesh = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.MeshBasicMaterial({ color: 0xEB6C68 })
        );
        bombMesh.position.set(position.x,position.y,0);

        this.isActive = true;
        this.position = bombMesh.position;
        this.bomb.add(bombMesh);
        this.lastTime = Date.now();
        this.cooldown = initCooldown;
    }

    BombCoolDown() {

        const currentTime = Date.now();
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        this.cooldown -= deltaTime;

        if (this.cooldown <= 0) {

            scene.remove(this.bomb);
            this.bomb = null;
            this.isActive = false;

            const explosionInstance  = new Explosion(2, this.position, 2);
            scene.add(explosionInstance.explosion);

            addExplosion(explosionInstance);
            addBomb();
        }
    }
}

export { Bomb };