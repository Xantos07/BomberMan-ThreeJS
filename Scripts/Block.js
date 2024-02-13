import  * as THREE from '/node_modules/three/build/three.module.js'
class Block {
    constructor(position, texturePath) {
        this.block = new THREE.Group();

        const geometry = new THREE.BoxGeometry(blockSize, blockSize, blockSize);
        const texture = new THREE.TextureLoader().load(texturePath);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const blockMesh = new THREE.Mesh(geometry, material);

        blockMesh.position.set(position.x, position.y, 0);

        this.position = blockMesh.position;
        this.block.add(blockMesh);
    }
}

export { Block };