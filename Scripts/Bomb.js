import  * as THREE from '/node_modules/three/build/three.module.js'
import {scene} from "/Scripts/Scene.js";
import {Explosion} from "/Scripts/Explosion.js";
import {addExplosion, addBomb, player} from "/Scripts/GameManager.js";
import {checkIsOutside, tiles} from "/Scripts/Grid.js";

class Bomb {
    constructor(initCooldown, position, range) {

        this.bomb = new THREE.Group();

        const bombMesh = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.MeshBasicMaterial({ color: 0xEB6C68 })
        );
        bombMesh.position.set(position.x,position.y,0);

        this.posXAround = Math.round(position.x);
        this.posYAround = Math.round(position.y);

        this.range = range;
        this.isActive = true;
        this.position = bombMesh.position;
        this.bomb.add(bombMesh);
        this.lastTime = Date.now();
        this.cooldown = initCooldown;
        this.initCooldown = initCooldown;
        this.tilesDanger = [];

        //Calculate danger tile
        const directions = [
            { dirX: 1, dirY: 0 },  // Right
            { dirX: -1, dirY: 0 }, // Left
            { dirX: 0, dirY: 1 },  // Up
            { dirX: 0, dirY: -1 }  // Down
        ];

        for (const dir of directions) {
            let dirX = dir.dirX;
            let dirY = dir.dirY;

            for (let i = 0; i <= range; i++) {
                const posX = this.posXAround + 6 + dirX * i;
                const posY = this.posYAround + 6 + dirY * i;

                if (checkIsOutside((posX), (posY))) {
                    break;
                }

                this.tilesDanger.push(tiles[posX,posY]);
            }
        }
    }

    BombCoolDown() {

        const currentTime = Date.now();
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        this.cooldown -= deltaTime;

        //4 => danger max
        let danger = (1 - this.cooldown / this.initCooldown) * 4 ;

        this.tilesDanger.forEach(tile => {tile.danger = danger ;});

        if (this.cooldown <= 0) {

            scene.remove(this.bomb);
            this.bomb = null;
            this.isActive = false;

            tiles[this.posXAround + 6][this.posYAround+ 6].bomb = null;

            const explosionInstance  = new Explosion(2, this.position, this.range);
            scene.add(explosionInstance.explosion);

            addExplosion(explosionInstance);
            addBomb();
        }
    }
}

export { Bomb };