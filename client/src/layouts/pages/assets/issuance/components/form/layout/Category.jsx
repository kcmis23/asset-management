// Libraries
import { Box, Stack, Typography } from "@mui/material";

// Core
import FormBuilder from "core/components/form"; // Form Builder

import Categories from "./fields";

const Category = props => {
    const { getValues } = props;

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 3 }>
            <Typography color= "#b2bec3">Specifications:</Typography>
            { getValues().category ? 
                <Box><FormBuilder fields= { Categories[(getValues()?.category)?.toLowerCase()]({ ...props }) } /></Box> : 
                <Typography color= "#b2bec3" variant= "caption" sx= {{ textAlign: 'center' }}>Please choose a category first!</Typography> }
        </Stack>
    );
}

export default Category