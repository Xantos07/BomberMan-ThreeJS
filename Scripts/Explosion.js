import * as THREE from '/node_modules/three/build/three.module.js'
import {scene} from "/Scripts/Scene.js";
import {ressourcesPaths} from "/Scripts/RessourcesPaths.js";
import {tiles, checkIsOutside, unbreakableBlockList} from "/Scripts/Grid.js";
import {BreakableBlock} from "/Scripts/BreakableBlock.js";
import {UnbreakableBlock} from "/Scripts/Unbreakable.js";

class Explosion {
    constructor(initCooldown, position, range) {

        this.explosion = new THREE.Group();

        //Position
        let posXAround = Math.round(position.x);
        let posYAround = Math.round(position.y);

        console.log(posXAround, posYAround);

        //Create cross shape explosion
        const directions = [
            { dirX: 1, dirY: 0 },  // Right
            { dirX: -1, dirY: 0 }, // Left
            { dirX: 0, dirY: 1 },  // Up
            { dirX: 0, dirY: -1 }  // Down
        ];


        this.isActive = true;
        this.lastTime = Date.now();
        this.cooldown = initCooldown;
        this.tilesDanger = [];

        for (const dir of directions) {
            let dirX = dir.dirX;
            let dirY = dir.dirY;

            for (let i = 0; i <= range; i++) {
                const posX = posXAround + dirX * i;
                const posY = posYAround + dirY * i;

                if (checkIsOutside((posX + 6), (posY + 6))) {
                    break;
                }

                const tile = tiles[posX + 6][posY + 6];

                if (tile.block instanceof UnbreakableBlock) {
                    break;
                }

                if (tile.block instanceof BreakableBlock && !tile.isEmpty) {
                    //Refresh View
                    tile.block.Break();

                    //Refresh Data
                    tiles.isEmpty = true;
                    tiles[tile.x][tile.y].block = null;
                    unbreakableBlockList[tile.x][tile.y] = null;
                    this.tilesDanger.push(tiles[tile.x][tile.y]);
                    break;
                }

                const explosionMesh = new THREE.Mesh(
                    new THREE.BoxGeometry(1, 1, 1),
                    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(ressourcesPaths.explosion) })
                );

                explosionMesh.position.set(posX, posY, 0);
                this.explosion.add(explosionMesh);
            }
        }
    }

    ExplosionCoolDown() {

        const currentTime = Date.now();
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        this.cooldown -= deltaTime;

        if (this.cooldown <= 0) {

            this.tilesDanger.forEach((tile) => {tile.danger = 0})

            this.isActive = false;
            scene.remove(this.explosion);
            this.explosion = null;
        }
    }
}

export {Explosion};