// Setup Game Data
//these values do not change during game execution, they are starting values.

// Grid
const blockCountX = 13; //blockCountX = blockCountY
const blockCountY = 13;
const blockSize = 1;
const blockRadius = blockSize / 2;
const offSet = (blockCountX - 1) / 2; //Offset is an indicator of the difference between one's position in the world and one's position in the table

// Player
const playerStartPosX = -5;
const playerStartPosY = 5;

//AI
const aiStartPosX = 5;
const aiStartPosY = -5;