import { useState, type ReactNode } from "react";
import ModalContext from "../Hooks/ModalHook";

interface ModalProps {
    children:ReactNode
}

const ModalProvider = ({children}:ModalProps)=>{

    const [isOpen,setIsOpen] = useState<boolean>(true)

    const onClose=()=>{
        setIsOpen(false);
        console.log(isOpen)
    }
    const onOpen=()=>{
        setIsOpen(true);
        console.log(isOpen)
    }

    const onContentAdded=()=>{
        
    }

    const value={
        isOpen,
        onClose,
        onOpen,
        onContentAdded
    }
    
    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    )
}

export default ModalProvider;