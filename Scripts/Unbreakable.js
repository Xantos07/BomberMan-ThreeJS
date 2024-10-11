import {Block} from "/Scripts/Block.js";
import {ressourcesPaths} from "/Scripts/RessourcesPaths.js";

class UnbreakableBlock extends Block {

    constructor(position) {
        super(position, ressourcesPaths.unbreakableBlock);
    }

    //Cant destroys this
}

export {UnbreakableBlock}