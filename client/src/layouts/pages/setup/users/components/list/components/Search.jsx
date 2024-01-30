// Libraries
import { Box, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";

// Core
import { AccountCntxt } from "core/context/Account"; // Context
import { FormCntxt } from "core/context/Form"; // Context
import { exporttoexcel, usePost } from "core/function/global"; // Function
import { excel } from "core/api"; // API

// Styles
import { btnicon, btntxt, download, logs, search } from "../style";

const Search = ({ find }) => {
    const { register, setValue, getValues } = useContext(FormCntxt);
    const { data } = useContext(AccountCntxt);
    const { mutate: xlsx } = usePost({ request: excel, onSuccess: data => exporttoexcel(data) });

    let authcreate = data.user_level === 'superadmin' || (data.permission === null || JSON.parse(data.permission).setup.users.create);
    let authlogs = data.user_level === 'superadmin' || (data.permission === null || JSON.parse(data.permission).setup.users.logs);
    let authexport = data.user_level === 'superadmin' || (data.permission === null || JSON.parse(data.permission).setup.users.export);
    // let authimport = data.user_level === 'superadmin' || (data.permission === null || JSON.parse(data.permission).setup.users.import);

    return (
        <Stack direction= "row" justifyContent= "space-between" alignItems= "center" spacing= { 1 }>
            <form autoComplete= "off">
                <Box sx= { search }>
                    <TextField { ...register('searchtxt') } variant= "standard" size= "small" fullWidth InputProps= {{ disableUnderline: true, 
                        startAdornment: <InputAdornment position= "start"><FontAwesomeIcon icon= { solid('magnifying-glass') } /></InputAdornment> }}
                        placeholder= "Search..." onChange= { e => { setValue('searchtxt', e.target.value); find({ table: 'tbl_users', data: getValues() }) } } />
                </Box>
            </form>
            <Stack direction= "row" justifyContent= "flex-end" alignItems= "center" spacing= { .5 }>
                { authlogs ? <Typography sx= { logs } component= { Link } to= "/setup/users/logs"><FontAwesomeIcon icon= { solid('clock-rotate-left') } /></Typography> : '' }
                { authexport ? 
                    <Typography sx= { download }
                    onClick= { () => {
                        let data = getValues();
                        data['type'] = 'list';
                        xlsx({ table: 'tbl_users', data: data });
                    } }><FontAwesomeIcon icon= { solid('download') } /></Typography> : '' }
                {/* { authimport ? <Typography sx= { upload }><FontAwesomeIcon icon= { solid('upload') } /></Typography> : '' } */}
                { authcreate ? <Typography component= { Link } to= "/setup/users/form/new" sx= { btnicon }><FontAwesomeIcon icon= { solid('plus') } /></Typography> : '' }
                { authcreate ? <Typography component= { Link } to= "/setup/users/form/new" sx= { btntxt }>New User</Typography> : '' }
            </Stack>
        </Stack>
    );
}

export default Search;