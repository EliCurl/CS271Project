export default interface GameSettings {
    minIntersectionDistance: number;
    nodeCount: number;
    minStarDistance: number;
    simulationSpeed: number; 
}

export const DEFAULT_GAME_SETTINGS: GameSettings = {
    minIntersectionDistance: 5,
    nodeCount: 20,
    minStarDistance: 10,
    simulationSpeed: 50
};