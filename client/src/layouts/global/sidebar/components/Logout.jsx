// Libraries
import { Stack, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

// Constants
import { btn } from "../style"; // Styles

const Logout = () => {
    return (
        <Stack sx= { btn } onClick= { () => { sessionStorage.clear(); window.location.href = '/' } }>
            <Typography>Logout</Typography>
            <FontAwesomeIcon icon= { solid('sign-out') } />
        </Stack>
    );
}

export default Logout;