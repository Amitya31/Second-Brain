import { useContext } from "react";
import ModalContext from "./ModalHook";

export const useModal = ()=>{
    const context = useContext(ModalContext)
    if(!context){
        throw new Error('useModal must be within ModalProvider')
    }
    return context
}