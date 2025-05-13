import useGameSettings from "../../hooks/useGameSettings.ts";
import {Collapse, Form} from "react-bootstrap";
import GameSettingsInput from "./GameSettingsInput.tsx";
import GameSettingsSlider from "./GameSettingsSlider.tsx";
import GameSettingsCheckbox from "./GameSettingsCheckbox.tsx";

export default function GameSettingsMenu() {
    const [gameSettings, setGameSettings] = useGameSettings();

    return (
        <Form className={""}>
            <h5 className={"fw-bold mb-0 mt-2"}>
                Generation
            </h5>
            <GameSettingsCheckbox
                label={"Random Seed"}
                value={gameSettings.useRandomSeed}
                onChange={(value) => setGameSettings({
                    ...gameSettings,
                    useRandomSeed: value
                })}
            />
            <Collapse
                in={!gameSettings.useRandomSeed}
            >
                <div>
                    <GameSettingsInput
                        label={"Seed"}
                        disabled={gameSettings.useRandomSeed}
                        value={gameSettings.seed}
                        onChange={(value) => setGameSettings({
                            ...gameSettings,
                            seed: value
                        })}
                    />
                </div>
            </Collapse>
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
            <h5 className={"fw-bold mb-0 mt-2"}>
                Rendering
            </h5>
            <GameSettingsSlider
                label={"Warmup Time"}
                value={gameSettings.warmupTime}
                valueText={`${gameSettings.warmupTime.toFixed(2)}x`}
                min={0}
                max={16}
                step={0.5}
                onChange={(value) => setGameSettings({
                    ...gameSettings,
                    warmupTime: value
                })}
            />
            <GameSettingsSlider
                label={"Force Scale"}
                value={gameSettings.forceScale}
                valueText={`${gameSettings.forceScale.toFixed(2)}x`}
                min={0.25}
                max={8}
                step={0.25}
                onChange={(value) => setGameSettings({
                    ...gameSettings,
                    forceScale: value
                })}
            />
            <GameSettingsSlider
                label={"Node Size"}
                value={gameSettings.nodeSize}
                valueText={`${gameSettings.nodeSize.toFixed()}px`}
                min={1}
                max={100}
                step={1}
                onChange={(value) => setGameSettings({
                    ...gameSettings,
                    nodeSize: value
                })}
            />
        </Form>

    )
}