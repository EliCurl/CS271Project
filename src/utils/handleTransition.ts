import TilePlacementTransition from "../types/TilePlacementTransition.ts";
import GameTile from "../types/GameTile.ts";
import TilePlacementState from "../types/TilePlacementState.ts";
import TileType from "../types/TileType.ts";

export default function handleTransition(
    state: TilePlacementState,
    transition: TilePlacementTransition) {

    // Debugging Output
    console.log("Handle Transition:", transition);

    // Get the current pointer
    const { pointer } = state;

    // Handle the transition based on the type of transition
    switch (transition) {
        case TilePlacementTransition.continue:
        case TilePlacementTransition.continueBranch:

            // Create a new tile
            const newGameTile = new GameTile();
            state.tileList.push(newGameTile);
            pointer.arrows.push(newGameTile);
            state.pointer = newGameTile;

            // Increase distance from intersection
            state.distanceFromIntersection++;

            break;

        case TilePlacementTransition.branch:
        case TilePlacementTransition.branchBranch:

            // Create a new tile
            const branchTile = new GameTile();
            state.tileList.push(branchTile);
            pointer.arrows.push(branchTile);

            // Push the current tile to the branch stack
            state.branchStack.push(pointer);
            state.pointer = branchTile;

            // Reset distance from intersection
            state.distanceFromIntersection = 0;

            break;

        case TilePlacementTransition.pipe:

            // Create a new pipe tile
            const pipeTile = new GameTile();
            state.tileList.push(pipeTile);
            pointer.arrows.push(pipeTile);
            pipeTile.type = TileType.Pipe;

            // Point the pipe tile to the start
            // pipeTile.arrows.push(state.map.startTile);

            // Pop the last tile from the branch stack
            state.pointer = state.branchStack.pop() || state.map.startTile;

            // Reset distance from intersection
            state.distanceFromIntersection = 0;

            break;

        case TilePlacementTransition.loopback:

            // Pick a random tile to loop back to
            const randomTile = state.tileList[Math.floor(Math.random() * state.tileList.length)];

            // Add loopback arrow to the current tile
            pointer.arrows.push(randomTile);

            // Pop the last tile from the branch stack
            state.pointer = state.branchStack.pop() || state.map.startTile;

            // Reset distance from intersection
            state.distanceFromIntersection = 0;

            break;
        default:
            throw new Error("Unknown transition type.");
    }
}