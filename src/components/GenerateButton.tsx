import { Button } from "react-bootstrap";

export interface GenerateButtonProps {
    onClick: () => void;
}

export default function GenerateButton(props: GenerateButtonProps) {
    return (
        <Button
            onClick={() => props.onClick()}
            variant="primary"
        >
            Generate Map
        </Button>
    )
}