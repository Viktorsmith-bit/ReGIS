import { createContext, useCallback, useContext, useMemo, useState } from "react";

const ContextUser = createContext()
export function User(){
    return useContext(ContextUser)
}
export default function Context({children}){
    const [cor, setCor] = useState()
    const senEmail = useCallback(()=>{})

    const contexValue = useMemo(()=>{
        cor
    },[cor])
    return(
        <ContextUser.Provider value={contexValue}>
            {children}
        </ContextUser.Provider>
    );
}