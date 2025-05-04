import React from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import TileType from '../types/TileType';
import useWindowSize from "../hooks/useWindowSize.ts";
import useCurrentMap from "../hooks/useCurrentMap.ts";

const TileTypeColors: Record<TileType, string> = {
    [TileType.Unknown]: 'gray',
    [TileType.Start]: 'purple',
    [TileType.Blue]: 'blue',
    [TileType.Red]: 'red',
    [TileType.Pipe]: 'green',
    [TileType.Star]: 'yellow',
    [TileType.EndStar]: 'orange',
};

const TileLabels: Record<TileType, string> = {
    [TileType.Unknown]: '???',
    [TileType.Start]: 'Start',
    [TileType.Blue]: 'Blue',
    [TileType.Red]: 'Red',
    [TileType.Pipe]: 'Pipe',
    [TileType.Star]: 'Star',
    [TileType.EndStar]: 'End Star',
};

export default function MapRenderer() {
    const currentMap = useCurrentMap();
    const [width, height] = useWindowSize();

    const nodeList = React.useMemo(() => {
        return currentMap.tileList.map((tile) => ({
            id: tile.id,
            name: tile.type,
            isStart: tile.id === currentMap.startTile.id
        }));
    }, [currentMap]);

    const linkList = React.useMemo(() => {
        return currentMap.tileList.flatMap((tile) => {
            return tile.arrows
                .filter((arrow) => arrow.id !== tile.id) // Avoid self-loops
                .filter((arrow) => arrow.id !== undefined) // Avoid undefined IDs
                .map((arrow) => ({
                    source: tile.id,
                    target: arrow.id,
                }));
        });
    }, [currentMap.tileList]);

    return (
        <div
            className={"w-100 h-100 position-absolute d-flex justify-content-center align-items-center"}
        >
            <ForceGraph2D
                graphData={{nodes: nodeList, links: linkList}}

                backgroundColor={"#eee"}
                nodeColor={(node) => TileTypeColors[node.name as TileType]}
                nodeLabel={(node) => TileLabels[node.name as TileType]}
                nodeRelSize={18}
                linkDirectionalArrowLength={14}
                linkDirectionalParticles={2}
                linkDirectionalParticleWidth={4}
                linkCurvature={0}

                d3VelocityDecay={0.1}
                d3AlphaDecay={0.00001}
                warmupTicks={Math.min(4 * nodeList.length, 500)}

                width={width}
                height={height}
            />
        </div>
    );
}