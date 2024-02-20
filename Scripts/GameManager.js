import * as THREE from '/node_modules/three/build/three.module.js'
import {GameData} from '/Scripts/GameSetup.js';
import {Player} from '/Scripts/Player.js';
import {AI} from '/Scripts/AI/AI.js';
import {GetMovementDirection} from '/Scripts/Input.js';
import {scene, renderer} from '/Scripts/Scene.js';
import {camera} from "/Scripts/Camera.js";
import {tiles, unbreakableBlockList} from "/Scripts/Grid.js";
import {Bomb} from "/Scripts/Bomb.js";

//Player Init
const player = Player();
player.position.set(-5, 5, 0);
scene.add(player);

//IA Init
const ai = new AI({x: 5, y: -5});
scene.add(ai.ai);

let bombs = [];
let explosions = [];

function addExplosion(explosionInstance) {
    explosions.push(explosionInstance);
}

function addBomb() {
    GameData.bombAmount++;
}

//Collision with Circle
function isPlayerCollidingElement(player, block) {
    if (block == null) return false;

    const playerPosition = new THREE.Vector3(player.position.x, player.position.y, 0);
    const blockPosition = new THREE.Vector3(block.position.x, block.position.y, 0);

    const distance = playerPosition.distanceTo(blockPosition);

    return distance < 0.5 + GameData.blockRadius;
}

//Player Action
function updatePlayer() {
    //Part of movement/action player
    if (PlayerSetCollision()) return;

    const direction = GetMovementDirection();

    switch (direction) {
        case 'up':
            player.position.y += GameData.playerSpeed;
            break;
        case 'left':
            player.position.x -= GameData.playerSpeed;
            break;
        case 'down':
            player.position.y -= GameData.playerSpeed;
            break;
        case 'right':
            player.position.x += GameData.playerSpeed;
            break;
        case 'placeBomb':
            if (GameData.bombAmount > 0) {
                let posXAround = Math.round(player.position.x) + 6;
                let posYAround = Math.round(player.position.y) + 6;

                if (tiles[posXAround][posYAround].bomb == null)
                    placeBomb();
            }
            break;

    }

}

function placeBomb() {
    const bombInstance = new Bomb(2, player.position, GameData.bombRange);

    scene.add(bombInstance.bomb);
    bombs.push(bombInstance);

    let posXAround = Math.round(player.position.x);
    let posYAround = Math.round(player.position.y);

    tiles[posXAround + 6][posYAround + 6].bomb = bombInstance;
//Calculate danger tile

    GameData.bombAmount -= 1;
}

function PlayerSetCollision() {
    for (let i = -1; i <= 1; i++) {

        let posXAround = Math.round(player.position.x);
        let posYAround = Math.round(player.position.y);
        let indexX = i + posXAround + 6;

        if (typeof unbreakableBlockList[indexX] === 'undefined') continue;


        for (let j = -1; j <= 1; j++) {

            let indexY = j + posYAround + 6;

            if (typeof unbreakableBlockList[indexX][indexY] === 'undefined') continue

            //collision with upgrade
            if (isPlayerCollidingElement(player, tiles[indexX][indexY].upgrade)) {
                tiles[indexX][indexY].upgrade.GetUpgrade();
                tiles[indexX][indexY].upgrade = null;
            }

            //collision with block
            if (isPlayerCollidingElement(player, unbreakableBlockList[indexX][indexY])) {

                player.position.x = posXAround;
                player.position.y = posYAround;

                return true;
            }
        }
    }

    return false;
}


function BombsTick() {

    bombs = bombs.filter(bomb => bomb.isActive);

    for (let i = 0; i < bombs.length; i++) {
        bombs[i].BombCoolDown();
    }
}

function ExplosionsTick() {

    explosions = explosions.filter(explosion => explosion.isActive);

    for (let i = 0; i < explosions.length; i++) {
        explosions[i].ExplosionCoolDown();
    }
}


loop();

//includes all our elements to be displayed and timed
function loop() {
    requestAnimationFrame(loop);

    updatePlayer();
    ai.AIRuntime();
    
    BombsTick();
    ExplosionsTick();

    renderer.render(scene, camera)
}

export {player,ai,addBomb, addExplosion, explosions};
