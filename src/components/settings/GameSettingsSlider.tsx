import {Col, Form, Row} from "react-bootstrap";
import React from "react";

export interface GameSettingsSliderProps {
    label: string;
    value: number;
    valueText?: string;
    min: number;
    max: number;
    step?: number;
    onChange: (value: number) => void;
}

export default function GameSettingsSlider(props: GameSettingsSliderProps) {

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value))
            props.onChange(value);
    }

    return (
        <Form.Group as={Row}>
            <Form.Label column={true}>
                {props.label}
                <span className={"text-muted"}>
                    {` (${props.valueText ?? props.value})`}
                </span>
            </Form.Label>
            <Col
                xs={5}
                className={"d-flex justify-content-center align-items-center"}
            >
                <Form.Range
                    min={props.min}
                    max={props.max}
                    step={props.step}
                    value={props.value}
                    onChange={onChange}
                />
            </Col>
        </Form.Group>
    )
}