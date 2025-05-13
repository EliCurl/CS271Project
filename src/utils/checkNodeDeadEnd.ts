import GameTile from "../types/GameTile";
import TileType from "../types/TileType";

/**
 * Checks if a node is a dead end in the game map.
 * @param node - The node to check
 * @returns true if the node is a dead end, false otherwise
 */
export default function checkNodeDeadEnd(node: GameTile): boolean {
    // Check if the node is a dead end
    if (node.arrows.length === 0)
        return true;

    const checkedTiles = new Set<GameTile>();
    return checkNodeDeadEndRecursive(node, checkedTiles);
}

// Recursive function to check if a node is a dead end
function checkNodeDeadEndRecursive(node: GameTile, checkedTiles: Set<GameTile>): boolean {
    // If the node has already been checked, return false
    if (checkedTiles.has(node))
        return false;

    // Check if the node is start or pipe
    if (node.type === TileType.Start ||
        node.type === TileType.EndStar ||
        node.type === TileType.Pipe) {
        return true;
    }

    // Mark the node as checked
    checkedTiles.add(node);

    // Check if any of the arrows lead to a dead end
    for (const arrow of node.arrows) {
        if (arrow.arrows.length === 0 || checkNodeDeadEndRecursive(arrow, checkedTiles)) {
            return true;
        }
    }

    return false;
}