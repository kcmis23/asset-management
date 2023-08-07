// Libraries
import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// Constants
import { caption, list, subtitle, title } from "../list.style"; // Styles

const Grids = ({ data }) => {

    return (
        <Stack sx= { list } component= { Link } to= { `/setup/sub-module/form/update/${data.id}` }>
            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ flexGrow: 1, overflow: 'hidden' }}>
                <Typography variant= "caption" sx= { caption }>{ data.series_no }</Typography>
                <Typography sx= { title }>{ data.name }</Typography>
                <Typography variant= "body2" sx= { subtitle }>Path: /{ data.base_url }/{ data.path }</Typography>
            </Stack>
            <Box paddingLeft= "15px">
                { data.status === 1 ? 
                    <Box sx= {{ width: '10px', height: '10px', backgroundColor: '#A0C49D', borderRadius: '50px' }} /> : 
                    <Box sx= {{ width: '10px', height: '10px', backgroundColor: '#FF6666', borderRadius: '50px' }} /> }
            </Box>
        </Stack>
    );
}

export default Grids;