import {State} from "/Scripts/AI/State.js";
import {MovingState} from "/Scripts/AI/MovingState.js";

class IdleState extends State {
    Compute(context) {

        //Actions of state
        console.log("Idle state")

    }

    SwitchState(context) {

        //Switch state
        //if()
        return new MovingState();

        return this;
    }
}

export {IdleState}