// Libraries
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";

// Core
import { AccountCntxt } from "core/context/Account"; // Context

// Constants
import { bars, category, label } from "../style";

const Users = props => {
    const { usr, usrfetching } = props;
    const { data } = useContext(AccountCntxt);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 }>
            <Stack direction= "row" justifyContent= "flex-end" alignItems= "center">
                <Typography variant= "body2" component= { Link } to= "/setup/users" sx= {{ textDecoration: 'none' }}>View all</Typography>
            </Stack>
            <Box>
                <Grid container direction= "row" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 }>
                    { data.user_level === 'superadmin' ? 
                        <Grid item xs= { 12 } md= { 6 }>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 }>
                                <Typography sx= { label }>Employee per branch</Typography>
                                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 } sx= { category }>
                                    { !usrfetching ? 
                                        (usr.perbranch).map((brnch, index) =>
                                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" key= { index }>
                                                <Typography>{ ((brnch.branch).replace('_', ' ')).toUpperCase() }</Typography>
                                                <Stack direction= "row" justifyContent= "space-between" alignItems= "center" spacing= { 1 }>
                                                    <Box sx= {{ backgroundColor: '#dfe6e9', overflow: 'hidden', borderRadius: '8px', flexGrow: 1 }}>
                                                        <Box sx= { bars(`${((parseInt(brnch.total)/parseInt(usr.total))*100).toFixed(2)}%`) } />
                                                    </Box>
                                                    <Typography variant= "caption">{ parseInt(brnch.total) }</Typography>
                                                </Stack>
                                            </Stack>): '' }
                                </Stack>
                            </Stack>
                        </Grid> : '' }
                    <Grid item xs= { 12 } md= { 6 }>
                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 2 }>
                            <Typography sx= { label }>Employee per company</Typography>
                            <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 } sx= { category }>
                                { !usrfetching ? 
                                    (usr.percompany).map((cmp, index) =>
                                        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" key= { index }>
                                            <Typography>{ cmp.company }</Typography>
                                            <Stack direction= "row" justifyContent= "space-between" alignItems= "center" spacing= { 1 }>
                                                <Box sx= {{ backgroundColor: '#dfe6e9', overflow: 'hidden', borderRadius: '8px', flexGrow: 1 }}>
                                                    <Box sx= { bars(`${((parseInt(cmp.total)/parseInt(usr.total))*100).toFixed(2)}%`) } />
                                                </Box>
                                                <Typography variant= "caption">{ parseInt(cmp.total) }</Typography>
                                            </Stack>
                                        </Stack>) : '' }
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Stack>
    );
}

export default Users;