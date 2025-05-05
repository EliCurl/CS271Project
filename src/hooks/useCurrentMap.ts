import generateMap from "../utils/generateMap.ts";
import {atom, useAtomValue} from "jotai";
import {DEFAULT_GAME_SETTINGS} from "../types/GameSettings.ts";

export const currentMapAtom = atom(generateMap(DEFAULT_GAME_SETTINGS));

export default function useCurrentMap() {
    return useAtomValue(currentMapAtom);
}