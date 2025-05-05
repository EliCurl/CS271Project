import GameTile from "./GameTile";
import TileType from "./TileType.ts";

export default class TilePlacementState {

    // Map state
    startTile: GameTile;
    tileList: GameTile[];

    // Generation state
    state: string = "start";
    pointer: GameTile;
    branchStack: GameTile[] = [];
    distanceFromIntersection: number = 0;

    constructor() {
        this.startTile = new GameTile(TileType.Start);
        this.tileList = [this.startTile];
        this.pointer = this.startTile;
    }
}