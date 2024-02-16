import {State} from "/Scripts/AI/State.js";

class MovingState extends State {
    Compute() {

        //Actions of state
        console.log("Moving state")
    }

    SwitchState(newState) {

        //Switch state

        return this;
    }
}

export {MovingState}