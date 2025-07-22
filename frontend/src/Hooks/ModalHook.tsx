import { createContext } from "react";

interface ModalContextProps {
    isOpen:boolean,
    onOpen:()=>void,
    onClose:()=>void,
    onContentAdded:()=>void,
}

const ModalContext = createContext<ModalContextProps|undefined>(undefined)

export default ModalContext