import {Col, Container, Row} from "react-bootstrap";
import ExampleButton from "./ExampleButton.tsx";

function App() {
    return (
        <Container>
            <Row>
                <Col>
                    <ExampleButton label={"Crash Out"}/>
                </Col>
            </Row>
        </Container>
    )
}

export default App
