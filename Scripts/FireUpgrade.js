import {Upgrade} from "/Scripts/Upgrade.js";
import {ressourcesPaths} from "/Scripts/RessourcesPaths.js";

class FireUpgrade extends Upgrade {
    constructor(position) {
        super(position, ressourcesPaths.fireUpgrade);
    }

    GetUpgrade() {
        console.log('Fire Upgrade!');
    }
}

export { FireUpgrade };