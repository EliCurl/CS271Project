import GameTile from "../types/GameTile.ts";
import TileType from "../types/TileType.ts";

/**
 * Recursive function to check if a given node can reach either an end star, pipe, or star tile
 * @param gameTile - The game tile to check
 * @param reachedTiles - A set of already visited tiles to avoid cycles
 */
export default function canReachStart(gameTile: GameTile, reachedTiles: Set<GameTile> = new Set()): boolean {
    // Check if the tile is a start tile
    if (gameTile.type === TileType.Start ||
        gameTile.type === TileType.Pipe ||
        gameTile.type === TileType.EndStar)
        return true;

    // Already visited this tile
    if (reachedTiles.has(gameTile))
        return false;
    reachedTiles.add(gameTile);

    // Recursively check each arrow connected to the tile
    for (const arrow of gameTile.arrows) {
        if (canReachStart(arrow, reachedTiles))
            return true;
    }

    // No path found to a start tile
    return false;
}