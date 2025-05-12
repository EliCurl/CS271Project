import TilePlacementState from '../types/TilePlacementState';
import GameSettings from "../types/GameSettings.ts";

let randomChoice = 0.0;

export default function chooseTransition(
    currentState: TilePlacementState,
    settings: GameSettings) {

    // Debugging Output
    console.log("Choose Transition:", currentState.state);

    // const state = currentState.state;
    const {state} = currentState;

    //const isFarEnoughToBranch = currentState.distanceFromIntersection >= settings.minIntersectionDistance;

    if (state === 'blue') {
        randomChoice = Math.random();
        if (randomChoice <= 0.40) {
            return 'continueBlue';
        } else if (randomChoice <= 0.80) {
            return 'changeRed';
        } else {
            return 'changeEvent';
        }
    } else if (state === 'red') {
        randomChoice = Math.random();
        if (randomChoice <= 0.40) {
            return 'continueRed';
        } else if (randomChoice <= 0.80) {
            return 'changeBlue';
        } else {
            return 'changeEvent';
        }
    } else if (state === 'event') {
        randomChoice = Math.random();
        if (randomChoice <= 0.40) {
            return 'continueEvent';
        } else if (randomChoice <= 0.80) {
            return 'changeBlue';
        } else {
            return 'changeRed';
        }
    } else if (state === 'star') {
        return 'changeBlue';
    } else if (state === 'start') {
        return 'changeBlue';
    }

    throw new Error('Invalid state: ' + currentState);
}