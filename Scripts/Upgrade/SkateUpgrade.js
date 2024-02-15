import {Upgrade} from "/Scripts/Upgrade/Upgrade.js";
import {ressourcesPaths} from "/Scripts/RessourcesPaths.js";
import {GameData} from "/Scripts/GameSetup.js";
import {scene} from "/Scripts/Scene.js";

class SkateUpgrade extends Upgrade {
    constructor(position) {
        super(position, ressourcesPaths.skateUpUpgrade);
    }

    GetUpgrade() {

        scene.remove(this.upgrade)
        GameData.playerSpeed = GameData.playerSpeed*1.50;
    }
}

export { SkateUpgrade };