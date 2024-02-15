// Setup Game Data
//these values do not change during game execution, they are starting values.

const GameData = {
    // Grid
    //blockCountX = blockCountY
    blockCountX: 13,
    blockCountY: 13,
    blockSize: 1,
    blockRadius: 1 / 2,
    //Offset is an indicator of the difference between one's position in the world and one's position in the table
    offSet: (13 - 1) / 2,

    //Data specific for individual players / AIs
    // Player
    playerSpeed: 0.1,
    playerStartPosX: -5,
    playerStartPosY: 5,

    // AI
    aiSpeed: 0.1,
    aiStartPosX: 5,
    aiStartPosY: -5,

    //Bomb
    bombAmount : 1,
    bombRange : 2,
    //

    //Upgrade
    BombDownAmount : 2,
    BombingAmount : 2,
    BoxingGloveAmount : 2,
    FireDownAmount : 2,
    FireAmount : 2,
    SkateDownAmount : 2,
    SkateAmount : 2,
};

export {GameData};
