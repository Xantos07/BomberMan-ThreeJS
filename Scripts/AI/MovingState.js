import * as THREE from '/node_modules/three/build/three.module.js'
import {State} from "/Scripts/AI/State.js";
import {Path} from "/Scripts/PathFinding/PathFinding.js";
import {tiles} from "/Scripts/Grid.js";
import {ai} from "/Scripts/GameManager.js";

class MovingState extends State {
    Compute(context) {

        //Actions of state
        //console.log("Moving state")
        const paths = Path(tiles[5 + 6][-5 + 6], tiles[-5 + 6][5 + 6]);

        context.nextPosition = paths[1];
        context.actualPosition = paths[0];

        const dirX = paths[1].x - paths[0].x;
        const dirY = paths[1].y - paths[0].y;

        const dir = new THREE.Vector3(dirX, dirY, 0);
       // console.log("dir : " + dir);
        ai.ai.position.y += dir.y * 0.01;
        ai.ai.position.x += dir.x * 0.01;

        if(IsDestination(ai.ai.position.x + 6, ai.ai.position.y+ 6, context.nextPosition.x, context.nextPosition.y)){
            context.placeBomb = true;
            console.log("Destination PLACE A BOMB !!!!")
        }
    }

    SwitchState(newState) {

        //Switch state

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