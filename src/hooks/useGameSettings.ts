import GameSettings, {DEFAULT_GAME_SETTINGS} from "../types/GameSettings.ts";
import {atomWithStorage} from "jotai/utils";
import {useAtom} from "jotai";

// Default Settings are here:
export const gameSettingsAtom = atomWithStorage<GameSettings>("gameSettings", DEFAULT_GAME_SETTINGS);

export default function useGameSettings() {
    return useAtom(gameSettingsAtom);
}