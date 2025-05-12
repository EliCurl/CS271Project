import TilePlacementState from "../types/TilePlacementState";
import chooseTransition from "./chooseTransition";
import tilePlacementFSM from "./tilePlacementFSM";
import {createActor} from "xstate";
import handleTransition from "./handleTransition.ts";
import TilePlacementTransition from "../types/TilePlacementTransition.ts";
import TileType from "../types/TileType.ts";
import GameSettings from "../types/GameSettings.ts";

export default function generateMap(settings: GameSettings) {

    // Create State Machine
    const tilePlacementActor = createActor(tilePlacementFSM);
    tilePlacementActor.start();

    // Create new placement state
    const currentState = new TilePlacementState();

    while (currentState.tileList.length < settings.nodeCount) {
        // Update State from State Machine
        currentState.state = tilePlacementActor.getSnapshot().value as string;

        // Update Finite State Machine with the current state
        const transition = chooseTransition(currentState, settings) as TilePlacementTransition;

        // Handle the transition
        handleTransition(currentState, transition);

        // Update the FSM with the chosen transition
        tilePlacementActor.send({type: transition});

        // Debugging Output
        // console.log(currentState);
    }

    // Assign Star Tile
    if (Math.random() < 0.5) {
        // Loop the map back to the start tile
        currentState.pointer.arrows.push(currentState.startTile);

        // Choose a random tile for star with a minimum distance from the start tile
        let randomTileIndex = Math.floor(Math.random() * currentState.tileList.length);
        if (randomTileIndex < settings.minStarDistance)
            randomTileIndex += settings.minStarDistance;

        const randomTile = currentState.tileList[randomTileIndex];
        randomTile.type = TileType.Star;
    } else {
        // Make the last tile the star tile
        const lastTile = currentState.tileList[currentState.tileList.length - 1];
        lastTile.type = TileType.EndStar;
    }


    // Hope and pray
    //console.log("done", currentState);

    return currentState;
}