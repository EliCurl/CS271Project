import {Col, Form, Row} from "react-bootstrap";
import React from "react";

export interface GameSettingsInputProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
}

export default function GameSettingsInput(props: GameSettingsInputProps) {
    const [text, setText] = React.useState<string>(props.value.toString());

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
        const value = parseFloat(e.target.value);
        console.log(value);
        if (!isNaN(value))
            props.onChange(value);
    }

    React.useEffect(() => {
        setText(props.value.toString());
    }, [props.value]);

    return (
        <Form.Group as={Row}>
            <Form.Label column={true}>
                {props.label}
            </Form.Label>
            <Col
                xs={5}
                className={"d-flex justify-content-center align-items-center"}
            >
                <Form.Control
                    type={"number"}
                    size={"sm"}
                    value={text}
                    onChange={handleChange}
                />
            </Col>
        </Form.Group>
    )
}