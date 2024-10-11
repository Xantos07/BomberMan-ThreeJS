import {checkIsOutside, tiles} from "/Scripts/Grid.js";
import * as THREE from '/node_modules/three/build/three.module.js'
import {scene, renderer} from '/Scripts/Scene.js';

//Take Start Tile and Destination Tile
//returns Tiles[,] to destination or nearest destination

//Cost Tile
//G => Distance to start node
//H => Distance to ending node
//F => G + H

let drawTiles = []

function getBestOpenTile(open) {

    let current = open[0];

    for (let i = 1; i < open.length; i++)
    {
        open[i].F = open[i].G + open[i].H;
        current.F = current.G + current.H;

        if (open[i].F <= current.F) {
            if (open[i].H < current.H)
                current = open[i];
        }
    }

    return current
}

function Path(start, end) {

    resetTilePath();
    drawTiles.forEach((drawTile) => {scene.remove(drawTile)})

    const startTile= start;
    const destinationTile = end;

    const open = [];
    const close = [];

    open.push(startTile);
    let  current;

    while (open.length > 0) {

        current = getBestOpenTile(open);

        open.splice(open.indexOf(current), 1);
        close.push(current);

        //Return RetracePath
        if (current == destinationTile) {
            return retracePath(startTile, destinationTile);
        }
        //

        let neighbours = getNeighbours(current);

        for (let i = 0; i < neighbours.length; i++) {

            // isEmpyt est toujours faux lorsque c est l ia !!
            if (!neighbours[i].isEmpty || neighbours[i].danger >= 0.1 || neighbours[i].bomb || close.includes(neighbours[i])) {
                continue;
            }

            let costNeighbour = current.G + getDistance(current, neighbours[i]);

            if (costNeighbour <= neighbours[i].G || !open.includes(neighbours[i])) {
                neighbours[i].G = costNeighbour;
                neighbours[i].H = getDistance(neighbours[i], destinationTile);
                neighbours[i].F = neighbours[i].G + neighbours[i].H;
                neighbours[i].parent = current;


                const block = new THREE.Mesh(
                    new THREE.BoxGeometry(0.1, 0.1, 0.1),
                    new THREE.MeshBasicMaterial({ color: 0xFFFF00 })
                );
                block.position.set(neighbours[i].x-6, neighbours[i].y-6, 0);
                drawTiles.push(block);
                scene.add(block);

                if (!open.includes(neighbours[i])) {

                    open.push(neighbours[i]);
                }
            }
        }
    }

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

   for (let i = 0; i < path.length; i++){

       const block = new THREE.Mesh(
           new THREE.BoxGeometry(0.2, 0.2, 0.2),
           new THREE.MeshBasicMaterial({ color: 0xFF0000 })
       );
       block.position.set(path[i].x-6, path[i].y-6, 0);
       drawTiles.push(block);
       scene.add(block);
   }

    return path;
}

function getNeighbours(tile) {

    const neightboursTile = [];

    const directions = [
        {dirX: 1, dirY: 0},  // Right
        {dirX: -1, dirY: 0}, // Left
        {dirX: 0, dirY: 1},  // Up
        {dirX: 0, dirY: -1},  // Down
    ];

    for (const dir of directions) {
        let dirX = dir.dirX;
        let dirY = dir.dirY;

            const posX = tile.x + dirX;
            const posY = tile.y + dirY;

            if (checkIsOutside((posX), (posY))) {
                break;
            }

            neightboursTile.push(tiles[posX][posY]);

    }

    return neightboursTile;
}

function getDistance(nodeA, nodeB) {
    const dstX = Math.abs(nodeA.x - nodeB.x);
    const dstY = Math.abs(nodeA.y - nodeB.y);

    if (dstX > dstY) {
        return 14 * dstY + 10 * (dstX - dstY);
    }

    return 14 * dstX + 10 * (dstY - dstX);
}

function resetTilePath(){
    tiles.forEach(tile => {
       tile.F = 0;
       tile.G = 0;
       tile.H = 0;
    });
}

//console.log(`Path(tiles[5][-5], tiles[-5][5]); : ${Path(tiles[5 + 6][-5 + 6], tiles[-5 + 6][5 + 6])}`);

export {Path}