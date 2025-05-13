import {Col, Form, Row} from "react-bootstrap";
import React from "react";

export interface GameSettingsCheckboxProps {
    label: string;
    value: boolean;
    onChange: (value: boolean) => void;
}

export default function GameSettingsCheckbox(props: GameSettingsCheckboxProps) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.target.checked);
    }

    return (
        <Form.Group as={Row}>
            <Form.Label column={true}>
                {props.label}
            </Form.Label>
            <Col
                xs={5}
                className={"d-flex justify-content-center align-items-center"}
            >
                <Form.Check
                    type={"switch"}
                    checked={props.value}
                    onChange={handleChange}
                />
            </Col>
        </Form.Group>
    )
}