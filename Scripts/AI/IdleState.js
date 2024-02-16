import {State} from "/Scripts/AI/State.js";

class IdleState extends State {
    Compute() {

        //Actions of state
        console.log("Idle state")

    }

    SwitchState(newState) {

        //Switch state

        return this;
    }
}

export {IdleState}