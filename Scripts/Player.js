import  * as THREE from '/node_modules/three/build/three.module.js'

function Player()
{
    const player = new THREE.Group();

    const head = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color: 0x333333 })
    );

    player.add(head);

    return player;
}
export { Player };