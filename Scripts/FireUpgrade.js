import {Upgrade} from "/Scripts/Upgrade.js";

class FireUpgrade extends Upgrade {
    constructor(position, texturePath) {
        super(position, texturePath);
    }

    GetUpgrade() {
        console.log('Fire Upgrade!');
    }
}

export { FireUpgrade };