import { HamburgerMenuIcon, VideoIcon } from "@radix-ui/react-icons";
import {   FilesIcon, LogOutIcon, MicIcon } from "lucide-react";
import type { ReactNode } from "react";
import Button from "./ui/Button";


function Sidebar() {
    interface sidebaritemsProp  {
        title:string,
        icon: ReactNode,
        type:string,
    }

    const SidebarItems: Array<sidebaritemsProp> = [
        {
            title:"Video",
            icon: <VideoIcon className="size-8 pt-1" />,
            type: "video",
        },
        {
            title:"Audio",
            icon: <MicIcon className="size-7 pt-1"/>,
            type: "video",
        },
        {
            title:"Document",
            icon: <FilesIcon className="size-7 pt-1"/>,
            type:'document',
        }
    ]

    
  return (
    <div className="bg-black w-1/7 text-white ">
     <div className="flex ">
            <button className="mt-6 ml-7 border-black hover:border-2 p-2" >
                <HamburgerMenuIcon className="size-5"/>
            </button>
     </div>
     <div className="mt-5"> 
        {SidebarItems.map((items)=>(
            <div className="w-full" key={items.type}>
                <div className="text-3xl w-full flex p-6 gap-x-2 items-center text-gray-400 cursor-pointer hover:bg-gray-200 transition-opacity duration-300">
                  <span>{items.icon}</span><span>{items.title}</span>
                </div>
            </div>
        ))}
     </div>
     <div className="mt-124">
        <Button startIcon={<LogOutIcon/>} variant="danger" className="h-7 w-full text-2xl text-black">Logout</Button>
     </div>
    </div>
  )
}

export default Sidebar