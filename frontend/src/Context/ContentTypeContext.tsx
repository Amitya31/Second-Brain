import { createContext, useState, type ReactNode } from "react";
import type { ContentType } from "../types/ContentTypeContext";

const ContentTypeContext = createContext<ContentType|undefined>(undefined)

export default ContentTypeContext;

interface ContentContextType {
    children:ReactNode;
}

export const ContentTypeProvider = ({children}:ContentContextType)=>{
    const [selectedType,setSelectedType] = useState<string|undefined>()

    const setType = (type:string)=>{
        setSelectedType(type)
    }

    const value:ContentType={
        selectedType,
        setType,
    }
    return (
        <ContentTypeContext.Provider value={value}>
            {children}
        </ContentTypeContext.Provider>
    )
}