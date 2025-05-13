import TilePlacementState from '../types/TilePlacementState';
import GameSettings from "../types/GameSettings.ts";

let randomChoice = 0.0;

export default function chooseTilePlacementTransition(
    currentState: TilePlacementState,
    settings: GameSettings) {

    // Debugging Output
    // console.log("Choose Transition:", currentState.state);

    // const state = currentState.state;
    const {state} = currentState;

    const isFarEnoughToBranch = currentState.distanceFromIntersection >= settings.minIntersectionDistance;


    if (state === 'path') {
        // chanceBranch = 0.10;
        // continuePath = 0.90;
        randomChoice = Math.random();
        if (randomChoice <= 0.40 && isFarEnoughToBranch) {
            return 'branch';
        } else {
            return 'continue';
        }
    } else if (state === 'branch') {
        // chanceBranch = 0.05;
        // continueBranch = 0.75;
        // chancePipe = 0.05;
        // chanceLoopback = .15;
        randomChoice = Math.random();
        if (randomChoice <= 0.05 && isFarEnoughToBranch) {
            return 'branchBranch';
        } else if (randomChoice <= 0.10) {
            return 'pipe';
        } else if (randomChoice <= 0.25 && isFarEnoughToBranch) {
            return 'loopback';
        } else {
            return 'continueBranch';
        }
    }

    throw new Error('Invalid state: ' + currentState);
}