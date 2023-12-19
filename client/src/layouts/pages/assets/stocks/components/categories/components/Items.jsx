// Libraries
import { Chip, Grid, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

// Core
import { ListCntxt } from "core/context/List"; // Context
import { AccountCntxt } from "core/context/Account"; // Context

import { caption, listview, subtitle, listtitle } from "../style";
// const status = { good: 'A0C49D', defect: 'FF6666' }

const Items = () => {
    const { category } = useParams();
    const { list, listing } = useContext(ListCntxt);
    const { data } = useContext(AccountCntxt);

    let authupdate = data.user_level === 'superadmin' || (data.permission === null || JSON.parse(data.permission).assets.stocks.update);
    let authview = data.user_level === 'superadmin' || (data.permission === null || JSON.parse(data.permission).assets.stocks.view);

    return (
        <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ overflowY: 'scroll', '&::-webkit-scrollbar': { display: 'none' } }}>
            { list?.length > 0 ?
                listing === 'list' ?
                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" spacing= { 1 }>
                        { list?.map((data, index) => 
                            <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" sx= { listview } key= { index }>
                                <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ flexGrow: 1, overflow: 'hidden' }}>
                                    <Typography variant= "caption" sx= { caption }>{ data.series_no }</Typography>
                                    <Typography sx= { listtitle }>{ data.model } { (category.replace('-', ' ')).toLowerCase() === 'toner' ? `(${(data.condition)?.toUpperCase()})` : '' }</Typography>
                                    <Typography sx= { subtitle } variant= "body2">{ data.serial_no }</Typography>
                                    { (category.replace('-', ' ')).toLowerCase() === 'toner' ? <Typography sx= { subtitle } variant= "body2">Quantity: { data.quantity }</Typography> : '' }
                                </Stack>
                                <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 2 } paddingLeft= "10px">
                                    <Chip size= "small" color= { data.quantity > 0 ? 'success' : 'error' } label= { data.quantity > 0 ? `Available` : 'Not available'} />
                                    {/* <Box sx= {{ width: '10px', height: '10px', backgroundColor: `#${status[data.status]}`, borderRadius: '50px' }} /> */}
                                    <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1.5 }>
                                        { authupdate ? <Typography color= "#9BA4B5" component= { Link } to= { `/assets/stocks/${category}/form/update/${data.id}` }>
                                                <FontAwesomeIcon icon= { solid('pencil') } size= "lg" />
                                            </Typography> : '' }
                                        { authview ? <Typography color= "#9BA4B5" component= { Link } to= { `/assets/stocks/${category}/form/view/${data.id}` }>
                                                <FontAwesomeIcon icon= { solid('eye') } size= "lg" />
                                            </Typography> : '' }
                                    </Stack>
                                </Stack>
                            </Stack> ) }
                    </Stack>
                    : <Grid container direction= "row" justifyContent= "flex-start" alignItems= "flex-start" spacing= { 1 }>
                        { list?.map((data, index) => 
                            <Grid item xs= { 12 } sm= { 6 } md= { 4 } key= { index }>
                                <Stack direction= "row" justifyContent= "space-between" alignItems= "center" sx= { listview }>
                                    <Stack direction= "column" justifyContent= "flex-start" alignItems= "stretch" sx= {{ flexGrow: 1, overflow: 'hidden' }}>
                                        <Typography variant= "caption" sx= { caption }>{ data.series_no }</Typography>
                                        <Typography sx= { listtitle }>{ data.model } { (category.replace('-', ' ')).toLowerCase() === 'toner' ? `(${(data.condition)?.toUpperCase()})` : '' }</Typography>
                                        <Typography sx= { subtitle } variant= "body2">{ data.serial_no }</Typography>
                                        { (category.replace('-', ' ')).toLowerCase() === 'toner' ? <Typography sx= { subtitle } variant= "body2">Quantity: { data.quantity }</Typography> : '' }
                                    </Stack>
                                    <Chip size= "small" color= { data.quantity > 0 ? 'success' : 'error' } label= { data.quantity > 0 ? `Available` : 'Not available'} />
                                </Stack>
                            </Grid> ) }
                    </Grid> 
                : <Typography variant= "body2" color= "#9DB2BF" bgcolor= "#FFFFFF" textAlign= "center" paddingY= "10px" borderRadius= { 2 }>No record/s found!</Typography> }
        </Stack>
    );
}

export default Items;