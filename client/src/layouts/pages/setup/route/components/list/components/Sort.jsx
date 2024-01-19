// Libraries
import React, { useContext, useState } from 'react'
import { Stack, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

// Core
import { ListCntxt } from 'core/context/List'; // Context
import { FormCntxt } from 'core/context/Form'; // Context

import { orderby } from '../style';

const Sort = ({ records }) => {
    const { sort, setsort, listing, setlisting } = useContext(ListCntxt);
    const { getValues, setValue } = useContext(FormCntxt);
    const [ order, setorder ] = useState('date_created');

    const onclick = name => { setValue('orderby', name); setorder(name); records({ table: 'tbl_routes', data: getValues() }); }
    const onsort = sort => { setsort(sort); setValue('sort', sort); records({ table: 'tbl_routes', data: getValues() }); }

    return (
        <Stack direction= "row" justifyContent= "flex-end" alignItems= "center" spacing= { 1 }>
            <Stack direction= "row" justifyContent= "flex-start" alignItems= "center" spacing= { 1 }>
                <Typography variant= "caption" color= "#636e72">Order by:</Typography>
                { order === 'date_created' ? <Typography variant= "caption" sx= { orderby } onClick= { () => onclick('route') }>Date created</Typography> :
                    order === 'route' ? <Typography variant= "caption" sx= { orderby } onClick= { () => onclick('series_no') }>Name</Typography> :
                        order === 'series_no' ? <Typography variant= "caption" sx= { orderby } onClick= { () => onclick('date_created') }>Series no.</Typography> : '' }
            </Stack>
            { sort === 'desc' ? 
                <Typography sx= {{ cursor: 'pointer' }} onClick= { () => onsort('asc') }><FontAwesomeIcon icon= { solid('arrow-down-z-a') } color= "#636e72" /></Typography> :
                <Typography sx= {{ cursor: 'pointer' }} onClick= { () => onsort('desc') }><FontAwesomeIcon icon= { solid('arrow-down-a-z') } color= "#636e72" /></Typography> }
            { listing === 'list' ?
                <Typography sx= {{ cursor: 'pointer' }} onClick= { () => setlisting('grid') }><FontAwesomeIcon icon= { solid('grip') } color= "#636e72" /></Typography> :
                <Typography sx= {{ cursor: 'pointer' }} onClick= { () => setlisting('list') }><FontAwesomeIcon icon= { solid('list') } color= "#636e72" /></Typography> }
        </Stack>
    );
}

export default Sort;