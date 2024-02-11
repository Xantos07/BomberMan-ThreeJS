import * as THREE from '/node_modules/three/build/three.module.js'
import {scene} from "/Scripts/Scene.js";
import {tiles, checkIsOutside} from "/Scripts/Grid.js";

class Explosion {
    constructor(initCooldown, position, range) {

        this.explosion = new THREE.Group();

        //Position
        let posXAround = Math.round(position.x);
        let posYAround = Math.round(position.y);

        console.log(posXAround, posYAround);


        for (let x = -range; x <= range; x++) {

            if (checkIsOutside((posXAround + x + 6), (position.y + 6)) ||
                !tiles[posXAround + x + 6][position.y + 6].isEmpty) {
                continue
            }

            const explosionMesh = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('/ressources/Explosion.jpg')})
            );


            let posX = posXAround + x;
            explosionMesh.position.set(posX, position.y, 0);

            this.explosion.add(explosionMesh);
        }

        for (let y = -range; y <= range; y++) {

            if (checkIsOutside((position.x + 6), (posYAround + y + 6)) ||
                !tiles[position.x + 6][posYAround + y + 6].isEmpty) {
                continue
            }

            const explosionMesh = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('/ressources/Explosion.jpg')})
            );

            let posY = posYAround + y;

            explosionMesh.position.set(position.x, posY, 0);

            this.explosion.add(explosionMesh);
        }


        this.isActive = true;
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

export {Explosion};