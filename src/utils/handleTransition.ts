import TilePlacementTransition from "../types/TilePlacementTransition.ts";
import GameTile from "../types/GameTile.ts";
import TilePlacementState from "../types/TilePlacementState.ts";
import TileType from "../types/TileType.ts";
import TileColorTransition from "../types/TileColorTransition.ts";

const TileColorTransitionMap = {
    [TileColorTransition.blue]: TileType.Blue,
    [TileColorTransition.red]: TileType.Red,
    [TileColorTransition.event]: TileType.Event,
    [TileColorTransition.star]: TileType.Star,
}

export default function handleTransition(
    state: TilePlacementState,
    transition: TilePlacementTransition | TileColorTransition) {

    // Debugging Output
    // console.log("Handle Transition:", transition);

    // Get the current pointer
    const {pointer} = state;

    // Handle the transition based on the type of transition
    if (transition === TilePlacementTransition.continue ||
        transition === TilePlacementTransition.continueBranch) {

        // Create a new tile
        const newGameTile = new GameTile(TileType.Unknown);
        state.tileList.push(newGameTile);
        pointer.arrows.push(newGameTile);
        state.pointer = newGameTile;

        // Increase distance from intersection
        state.distanceFromIntersection++;

    } else if (transition === TilePlacementTransition.branch ||
        transition === TilePlacementTransition.branchBranch) {

        // Create a new tile
        const branchTile = new GameTile();
        state.tileList.push(branchTile);
        pointer.arrows.push(branchTile);

        // Push the current tile to the branch stack
        state.branchStack.push(pointer);
        state.pointer = branchTile;

        // Reset distance from intersection
        state.distanceFromIntersection = 0;

    } else if (transition === TilePlacementTransition.pipe) {

        // Create a new pipe tile
        const pipeTile = new GameTile(TileType.Pipe);
        state.tileList.push(pipeTile);
        pointer.arrows.push(pipeTile);

        // Point the pipe tile to the start
        // pipeTile.arrows.push(state.map.startTile);

        // Pop the last tile from the branch stack
        state.pointer = state.branchStack.pop() || state.startTile;

        // Reset distance from intersection
        state.distanceFromIntersection = 0;

    } else if (transition === TilePlacementTransition.loopback) {

        // Pick a random tile to loop back to
        const randomTile = state.tileList[Math.floor(Math.random() * state.tileList.length)];

        // Add loopback arrow to the current tile
        pointer.arrows.push(randomTile);

        // Pop the last tile from the branch stack
        state.pointer = state.branchStack.pop() || state.startTile;

        // Reset distance from intersection
        state.distanceFromIntersection = 0;
    } else if (
        transition === TileColorTransition.blue ||
        transition === TileColorTransition.red ||
        transition === TileColorTransition.event ||
        transition === TileColorTransition.star
    ) {

        // Set the color of the tiles
        state.pointer.type = TileColorTransitionMap[transition];

    } else {
        throw new Error("Unknown transition type.");
    }
}