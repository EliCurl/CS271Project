import {Button} from "react-bootstrap";
import React from "react";

export interface ExampleButtonProps {
    label: string;
}

export default function ExampleButton(props: ExampleButtonProps) {
    const [count, setCount] = React.useState(0);

    return (
        <Button
            onClick={() => setCount((count) => count + 1)}
            variant="primary"
        >
            {props.label} {count}
        </Button>
    )
}