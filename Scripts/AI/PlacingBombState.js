import {State} from "/Scripts/AI/State.js";
import {MovingState} from "/Scripts/AI/MovingState.js";

class PlacingBombState extends State {
    Compute(context) {

        //Actions of state
        console.log("PlacingBomb state")
    }

    SwitchState(context) {

        //Switch state

        return new MovingState();
    }
}

export {PlacingBombState}