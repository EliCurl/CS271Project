import GameTile from "./GameTile";
import TileType from "./TileType";

export default class GameMap {
    startTile: GameTile;

    constructor() {
        this.startTile = new GameTile();
        this.startTile.type = TileType.Start;
    }
}