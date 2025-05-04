import useGameSettings from "../../hooks/useGameSettings.ts";
import {Form} from "react-bootstrap";
import GameSettingsInput from "./GameSettingsInput.tsx";

export default function GameSettingsMenu() {
    const [gameSettings, setGameSettings] = useGameSettings();

    return (
        <Form className={""}>
            <GameSettingsInput
                label={"Node Count"}
                value={gameSettings.nodeCount}
                onChange={(value) => setGameSettings({
                    ...gameSettings,
                    nodeCount: value
                })}
            />
            <GameSettingsInput
                label={"Minimum Intersection Distance"}
                value={gameSettings.minIntersectionDistance}
                onChange={(value) => setGameSettings({
                    ...gameSettings,
                    minIntersectionDistance: value
                })}
            />
            <GameSettingsInput
                label={"Minimum Star Distance"}
                value={gameSettings.minStarDistance}
                onChange={(value) => setGameSettings({
                    ...gameSettings,
                    minStarDistance: value
                })}
            />
        </Form>
    )
}