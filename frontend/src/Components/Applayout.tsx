import { type ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface SidebarProps {
  children: ReactNode;
}

function Applayout({ children }: SidebarProps) {
  return (
    <div className="flex w-screen h-screen bg-neutral-900 text-white">
      <Sidebar />
      <div className="w-full flex flex-col overflow-auto">
        <Navbar />
        <main className="p-4 w-full overflow-auto">{children}</main>
      </div>
    </div>
  );
}

export default Applayout;
