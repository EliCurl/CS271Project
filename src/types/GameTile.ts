import TileType from './TileType';
import generateGUID from '../utils/generateGUID';

export default class GameTile {
    id: string = generateGUID();
    arrows: GameTile[] = [];
    type: TileType = TileType.Unknown;

    constructor(type: TileType = TileType.Unknown) {
        this.type = type;
    }
}