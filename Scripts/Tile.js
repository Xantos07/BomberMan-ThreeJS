class Tile {

    // Coordinate, Empty, Type of block
    constructor(x, y, isEmpty, block) {
        this.x = x;
        this.y = y;
        this.isEmpty = isEmpty;
        this.block = block;
    }
}

export { Tile };