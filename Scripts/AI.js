import  * as THREE from '/node_modules/three/build/three.module.js'

function AI()
{
    const ai = new THREE.Group();

    const head = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color: 0x999999 })
    );

    ai.add(head);

    return ai;
}
export { AI };