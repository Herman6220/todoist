import { Link } from "react-router"
import { PanelLeftIcon } from "lucide-react";
import { Logo } from "./Logo";
import { createContext, useContext, useEffect, useRef, useState } from "react";

interface TableInterface {
    owner: string;
    title: string;
    _id: string;
}

interface SidebarContextInterface{
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidebarContext = createContext<SidebarContextInterface | null>(null);

export const SidebarProvider = ({children}: {children: React.ReactNode}) => {
    const [open, setOpen] = useState(true);

    return (
        <SidebarContext.Provider value={{open, setOpen}}>
            {children}
        </SidebarContext.Provider>
    )
}

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if(context === null){
        throw new Error("No sidebar.");
    }
    return context;
}

export const Sidebar = ({ tables }: { tables: TableInterface[] }) => {

    const {open, setOpen} = useSidebar();
    const sidebarRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        console.log("Hello");
        const handleClickOutside = (e: MouseEvent | TouchEvent) => {
            if(window.innerWidth >= 768) return;
            if(sidebarRef.current && !sidebarRef.current.contains(e.target as Node)){
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [setOpen])

    return (
        <div className={`w-full h-full flex lg:justify-center ${open ? "md:max-w-xs" : "md:max-w-24 hidden md:flex"} md:p-4 transition-all duration-300 fixed top-0 left-0 z-50 md:relative backdrop-blur-sm md:backdrop-blur-0`}>
            <div ref={sidebarRef} className={`md:rounded-3xl bg-neutral-800 w-full h-full text-white overflow-hidden p-2 ${open ? "max-w-xs" : "max-w-24"}`}>
                <div className={`p-2 flex items-end ${open ? "md:justify-between justify-end" : "justify-center"}`}>
                    <div className={`${open ? "md:block hidden" : "hidden"} size-7 mb-1`}>
                        <Link to="/">
                            <Logo />
                        </Link>
                    </div>
                    {/* <button
                        onClick={() => setOpen(prev => !prev)}
                        className="pt-2"
                    >
                        <PanelLeftIcon className="size-5" strokeWidth="1" />
                    </button> */}
                    <div className="pt-2">
                        <SidebarTrigger setOpen={setOpen}/>
                    </div>
                </div>
                <div className={`flex-col px-4 gap-2 w-full ${open ? "flex" : "hidden"}`}>
                    <div className="flex p-2 w-full border-b mb-2">
                        <p>History</p>
                    </div>
                    {tables && tables.map((t) => (
                        <div className="w-full flex" key={t._id}>
                            <Link className="hover:bg-neutral-500 w-full h-full px-4 p-1 rounded-lg" to={`/task/${t._id}`}>{t.title}</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export const SidebarTrigger = ({setOpen}: {setOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
    return(
        <>
            <button
                onClick={() => setOpen(prev => !prev)}
            >
                <PanelLeftIcon className="size-5" strokeWidth="1" />
            </button>
        </>
    )
}