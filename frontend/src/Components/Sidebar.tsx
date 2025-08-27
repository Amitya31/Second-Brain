import { TwitterLogoIcon, VideoIcon } from "@radix-ui/react-icons";
import {   FilesIcon, LogOutIcon, MicIcon, PanelLeftIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { cn } from "../lib/utils";
import useIsmobile from "../Hooks/use-mobile";
import useContentType from "../Hooks/ContentTypeHook";
import { useAuth } from "../Hooks/useAuth";



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
      type: "audio",
    },
    {
      title:"Document",
      icon: <FilesIcon className="size-7 pt-1"/>,
      type:'document',
    },
    {
      title:"Tweet",
      icon: <TwitterLogoIcon className="size-7 pt-1"/>,
      type:'tweet',
    }
]

export default function Sidebar() {
  const isMobile = useIsmobile();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {setType} = useContentType()
  const {logout} = useAuth()
  const [isActive,setActive] = useState<string>()

  useEffect(() => {
    const storedState = localStorage.getItem("sidebar-open");
    if (storedState !== null) {
      setIsOpen(storedState === "true");
    } else {
      setIsOpen(!isMobile);
    }
  }, [isMobile]);

  useEffect(() => {
    localStorage.setItem("sidebar-open", String(isOpen));
  }, [isOpen]);

  const toggleSidebar = useCallback(() => setIsOpen((prev) => !prev), []);

  const sidebarClass = useMemo(
    () =>
      cn(
        "fixed z-40 top-0 left-0 min-h-screen bg-black text-white transition-all duration-300 ease-in-out lg:relative lg:z-0",
        isMobile
          ? isOpen
            ? "w-64 shadow-xl"
            : "w-0 overflow-hidden"
          : isOpen
          ? "w-90"
          : "w-15",
      ),
    [isMobile, isOpen]
  );

  return (
    <>
      

      <div className={sidebarClass}>
        <button
        onClick={toggleSidebar}
        className="fixed left-0 top-0 lg:left-4 z-50 lg:static lg:ml-2 p-2 bg-black text-white rounded hover:bg-gray-700"
      >
        <PanelLeftIcon className="size-6" />
      </button>
        <div className="p-6">
          {SidebarItems.map((item) => (
            isOpen && <button
              key={item.type}
              className={cn("flex items-center gap-3 py-2 px-4 w-full text-center rounded",
                isMobile ? 
                isOpen 
                 ? 'hover:bg-gray-400'
                 : 'hover:none' 
                : isOpen 
                 ? 'hover:bg-gray-400' 
                 : 'hover:none',
                item.type === isActive
                 ? "bg-teal-700 text-white font-semibold"
                 : "",
                )}
              onClick={()=>{setType(item.type);setActive(item.type)}}
            >
              {item.icon}
              {isOpen && <span className="text-2xl">{item.title}</span>}
            </button>
          ))}
        </div>
        <div className="p-6 mt-140 flex">
          {isOpen && <button className=" flex items-center gap-3 py-2 px-4 w-full text-left bg-red-500 text-white hover:bg-red-400 rounded text-2xl" onClick={logout}>
            <div><LogOutIcon/></div><div>Logout</div>
          </button>}
        </div>
      </div>

      {isMobile && isOpen && (
        <div
          className="fixed inset-10 z-30 bg-black bg-opacity-50"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}