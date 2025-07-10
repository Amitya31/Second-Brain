import { type ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
type applayoutProps = {
  children:ReactNode
}

function Applayout({children}:applayoutProps) {

  return (
    <div>
    <div className="flex flex-col h-full m-0 p-0 ">
      <div className="">
        <div className="w-510 fixed">
        <Navbar />
      </div>
      <div className="flex mt-20">
        <div className="fixed w-full ">
          <Sidebar />
        </div>
        <div className="ml-72 w-full z-10 ">
            {children}
      </div>
      </div>
      </div>
    </div>
      
      {/* Main content on the right */}
    </div>
  )
}

export default Applayout