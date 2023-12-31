// Libraries
import { createContext, useState } from "react";

export const ListCntxt = createContext();
export const ListPrvdr = props => {
    const { children } = props;
    const [ list, setlist ] = useState([]);
    const [ sort, setsort ] = useState('desc');
    const [ listing, setlisting ] = useState('list');

    return <ListCntxt.Provider value= {{ list, setlist, sort, setsort, listing, setlisting }}>{ children }</ListCntxt.Provider>
}