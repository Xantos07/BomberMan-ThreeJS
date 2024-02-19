import {State} from "/Scripts/AI/State.js";

class PlacingBombState extends State {
    Compute(context) {

        //Actions of state
        console.log("PlacingBomb state")
    }

    SwitchState(newState) {

        //Switch state

        return this;
    }
}

export {PlacingBombState}