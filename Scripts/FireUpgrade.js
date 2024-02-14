import {Upgrade} from "/Scripts/Upgrade.js";
import {ressourcesPaths} from "/Scripts/RessourcesPaths.js";
import {GameData} from "/Scripts/GameSetup.js";
import {scene} from "/Scripts/Scene.js";
import {tiles} from "/Scripts/Grid.js";

class FireUpgrade extends Upgrade {
    constructor(position) {
        super(position, ressourcesPaths.fireUpgrade);
    }

    GetUpgrade() {
        GameData.range++;
        console.log(`Fire Upgrade ! ${GameData.range}`);
        scene.remove(this.upgrade)
        tiles[this.position.x + 6][this.position.y+ 6].upgrade = null;
    }
}

export { FireUpgrade };