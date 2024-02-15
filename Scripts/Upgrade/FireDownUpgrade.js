import {Upgrade} from "/Scripts/Upgrade/Upgrade.js";
import {ressourcesPaths} from "/Scripts/RessourcesPaths.js";
import {GameData} from "/Scripts/GameSetup.js";
import {scene} from "/Scripts/Scene.js";

class FireDownUpgrade extends Upgrade {
    constructor(position) {
        super(position, ressourcesPaths.fireDownUpgrade);
    }

    GetUpgrade() {

        GameData.bombRange--;
        scene.remove(this.upgrade)

    }
}

export { FireDownUpgrade };