import {Upgrade} from "/Scripts/Upgrade/Upgrade.js";
import {ressourcesPaths} from "/Scripts/RessourcesPaths.js";
import {GameData} from "/Scripts/GameSetup.js";
import {scene} from "/Scripts/Scene.js";

class BombDownUpgrade extends Upgrade {
    constructor(position) {
        super(position, ressourcesPaths.bombDownUpgrade);
    }

    GetUpgrade() {

        scene.remove(this.upgrade)
        GameData.bombAmount--;
    }
}

export {BombDownUpgrade};