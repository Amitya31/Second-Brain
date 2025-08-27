import type { HTMLAttributes, ReactNode } from "react"

type Cardprops = {
    children: ReactNode
} & HTMLAttributes<HTMLDivElement>
const Card = ({children,className="",...rest}:Cardprops) => {
 
    return (
        <div>
            <div className={` max-h-fit rounded-2xl p-2 ${className}`} {...rest}>
                {children}
            </div>
        </div>
    )
}

const CardHeader = ({children}:Cardprops)=>{
    return (
        <div className="flex justify-between items-center p-2 gap-x-3">
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