import * as THREE from '/node_modules/three/build/three.module.js'
import {State} from "/Scripts/AI/State.js";
import {Path} from "/Scripts/PathFinding/PathFinding.js";
import {tiles} from "/Scripts/Grid.js";
import {ai} from "/Scripts/GameManager.js";
import {player} from "/Scripts/GameManager.js";
import {PlacingBombState} from "/Scripts/AI/PlacingBombState.js";

let paths = [];
let indexTile = 0;
class MovingState extends State {
    Compute(context) {

        //Actions of state
        //console.log("Moving state")
        console.log("Moving state")
        const aiPosXAround = Math.round(ai.ai.position.x + 6);
        const aiPosYAround = Math.round(ai.ai.position.y + 6);
        const playerPosXAround = Math.round(player.position.x + 6);
        const playerPosYAround = Math.round(player.position.y + 6);

        if(paths <= 2)
            paths = Path(tiles[aiPosXAround][aiPosYAround], tiles[playerPosXAround][playerPosYAround]);

        if(indexTile <= paths.length-2) {
            context.nextPosition = paths[1 + indexTile];
            context.actualPosition = paths[0 + indexTile];

            const dirX = paths[1 + indexTile].x - paths[0 + indexTile].x;
            const dirY = paths[1 + indexTile].y - paths[0 + indexTile].y;

            const dir = new THREE.Vector3(dirX, dirY, 0);
            // console.log("dir : " + dir);
            ai.ai.position.y += dir.y * 0.01;
            ai.ai.position.x += dir.x * 0.01;

            console.log(" paths.length : " + paths.length)

            if (IsDestination(ai.ai.position.x + 6, ai.ai.position.y + 6, context.nextPosition.x, context.nextPosition.y)) {
                indexTile++;
            }
        }else{
            context.placeBomb = true;
            paths.slice();
        }
    }

    SwitchState(context) {

        //Switch state
        if( context.placeBomb){
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