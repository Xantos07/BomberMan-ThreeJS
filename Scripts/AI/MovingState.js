import * as THREE from '/node_modules/three/build/three.module.js'
import {State} from "/Scripts/AI/State.js";
import {Path} from "/Scripts/PathFinding/PathFinding.js";
import {tiles} from "/Scripts/Grid.js";
import {GameData} from '/Scripts/GameSetup.js';
import {ai} from "/Scripts/GameManager.js";
import {player} from "/Scripts/GameManager.js";
import {PlacingBombState} from "/Scripts/AI/PlacingBombState.js";

let paths = [];
let indexTile = 0;
class MovingState extends State {
    Compute(context) {

        //Actions of state
        //console.log("Moving state")

        const aiPosXAround = Math.round(ai.ai.position.x + 6);
        const aiPosYAround = Math.round(ai.ai.position.y + 6);

        const playerPosXAround = Math.round(player.position.x + 6);
        const playerPosYAround = Math.round(player.position.y + 6);

        //Check / tile
        if(paths.length == 0) {
            paths = Path(tiles[aiPosXAround][aiPosYAround], tiles[playerPosXAround][playerPosYAround]);
        }


        if(paths.length == 0) {
           return;
        }

        if(indexTile <= paths.length-2) {
            context.nextPosition = paths[indexTile + 1];
            context.actualPosition = paths[indexTile];

            const dirX = context.nextPosition.x - context.actualPosition.x;
            const dirY = context.nextPosition.y - context.actualPosition.y;

            const dir = new THREE.Vector3(dirX, dirY, 0);
            // console.log("dir : " + dir);
            ai.ai.position.y += dir.y * 0.01;
            ai.ai.position.x += dir.x * 0.01;

           // console.log(" paths.length : " + paths.length)

            if (IsDestination(ai.ai.position.x + 6, ai.ai.position.y + 6, context.nextPosition.x, context.nextPosition.y)) {
                indexTile++;
            }
        }else{
            if(Path(tiles[aiPosXAround][aiPosYAround], tiles[playerPosXAround][playerPosYAround]).length > 2) {
                context.placeBomb = true;
            }

            paths = [];
            indexTile = 0;
        }
    }

    SwitchState(context) {

        const aiPosXAround = Math.round(ai.ai.position.x + 6);
        const aiPosYAround = Math.round(ai.ai.position.y + 6);

        //Switch state
        if(context.placeBomb && GameData.aiBombAmount > 0 &&
            tiles[aiPosXAround][aiPosYAround].bomb == null &&
            tiles[aiPosXAround][aiPosYAround].danger == 0){

            GameData.aiBombAmount--;
            return new PlacingBombState();
        }
        return this;
    }
}

function IsDestination(actualX, actualY, nextX, nextY) {
    const aiPosition = new THREE.Vector3(actualX, actualY, 0);
    const nextPosition  = new THREE.Vector3(nextX, nextY, 0);

    const distance = nextPosition.distanceTo(aiPosition);

    return distance < 0.5;
}

export {MovingState}