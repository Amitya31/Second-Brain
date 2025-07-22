
import { useState, type ReactNode } from "react";
import Sidebar from "./Sidebar";
import Button from "./ui/Button";
import Navbar from "./Navbar";
interface SidebarProps {
  children: ReactNode
}

function Applayout({children}:SidebarProps) {
  const [sidebarOpen,setSidebarOpen] = useState<boolean>(true)

  // const openSidebar =()=> {
  //   setSidebarOpen(true)
  // }

  // const closeSidebar = ()=>{
  //    setSidebarOpen(false)
  // }

  return (
    <div className=" flex w-screen  ">
    <Sidebar />
    <div className="w-full h-screen flex flex-col ">
    <Navbar />
    {children}
    </div>
    </div>   
  )
}

export default Applayout