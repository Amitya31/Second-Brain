import { useContext } from "react";
import ContentTypeContext from "../Context/ContentTypeContext";

const useContentType = ()=>{
    const context = useContext(ContentTypeContext);
    if (!context) {
      throw new Error("useContentType must be used within ContentTypeProvider");
    }
    return context;
}

export default useContentType;