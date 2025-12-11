import { TwitterLogoIcon, VideoIcon } from "@radix-ui/react-icons";
import { FilesIcon, LogOutIcon, MicIcon, PanelLeftIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { cn } from "../lib/utils";
import useIsmobile from "../Hooks/use-mobile";
import useContentType from "../Hooks/ContentTypeHook";
import { useAuth } from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface SidebarItemProp  {
  title: string;
  icon: ReactNode;
  type: string;
}

const SidebarItems: SidebarItemProp[] = [
  { title: "Video", icon: <VideoIcon className="h-6 w-6" />, type: "video" },
  { title: "Audio", icon: <MicIcon className="h-6 w-6" />, type: "audio" },
  { title: "Document", icon: <FilesIcon className="h-6 w-6" />, type: "document" },
  { title: "Tweet", icon: <TwitterLogoIcon className="h-6 w-6" />, type: "tweet" },
];

export default function Sidebar() {
  const isMobile = useIsmobile();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { setType } = useContentType();
  const { logout } = useAuth();
  const [isActive, setActive] = useState<string>(() => localStorage.getItem("sidebar-active") ?? "video");
  const navigate = useNavigate();

  // init sidebar open state
  useEffect(() => {
    const storedState = localStorage.getItem("sidebar-open");
    if (storedState !== null) {
      setIsOpen(storedState === "true");
    } else {
      setIsOpen(!isMobile);
    }
  }, [isMobile]);

  // persist open state
  useEffect(() => {
    localStorage.setItem("sidebar-open", String(isOpen));
  }, [isOpen]);

  // persist active item
  useEffect(() => {
    if (isActive) localStorage.setItem("sidebar-active", isActive);
  }, [isActive]);

  const toggleSidebar = useCallback(() => setIsOpen(prev => !prev), []);

  const sidebarClass = useMemo(
    () =>
      cn(
        "fixed z-40 top-0 left-0 min-h-screen bg-black text-white transition-all duration-300 ease-in-out lg:relative lg:z-0",
        isMobile ? (isOpen ? "w-64 shadow-xl" : "w-0 overflow-hidden") : (isOpen ? "w-64" : "w-0")
      ),
    [isMobile, isOpen]
  );

  const handleLogout = async () => {
    try {
      // logout from auth hook (should clear token)
      await logout();
      toast.success("Logged out");
      navigate("/auth");
    } catch (err) {
      console.error(err);
      toast.error("Logout failed");
    }
  };

  return (
    <div className={sidebarClass} aria-hidden={isOpen ? "false" : "true"}>
      <button
        type="button"
        onClick={toggleSidebar}
        aria-expanded={isOpen}
        aria-label="Toggle sidebar"
        className="fixed left-0 top-0 mt-2 lg:left-4 z-50 lg:static lg:ml-2 p-3 bg-transparent text-white rounded hover:bg-gray-700"
      >
        <PanelLeftIcon className="h-6 w-6" />
      </button>

      <div className="p-1 mt-12">
        {SidebarItems.map((item) => (
          isOpen && (
            <button
              key={item.type}
              type="button"
              className={cn(
                "flex items-center gap-3 py-2 px-4 w-full text-left rounded transition-colors",
                "hover:bg-gray-600",
                item.type === isActive ? "bg-neutral-500 text-white font-semibold" : "text-white/90"
              )}
              onClick={() => { setType(item.type); setActive(item.type); }}
              aria-pressed={item.type === isActive}
            >
              <div className="flex-none">{item.icon}</div>
              <span className="text-xl">{item.title}</span>
            </button>
          )
        ))}
      </div>

      <div className="p-6 mt-auto mb-6">
        {isOpen && (
          <button
            type="button"
            className="flex items-center gap-3 py-2 px-4 w-full text-left bg-red-600 hover:bg-red-500 rounded text-lg"
            onClick={handleLogout}
          >
            <LogOutIcon className="h-5 w-5" />
            <span>Logout</span>
          </button>
        )}
      </div>
    </div>
  );
}
