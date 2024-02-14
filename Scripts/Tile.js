class Tile {

    // Coordinate, Empty, Type of block
    constructor(x, y, isEmpty, block, upgrade) {
        this.x = x;
        this.y = y;
        this.isEmpty = isEmpty;
        this.block = block;
        this.upgrade = upgrade;
    }
}

export { Tile };