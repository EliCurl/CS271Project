import GameSettings, {DEFAULT_GAME_SETTINGS} from "../types/GameSettings.ts";
import {atomWithStorage} from "jotai/utils";
import {atom, useAtom} from "jotai";

// Stores current game settings in local storage
export const _gameSettingsAtom = atomWithStorage<Partial<GameSettings>>("gameSettings", {});

// Replaces missing settings with default values
export const gameSettingsAtom = atom(get => {
    const currentSettings = get(_gameSettingsAtom);
    return {
        ...DEFAULT_GAME_SETTINGS,
        ...currentSettings
    } as GameSettings;

}, (get, set, newSettings: Partial<GameSettings>) => {
    const currentSettings = get(_gameSettingsAtom);
    set(_gameSettingsAtom, {
        ...currentSettings,
        ...newSettings
    });
});

export default function useGameSettings() {
    return useAtom(gameSettingsAtom);
}