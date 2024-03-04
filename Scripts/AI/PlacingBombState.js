import {State} from "/Scripts/AI/State.js";
import {MovingState} from "/Scripts/AI/MovingState.js";
import {GameData} from "/Scripts/GameSetup.js";
import {ai,pushBombs} from "/Scripts/GameManager.js";
import {tiles} from "/Scripts/Grid.js";
import {scene, renderer} from '/Scripts/Scene.js';
import {Bomb} from "/Scripts/Bomb.js";

class PlacingBombState extends State {
    Compute(context) {

        //Actions of state
        //console.log("PlacingBomb state")

        if (GameData.aiBombRange > 0) {
            let posXAround = Math.round(ai.ai.position.x) + 6;
            let posYAround = Math.round(ai.ai.position.y) + 6;

            if (tiles[posXAround][posYAround].bomb == null)
                placeBomb();
        }
    }

    SwitchState(context) {

        //Switch state

        return new MovingState();
    }
}
function placeBomb() {
    const bombInstance = new Bomb(2, ai.ai.position, GameData.bombRange, ai);

    scene.add(bombInstance.bomb);
    pushBombs(bombInstance);

    let posXAround = Math.round(ai.ai.position.x);
    let posYAround = Math.round(ai.ai.position.y);

    tiles[posXAround + 6][posYAround + 6].bomb = bombInstance;

    GameData.bombAmount = 1;
}

export {PlacingBombState}