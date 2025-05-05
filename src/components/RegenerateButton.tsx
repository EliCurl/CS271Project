import {Button} from "react-bootstrap";
import {IoReloadCircle} from "react-icons/io5";
import useRegenerateMap from "../hooks/useRegenerateMap.ts";

export default function RegenerateButton() {
    const regenerateMap = useRegenerateMap();

    return (
        <Button
            onClick={() => regenerateMap()}
            variant="primary"
            className={"mt-4"}
        >
            <IoReloadCircle
                style={{
                    fontSize: "1.2rem",
                    marginRight: "0.4rem",
                    marginBottom: "0.2rem",
                }}
            />

            Regenerate Map
        </Button>
    )
}