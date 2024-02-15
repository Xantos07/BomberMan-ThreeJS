import {Upgrade} from "/Scripts/Upgrade/Upgrade.js";
import {ressourcesPaths} from "/Scripts/RessourcesPaths.js";
import {GameData} from "/Scripts/GameSetup.js";
import {scene} from "/Scripts/Scene.js";

class SkateDownUpgrade extends Upgrade {
    constructor(position) {
        super(position, ressourcesPaths.skateDownUpgrade);
    }

    GetUpgrade() {

        scene.remove(this.upgrade)
GameData.playerSpeed = GameData.playerSpeed*0.50;
    }
}

export {SkateDownUpgrade};