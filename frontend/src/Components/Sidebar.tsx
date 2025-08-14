import { TwitterLogoIcon, VideoIcon } from "@radix-ui/react-icons";
import {   FilesIcon, MicIcon, PanelLeftIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { cn } from "../lib/utils";
import useIsmobile from "../Hooks/use-mobile";
import useContentType from "../Hooks/ContentTypeHook";



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
  const {selectedType,setType} = useContentType()

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
        "fixed z-40 top-0 left-0 h-screen bg-black text-white transition-all duration-300 ease-in-out lg:relative lg:z-0",
        isMobile
          ? isOpen
            ? "w-64 shadow-xl"
            : "w-0 overflow-hidden"
          : isOpen
          ? "w-64"
          : "w-15"
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
            <button
              key={item.type}
              className={cn("flex items-center gap-3 py-2 px-4 w-full text-left rounded",isMobile ? 
                isOpen 
                 ? 'hover:bg-gray-400'
                 : 'hover:none' 
                : isOpen 
                 ? 'hover:bg-gray-400' 
                 : 'hover:none'
                )}
              onClick={()=>setType(item.type)}
            >
              {item.icon}
              {isOpen && <span className="text-lg">{item.title}</span>}
            </button>
          ))}
        </div>
      </div>

      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}