import GameTile from "./GameTile";
import TileType from "./TileType.ts";
import seedrandom from "seedrandom";

export default class TilePlacementState {

    // Map state
    startTile: GameTile;
    tileList: GameTile[];

    // Generation state
    state: string = "start";
    pointer: GameTile;
    branchStack: GameTile[] = [];
    distanceFromIntersection: number = 0;
    random: seedrandom.PRNG;

    /**
     * Get a seeded random number between 0 (inclusive) and 1 (exclusive) using PRNG.
     * @returns {number} A random number between 0 and 1.
     */
    getRandom(): number {
        return this.random();
    }

    constructor(seed: number) {
        this.startTile = new GameTile(TileType.Start);
        this.tileList = [this.startTile];
        this.pointer = this.startTile;
        this.random = seedrandom(seed.toString());
    }
}