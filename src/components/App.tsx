import {Col, Container, Row} from "react-bootstrap";
import MapRenderer from "./MapRenderer";
import RegenerateButton from "./RegenerateButton.tsx";
import GameSettingsMenu from "./settings/GameSettingsMenu";

function App() {
    return (
        <Container fluid style={{height: "100vh"}}>
            <Row className={"h-100"}>
                <Col
                    md={5}
                    style={{
                        backgroundColor: "#fff",
                        zIndex: 1,
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                        padding: "4rem",
                    }}
                >
                    <h1 className="mt-4 fw-bold">Map Generator 🗺️</h1>
                    <p className="lead">Generate Mario-Party-like maps using Finite State Machines</p>
                    <GameSettingsMenu/>
                    <RegenerateButton/>
                </Col>
                <Col
                    className={"p-0"}
                    style={{
                        minHeight: 300,
                        minWidth: 300,
                    }}
                >
                    <MapRenderer/>
                </Col>
            </Row>
        </Container>
    )
}

export default App
