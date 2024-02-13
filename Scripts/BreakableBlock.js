import {Block} from "/Scripts/Block.js";
import {scene} from "/Scripts/Scene.js";
class BreakableBlock extends Block {

    constructor(position) {
        super(position, '/ressources/breakableBlock.jpg');
    }

    //Destroy
    Break() {
        scene.remove(this.block);
    }
}

export {BreakableBlock}