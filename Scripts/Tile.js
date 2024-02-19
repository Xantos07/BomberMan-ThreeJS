class Tile {

    // Coordinate, Empty, Type of block
    constructor(x, y, isEmpty, block, upgrade) {
        this.x = x;
        this.y = y;
        this.isEmpty = isEmpty;
        this.block = block;
        this.upgrade = upgrade;
        this.bomb = null; //The variable checks whether a bomb is present => Upgrade Bomb / Dijkstra algorithme

        this.G = 1;
        this.H = 1;
        this.F = this.G + this.H;
        this.parent = null;
    }
}

export { Tile };