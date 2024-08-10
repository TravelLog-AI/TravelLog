import { createContext, useState } from "react";

export const CreateTripContext = createContext();

export default function CreateTripProvider({children}) {
    const [tripData, setTripData] = useState();

    return (
        <CreateTripContext.Provider value={{tripData, setTripData}}>
            {children}
        </CreateTripContext.Provider>
    )
}