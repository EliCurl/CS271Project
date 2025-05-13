import TilePlacementState from '../types/TilePlacementState';
import GameSettings from "../types/GameSettings.ts";

export default function chooseTileColorTransition(
    currentState: TilePlacementState,
    settings: GameSettings) {

    const {state} = currentState;

    // TODO: Implementation
    return 'blue';

    // throw new Error('Invalid state: ' + currentState);
}