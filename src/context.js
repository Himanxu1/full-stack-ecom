import { createContext, useState } from 'react';

export const UpdatedProductContext = createContext("");

const UpdatedProductProvider =  ({children}) =>{
    const [updatedData,setUpdatedData] = useState(false);
    return (
        <UpdatedProductContext.Provider value={{updatedData,setUpdatedData}}>
            {children}
        </UpdatedProductContext.Provider>

    )
}

export {UpdatedProductProvider}