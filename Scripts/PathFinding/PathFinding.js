import {checkIsOutside, tiles} from "/Scripts/Grid.js";

//Take Start Tile and Destination Tile
//returns Tiles[,] to destination or nearest destination

//Cost Tile
//G => Distance to start node
//H => Distance to ending node
//F => G + H
function Path(start, end) {

    const startNode = start;
    const destinationNode = end;

    const open = [];
    const close = [];

    open.push(startNode);

    while (open.length > 0) {

        let current = open[0];

        for (let i = 1; i < open.length; i++) {
            if (open[i].F < current.F || open[i].F == current.F) {
                if (open[i].H < current.H)
                    current = open[i];
            }
        }

        open.splice(current);
        close.push(current);

        //Return RetracePath

        let neighbours = getNeighbours(current);

        neighbours.forEach(neighbour => {
            if(!neighbour.isEmpty || neighbours.includes(neighbour))
            {
                return;
            }
        });
    }
}

function getNeighbours(tile) {

    const neightboursTile = [];

    const directions = [
        {dirX: 1, dirY: 0},  // Right
        {dirX: -1, dirY: 0}, // Left
        {dirX: 0, dirY: 1},  // Up
        {dirX: 0, dirY: -1}  // Down
    ];

    for (const dir of directions) {
        let dirX = dir.dirX;
        let dirY = dir.dirY;

        for (let i = 0; i <= 1; i++) {
            const posX = tile.x + dirX * i;
            const posY = tile.y + dirY * i;

            if (checkIsOutside((posX + 6), (posY + 6))) {
                break;
            }

            neightboursTile.push(tiles[posX + 6][posY + 6]);
        }
    }

    return neightboursTile;
}

console.log(`Path(tiles[5][-5], tiles[-5][5]); : ${Path(tiles[5 + 6][-5 + 6], tiles[-5 + 6][5 + 6])}`);

export {Path}