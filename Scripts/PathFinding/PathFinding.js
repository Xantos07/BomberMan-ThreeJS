import {tiles} from "/Scripts/Grid.js";

//Take Start Tile and Destination Tile
//returns Tiles[,] to destination or nearest destination

function Path(start, end){

    let paths = [,];
    let queue = [];
    let range = 1;

    queue.push(start);

    const directions = [
        { dirX: 1, dirY: 0 },  // Right
        { dirX: -1, dirY: 0 }, // Left
        { dirX: 0, dirY: 1 },  // Up
        { dirX: 0, dirY: -1 }  // Down
    ];

    for (const dir of directions) {
        let dirX = dir.dirX + queue[0].x + range;
        let dirY = dir.dirY + queue[0].y + range;

        console.log(" DIRECTION TO START : ", dirX , " /// " , dirY);
    }


    return paths;
}

console.log(`Path(tiles[5][-5], tiles[-5][5]); : ${ Path(tiles[5+6][-5+6], tiles[-5+6][5+6]) }`);

export {Path}