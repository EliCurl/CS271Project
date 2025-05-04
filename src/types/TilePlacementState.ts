import GameMap from "./GameMap";
import GameTile from "./GameTile";

export default class TilePlacementState {
    map: GameMap = new GameMap();
    state: string = "start";
    tileList: GameTile[] = [];
    pointer: GameTile = this.map.startTile;
    branchStack: GameTile[] = [];

    distanceFromIntersection: number = 0;
}