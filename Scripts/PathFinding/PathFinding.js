import {checkIsOutside, tiles} from "/Scripts/Grid.js";

//Take Start Tile and Destination Tile
//returns Tiles[,] to destination or nearest destination

//Cost Tile
//G => Distance to start node
//H => Distance to ending node
//F => G + H

function getBestOpenTile(open) {
    let current = open[0];

    for (let i = 1; i < open.length; i++) {
        if (open[i].F < current.F || open[i].F == current.F) {
            if (open[i].H < current.H)
                current = open[i];
        }
    }

    return current
}

function Path(start, end) {

    const startTile= start;
    const destinationTile = end;

    const open = [];
    const close = [];

    open.push(startTile);
    let  current;
    while (open.length > 0) {

        current = getBestOpenTile(open);

        open.splice(current);
        close.push(current);

        //Return RetracePath
        if (current == destinationTile) {
            return retracePath(startTile, destinationTile);
        }
        //

        let neighbours = getNeighbours(current);

        neighbours.forEach(neighbour => {

            if (!neighbour.isEmpty || close.includes(neighbour)) {
                return; //Continue to next iteration
            }

            //console.log("neighbour : " + neighbour.x + " / " + neighbour.y)

            let costNeighbour = current.G + getDistance(current, neighbour);

            if (costNeighbour < neighbour.G || !open.includes(neighbour)) {
                neighbour.G = costNeighbour;
                neighbour.H = getDistance(neighbour, destinationTile);
                neighbour.parent = current;

                //console.log("neighbour.parent : " + neighbour.x + " / " + neighbour.y + "current : " + current.x + " / " + current.y )

                if (!open.includes(neighbour)) {
                    open.push(neighbour);
                }
            }
        });
    }

    console.log("Aucun chemin trouvé");
    return retracePath(startTile, current);
}

function retracePath(startTile, endTile) {
    let path = [];
    let currentTile = endTile;

    while (currentTile != startTile) {

        path.push(currentTile);
        currentTile = currentTile.parent;
    }

    path.push(startTile)
    path.reverse();

    //preview
   /*for (let i = 0; i < path.length; i++){
        console.log("path ", path[i].x, " / ", path[i].y)
   }*/

    return path;
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

            if (checkIsOutside((posX), (posY))) {
                break;
            }

            neightboursTile.push(tiles[posX][posY]);
        }
    }

    return neightboursTile;
}

function getDistance(nodeA, nodeB) {
    const dstX = Math.abs(nodeA.x - nodeB.y);
    const dstY = Math.abs(nodeA.x - nodeB.y);

    if (dstX > dstY) {
        return 14 * dstY + 10 * (dstX - dstY);
    }

    return 14 * dstX + 10 * (dstY - dstX);
}

//console.log(`Path(tiles[5][-5], tiles[-5][5]); : ${Path(tiles[5 + 6][-5 + 6], tiles[-5 + 6][5 + 6])}`);

export {Path}