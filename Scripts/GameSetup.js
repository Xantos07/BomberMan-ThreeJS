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

    // Player
    playerStartPosX: -5,
    playerStartPosY: 5,

    // AI
    aiStartPosX: 5,
    aiStartPosY: -5,

    //Bomb
    range : 2
};

export {GameData};
