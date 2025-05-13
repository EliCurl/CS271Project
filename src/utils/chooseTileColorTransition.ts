import TilePlacementState from '../types/TilePlacementState';
import GameSettings from "../types/GameSettings.ts";

let randomChoice = 0.0;

export default function chooseTileColorTransition(
    currentState: TilePlacementState,
    settings: GameSettings) {

    const {state} = currentState;


    // throw new Error('Invalid state: ' + currentState);
    if (state === 'blue') {
        randomChoice = Math.random();
        if (randomChoice <= 0.70) {
            return 'changeBlue';
        } else if (randomChoice <= 0.90) {
            return 'changeRed';
        } else {
            return 'changeEvent';
        }
    } else if (state === 'red') {
        randomChoice = Math.random();
        if (randomChoice <= 0.10) {
            return 'changeRed';
        } else if (randomChoice <= 0.80) {
            return 'changeBlue';
        } else {
            return 'changeEvent';
        }
    } else if (state === 'event') {
        randomChoice = Math.random();
        if (randomChoice <= 0.10) {
            return 'changeEvent';
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