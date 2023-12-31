// Libraries
import { createContext, useState } from "react";

export const GlobalCntxt = createContext();
export const GlobalPrvdr = props => {
    const { children, window } = props;
    const [ open, setopen ] = useState({ left: false });
    const [ active, setactive ] = useState(localStorage.getItem('nav'));

    const drawerToggle = open => event => {
        if(event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) { return; }
        setopen({ left: open });
    }

    const container = window !== undefined ? () => window().document.body : undefined;
    return <GlobalCntxt.Provider value= {{ open, setopen, active, setactive, drawerToggle, container }}>{ children }</GlobalCntxt.Provider>
}