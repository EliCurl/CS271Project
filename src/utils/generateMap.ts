import TilePlacementState from "../types/TilePlacementState";
import chooseTilePlacementTransition from "./chooseTilePlacementTransition.ts";
import tilePlacementFSM from "./tilePlacementFSM";
import tileColorFSM from "./tileColorFSM.ts";
import {createActor} from "xstate";
import handleTransition from "./handleTransition.ts";
import TilePlacementTransition from "../types/TilePlacementTransition.ts";
import GameSettings from "../types/GameSettings.ts";
import chooseTileColorTransition from "./chooseTileColorTransition.ts";
import TileType from "../types/TileType.ts";
import TileColorTransition from "../types/TileColorTransition.ts";

export default function generateMap(settings: GameSettings) {

    // Create Tile Placement State Machine
    const tilePlacementActor = createActor(tilePlacementFSM);
    tilePlacementActor.start();

    // Create new placement state
    const currentState = new TilePlacementState(settings.useRandomSeed ? Math.random() : settings.seed);

    // Generate Tile Map
    while (currentState.tileList.length < settings.nodeCount) {
        // Update State from State Machine
        currentState.state = tilePlacementActor.getSnapshot().value as string;

        // Update Finite State Machine with the current state
        const transition = chooseTilePlacementTransition(currentState, settings) as TilePlacementTransition;

        // Handle the transition
        handleTransition(currentState, transition);

        // Update the FSM with the chosen transition
        tilePlacementActor.send({type: transition});
    }

    // Generate Tile Color State Machine
    const tileColorActor = createActor(tileColorFSM);
    tileColorActor.start();

    // Generate Tile Colors
    for (let i = 0; i < currentState.tileList.length; i++) {
        // Skip non-unknown tiles
        if (currentState.tileList[i].type !== TileType.Unknown)
            continue;

        // Update State from State Machine
        currentState.state = tileColorActor.getSnapshot().value as string;
        currentState.pointer = currentState.tileList[i];

        // Update Finite State Machine with the current state
        const transition = chooseTileColorTransition(currentState, settings) as TileColorTransition;

        // Handle the transition
        handleTransition(currentState, transition);

        // Update the FSM with the chosen transition
        tileColorActor.send({type: transition});
    }

    // Assign Star Tile
    if (currentState.getRandom() < 0.5) {
        // Loop the map back to the start tile
        currentState.pointer.arrows.push(currentState.startTile);

        // Choose a random tile for star with a minimum distance from the start tile
        let randomTileIndex = Math.floor(currentState.getRandom() * currentState.tileList.length);
        if (randomTileIndex < settings.minStarDistance)
            randomTileIndex += settings.minStarDistance;

        const randomTile = currentState.tileList[randomTileIndex];
        randomTile.type = TileType.Star;
    } else {
        // Make the last tile the star tile
        const lastTile = currentState.tileList[currentState.tileList.length - 1];
        lastTile.type = TileType.EndStar;
    }

    return currentState;
}