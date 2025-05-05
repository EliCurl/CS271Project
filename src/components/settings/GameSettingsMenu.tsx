import useGameSettings from "../../hooks/useGameSettings.ts";
import {Form, Row, Col} from "react-bootstrap";
import GameSettingsInput from "./GameSettingsInput.tsx";

export default function GameSettingsMenu() {
    const [gameSettings, setGameSettings] = useGameSettings();


    const sliderValue = Math.round(gameSettings.simulationSpeed * 100);

  const onSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pct = e.target.valueAsNumber;
    setGameSettings({
      ...gameSettings,
      simulationSpeed: pct / 100,
    });
  };

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
            <Form.Group as={Row} className="align-items-center mt-3">
        <Form.Label column xs={4}>
          Simulation Speed
        </Form.Label>
        <Col xs={6}>
          <Form.Control
            type="range"
            min={10}
            max={800}
            step={1}
            value={sliderValue}
            onChange={onSliderChange}
          />
        </Col>
        <Col xs={2}>
          <Form.Text>{sliderValue}%</Form.Text>
        </Col>
      </Form.Group>
        </Form>
    )
}