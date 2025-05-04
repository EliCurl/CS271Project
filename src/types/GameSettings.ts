export default interface GameSettings {
    minIntersectionDistance: number;
    nodeCount: number;
    minStarDistance: number;
}

export const DEFAULT_GAME_SETTINGS: GameSettings = {
    minIntersectionDistance: 5,
    nodeCount: 20,
    minStarDistance: 10
};