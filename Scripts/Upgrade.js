//Effects List :

/*
1 - Fire - Increase bomb blast radius.
2 - Fire Down - Decrease bomb blast radius.

3 - Bombing - Increase the number of bombs that can be placed at the same time.
4 - Bomb Down - Decrease the number of bombs that can be placed at the same time. >=1

5 - Skate - Increase the player's speed.
6 - Geta/Accelerate Down - Decrease the player's movement speed.

7 - Boxing Glove - Bombs that bounce back when kicked, punched or shot.
*/

import  * as THREE from '/node_modules/three/build/three.module.js'


class Upgrade {
    constructor(position, texturePath) {
        this.upgrade = new THREE.Group();

        const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
        const texture = new THREE.TextureLoader().load(texturePath);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const upgradeMesh = new THREE.Mesh(geometry, material);

        upgradeMesh.position.copy(position);

        this.position = upgradeMesh.position;
        this.upgrade.add(upgradeMesh);
    }
}

export { Upgrade };