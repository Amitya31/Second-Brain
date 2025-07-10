import type { ReactNode } from "react"

type Cardprops = {
    children:ReactNode
}
const Card = ({children}:Cardprops) => {
 
    return (
        <div>
            <div className="bg-white w-90 max-h-fit border-white rounded-2xl p-2 shadow-lg shadow-black">
                {children}
            </div>
        </div>
    )
}

const CardHeader = ({children}:Cardprops)=>{
    return (
        <div className="flex justify-between p-2 gap-x-3">
            {children}
        </div>
    )
}

const CardContent = ({children}:Cardprops)=>{
    return (
        <div>
            {children}
        </div>
    )
}

const CardFooter = ({children}:Cardprops)=>{
    return (
        <div className="p-2 ">
            {children}
        </div>
    )
}
export {
    Card,
    CardHeader,
    CardContent,
    CardFooter
}