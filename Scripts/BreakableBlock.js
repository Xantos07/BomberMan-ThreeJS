import {Block} from "/Scripts/Block.js";
import {scene} from "/Scripts/Scene.js";
import {ressourcesPaths} from "/Scripts/RessourcesPaths.js";
class BreakableBlock extends Block {

    constructor(position) {
        super(position, ressourcesPaths.breakableBlock);
    }

    //Destroy
    Break() {
        scene.remove(this.block);
    }
}

export {BreakableBlock}