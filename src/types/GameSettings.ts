export default interface GameSettings {
    minIntersectionDistance: number;
    nodeCount: number;
    minStarDistance: number;
    forceScale: number;
    warmupTime: number;
}

export const DEFAULT_GAME_SETTINGS: GameSettings = {
    minIntersectionDistance: 5,
    nodeCount: 20,
    minStarDistance: 10,
    forceScale: 1,
    warmupTime: 4
};