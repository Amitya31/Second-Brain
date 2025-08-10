
import { type ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
interface SidebarProps {
  children: ReactNode
}

function Applayout({children}:SidebarProps) {

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