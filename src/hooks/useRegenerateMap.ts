import {atom, useSetAtom} from "jotai";
import {currentMapAtom} from "./useCurrentMap.ts";
import generateMap from "../utils/generateMap.ts";
import {gameSettingsAtom} from "./useGameSettings.ts";

export const regenerateMapAtom = atom(null, (get, set) => {
    const gameSettings = get(gameSettingsAtom);
    set(currentMapAtom, generateMap(gameSettings));
});

export default function useRegenerateMap() {
    return useSetAtom(regenerateMapAtom);
}