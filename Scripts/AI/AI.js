import * as THREE from '/node_modules/three/build/three.module.js'
import {AIContext} from '/Scripts/AI/AIContext.js';
import {IdleState} from "/Scripts/AI/IdleState.js";

//First State
let currentState = new IdleState()
let context = AIContext;

class AI {
    constructor(position) {
        this.ai = new THREE.Group();

        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({color: 0x999999})
        );

        this.ai.position.set(position.x, position.y, 0);
        this.ai.add(mesh);
    }


    AIRuntime() {

        //Detection
        //

        //RunAction
        currentState = currentState.SwitchState(context);
        currentState.Compute(context);
    }

}

export {AI};