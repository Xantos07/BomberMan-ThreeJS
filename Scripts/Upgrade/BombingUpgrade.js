import {Upgrade} from "/Scripts/Upgrade/Upgrade.js";
import {ressourcesPaths} from "/Scripts/RessourcesPaths.js";
import {GameData} from "/Scripts/GameSetup.js";
import {scene} from "/Scripts/Scene.js";

class BombingUpgrade extends Upgrade {
    constructor(position) {
        super(position, ressourcesPaths.bombingUpgrade);
    }

    GetUpgrade() {

        scene.remove(this.upgrade)

    }
}

export {BombingUpgrade};