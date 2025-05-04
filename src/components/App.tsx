import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import generateMap from "../utils/generateMap.ts";
import MapRenderer from "./MapRenderer.tsx";
import GenerateButton from "./GenerateButton.tsx";

function App() {
    const [currentState, setCurrentState] = React.useState(() => generateMap());

    return (
        <Container>
            <Row>
                <Col>
                    <GenerateButton
                        onClick={() => setCurrentState(generateMap())}
                    />
                </Col>
                <Col>
                    <MapRenderer state={currentState} />
                </Col>
            </Row>
        </Container>
    )
}

export default App
