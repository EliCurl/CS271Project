import generateMap from "../utils/generateMap.ts";
import {useAtomValue} from "jotai";
import {atomWithDefault} from "jotai/utils";
import {gameSettingsAtom} from "./useGameSettings.ts";

export const currentMapAtom = atomWithDefault((get) => generateMap(get(gameSettingsAtom)));

export default function useCurrentMap() {
    return useAtomValue(currentMapAtom);
}