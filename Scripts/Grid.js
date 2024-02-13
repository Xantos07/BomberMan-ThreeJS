import  * as THREE from '/node_modules/three/build/three.module.js'
import { scene } from '/Scripts/Scene.js';
import {Tile} from "/Scripts/Tile.js";

const light = new THREE.PointLight(0xeeeeee);
scene.add(light);
light.position.set(0,0,2);

const blockCountX = 13;
const blockCountY = 13;
const blockSize = 1;

const tiles = [,];
const unbreakableBlockList = [,];
const emptySpace = [];

for (let x = 0; x < blockCountX; x++){
    tiles[x] = [];
    for (let y = 0; y < blockCountX; y++){
        const tileInstance  = new Tile(x,y, false);
        tiles[x][y] = tileInstance;
        tiles[x][y].isEmpty = true;
    }
}

for (let i = 0; i < blockCountX; i++)
{
    unbreakableBlockList[i] = [];
    for (let j = 0; j < blockCountY; j++)
    {
        if(i > 0 && i < blockCountX-1 && j > 0 && j < blockCountY-1)
        {
            emptySpace.push([i,j])
            continue
        }

        const geometry = new THREE.BoxGeometry(blockSize, blockSize, blockSize);
        const texture = new THREE.TextureLoader().load('/ressources/stone.jpg');
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.set((i * blockSize - (blockCountX * blockSize) / 2) + 0.5, (j * blockSize - (blockCountY * blockSize) / 2) + 0.5, 0);
        unbreakableBlockList[i][j] = mesh;

        tiles[i][j].isEmpty = false;

        scene.add(mesh);
    }
}

for (let i = 1; i < blockCountX; i++)
{
    for (let j = 1; j < blockCountY; j++)
    {
        if(i < 1 || i > blockCountX-3 || j < 1 || j > blockCountX-3)
        {
            continue
        }

        if(i % 2 && j % 2)
        {
            const geometry = new THREE.BoxGeometry(blockSize, blockSize, blockSize);
            const texture = new THREE.TextureLoader().load('/ressources/stone.jpg');
            const material = new THREE.MeshBasicMaterial({ map: texture });
            const mesh = new THREE.Mesh(geometry, material);

            mesh.position.set((i * blockSize - (blockCountX * blockSize) / 2) + 1.5, (j * blockSize - (blockCountY * blockSize) / 2)+ 1.5, 0);

            //+ 1 par rapport a + 1.5 (servant a centrer la grid)
            unbreakableBlockList[i+ 1][j + 1] = mesh;

            const indexToRemove = emptySpace.findIndex(coord => coord[0] === i+ 1 && coord[1] === j+ 1);
            if (indexToRemove !== -1) {
                emptySpace.splice(indexToRemove, 1);
            }

            tiles[i+ 1][j + 1].isEmpty = false;
            scene.add(mesh);
            continue
        }
    }
}

//remove  breakable blocks in spawn
//PLAYER
emptySpace.splice(emptySpace.findIndex(coord => coord[0] === 1 && coord[1] === 11), 1);
emptySpace.splice(emptySpace.findIndex(coord => coord[0] === 2 && coord[1] === 11), 1);
emptySpace.splice(emptySpace.findIndex(coord => coord[0] === 1 && coord[1] === 10), 1);
//AI
emptySpace.splice(emptySpace.findIndex(coord => coord[0] === 11 && coord[1] === 1), 1);
emptySpace.splice(emptySpace.findIndex(coord => coord[0] === 11 && coord[1] === 2), 1);
emptySpace.splice(emptySpace.findIndex(coord => coord[0] === 10 && coord[1] === 1), 1);

let nbBloc = Math.floor(emptySpace.length * 0.75)
//Creation breakable blocks
while (nbBloc > 0) {

    const randomIndex = Math.floor(Math.random() * emptySpace.length);
    const randomElement = emptySpace[randomIndex];

    const geometry = new THREE.BoxGeometry(blockSize, blockSize, blockSize);
    const texture = new THREE.TextureLoader().load('/ressources/breakableBlock.jpg');
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set((randomElement[0] * blockSize - (blockCountX * blockSize) / 2) + 0.5, (randomElement[1] * blockSize - (blockCountY * blockSize) / 2)+ 0.5, 0);
    scene.add(mesh);

    nbBloc -= 1
    unbreakableBlockList[randomElement[0]][randomElement[1]] = mesh;
    //
    const indexToRemove = emptySpace.findIndex(coord => coord[0] === randomElement[0] && coord[1] === randomElement[1]);
    if (indexToRemove !== -1) {
        emptySpace.splice(indexToRemove, 1);
    }

    tiles[randomElement[0]][randomElement[1]].isEmpty = false;
    console.log(emptySpace.length)
}

function checkIsOutside(x,y){
    if(x < 0 || y < 0 || x >= blockCountX || y >= blockCountY){
        return true;
    }

    return false;
}

export {unbreakableBlockList, tiles, checkIsOutside};


