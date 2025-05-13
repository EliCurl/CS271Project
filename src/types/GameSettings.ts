export default interface GameSettings {
    seed: number;
    useRandomSeed: boolean;
    minIntersectionDistance: number;
    nodeCount: number;
    minStarDistance: number;
    forceScale: number;
    warmupTime: number;
    nodeSize: number;
}

export const DEFAULT_GAME_SETTINGS: GameSettings = {
    seed: 0,
    useRandomSeed: false,
    minIntersectionDistance: 5,
    nodeCount: 20,
    minStarDistance: 10,
    forceScale: 1,
    warmupTime: 4,
    nodeSize: 18,
};