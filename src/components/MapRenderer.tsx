import React from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import TilePlacementState from '../types/TilePlacementState';
import TileType from '../types/TileType';

export interface MapRendererProps {
    state: TilePlacementState;
}

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

export default function MapRenderer(props: MapRendererProps) {
    const { state } = props;

    const nodeList = React.useMemo(() => {
        return state.tileList.map((tile) => ({
            id: tile.id,
            name: tile.type,
            isStart: tile.id === state.map.startTile.id
        }));
    }, [state.tileList]);

    const linkList = React.useMemo(() => {
        return state.tileList.flatMap((tile) => {
            return tile.arrows
                .filter((arrow) => arrow.id !== tile.id) // Avoid self-loops
                .filter((arrow) => arrow.id !== undefined) // Avoid undefined IDs
                .map((arrow) => ({
                    source: tile.id,
                    target: arrow.id,
                }));
        });
    }, [state.tileList]);


    return (
        <ForceGraph2D
            graphData={{ nodes: nodeList, links: linkList }}
            nodeColor={(node) => TileTypeColors[node.name as TileType]}
            nodeLabel={(node) => TileLabels[node.name as TileType]}
            nodeRelSize={15}
            linkDirectionalArrowLength={14}
            linkCurvature={0}
        />
    );
}