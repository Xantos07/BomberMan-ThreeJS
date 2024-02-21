class Tile {

    // Coordinate, Empty, Type of block
    constructor(x, y, isEmpty, block, upgrade) {
        this.x = x;
        this.y = y;
        this.isEmpty = isEmpty;
        this.block = block;
        this.upgrade = upgrade;
        this.bomb = null; //The variable checks whether a bomb is present => Upgrade Bomb / Dijkstra algorithme
        this.explosion = null; //Explosion = Death
        this.danger = 0; //0 to 4 // 0 = safe, 4 = death

        this.G = 0;
        this.H = 0;
        this.F = 0;
        this.parent = null;
    }
}

export { Tile };