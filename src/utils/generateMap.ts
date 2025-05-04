import TilePlacementState from "../types/TilePlacementState";
import chooseTransition from "./chooseTransition";
import tilePlacementFSM from "./tilePlacementFSM";
import { createActor } from "xstate";
import handleTransition from "./handleTransition.ts";
import TilePlacementTransition from "../types/TilePlacementTransition.ts";
import TileType from "../types/TileType.ts";


const TILE_COUNT = 30; // Number of tiles to generate
const MIN_STAR_DISTANCE = 10; // Minimum distance from the start tile to the star tile

export default function generateMap() {

    // Create State Machine
    const tilePlacementActor = createActor(tilePlacementFSM);
    tilePlacementActor.start();

    // Create new placement state
    const currentState = new TilePlacementState();
    currentState.tileList.push(currentState.map.startTile); // <-- Fix bug where start tile was not added to the list

    while (currentState.tileList.length < TILE_COUNT) {
        // Update State from State Machine
        currentState.state = tilePlacementActor.getSnapshot().value as string;

        // Update Finite State Machine with the current state
        const transition = chooseTransition(currentState) as TilePlacementTransition;

        // Handle the transition
        handleTransition(currentState, transition);

        // Update the FSM with the chosen transition
        tilePlacementActor.send({ type: transition });

        // Debugging Output
        console.log(currentState);
    }

    // Assign Star Tile
    if (Math.random() < 0.5) {
        // Loop the map back to the start tile
        currentState.pointer.arrows.push(currentState.map.startTile);

        // Choose a random tile for star with a minimum distance from the start tile
        let randomTileIndex = Math.floor(Math.random() * currentState.tileList.length);
        if (randomTileIndex < MIN_STAR_DISTANCE)
            randomTileIndex += MIN_STAR_DISTANCE;

        const randomTile = currentState.tileList[randomTileIndex];
        randomTile.type = TileType.Star;
    } else {
        // Make the last tile the star tile
        const lastTile = currentState.tileList[currentState.tileList.length - 1];
        lastTile.type = TileType.EndStar;
    }


    // Hope and pray
    console.log("done", currentState);

    return currentState;
}