// Libraries
import { Box, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";
import { useContext } from "react";

// Core
import { FormCntxt } from "core/context/Form"; // Context

import { btnicon, btntxt, download, logs, search, upload } from "../style";
import { AccountCntxt } from "core/context/Account";

const Search = ({ request }) => {
    const { register, setValue, getValues } = useContext(FormCntxt);
    const { data } = useContext(AccountCntxt);

    let authcreate = data.user_level === 'superadmin' || (data.permission === null || JSON.parse(data.permission).maintenance.brands.create);
    let authlogs = data.user_level === 'superadmin' || (data.permission === null || JSON.parse(data.permission).maintenance.brands.logs);
    let authimport = data.user_level === 'superadmin' || (data.permission === null || JSON.parse(data.permission).maintenance.brands.import);
    let authexport = data.user_level === 'superadmin' || (data.permission === null || JSON.parse(data.permission).maintenance.brands.export);

    return (
        <Stack direction= "row" justifyContent= "space-between" alignItems= "center" spacing= { 1 }>
            <form autoComplete= "off">
                <Box sx= { search }>
                    <TextField { ...register('searchtxt') } variant= "standard" size= "small" fullWidth InputProps= {{ disableUnderline: true, 
                        startAdornment: <InputAdornment position= "start"><FontAwesomeIcon icon= { solid('magnifying-glass') } /></InputAdornment> }}
                        placeholder= "Search..." sx= {{ padding: '' }} onChange= { e => { setValue('searchtxt', e.target.value); request({ table: 'tbl_brands', data: getValues() }) } } />
                </Box>
            </form>
            <Stack direction= "row" justifyContent= "flex-end" alignItems= "center" spacing= { 1 }>
                { authlogs ? <Typography sx= { logs }><FontAwesomeIcon icon= { solid('clock-rotate-left') } /></Typography> : '' }
                { authexport ? <Typography sx= { download }><FontAwesomeIcon icon= { solid('download') } /></Typography> : '' }
                { authimport ? <Typography sx= { upload }><FontAwesomeIcon icon= { solid('upload') } /></Typography> : '' }
                { authcreate ? <Typography component= { Link } to= "/maintenance/brands/form/new" sx= { btnicon }><FontAwesomeIcon icon= { solid('plus') } /></Typography> : '' }
                { authcreate ? <Typography component= { Link } to= "/maintenance/brands/form/new" sx= { btntxt }>New Brand</Typography> : '' }
            </Stack>
        </Stack>
    );
}

export default Search;