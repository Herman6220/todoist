import { Link } from "react-router"
import { useUserContext } from "../context/AuthContext"
import { AnimatedLogo } from "../components/Logo";

const Home = () => {
    const { user } = useUserContext();

    return (
        <div className="w-full h-screen bg-black flex-1 relative">
            <div className="flex w-full h-30 absolute top-0 justify-center items-center lg:p-8 p-2">
                <div className="[box-shadow:inset_0px_0px_10px_#aaa] w-full h-full max-w-7xl flex items-center justify-end rounded-3xl overflow-hidden bg-neutral-500/20">
                    {user === null ? (
                        <Link
                            to={"/signin"}
                            className="p-5 px-6 text-white z-10 rounded-2xl transition-all duration-300 flex gap-2 items-center justify-center relative group"
                        >
                            <div className="absolute w-full h-full rounded-3xl blur-md group-hover:opacity-100 opacity-0 bg-blue-500/90 translate-x-20 group-hover:translate-x-0 transition-all duration-1000"></div>
                            <p className="text-xs relative font-semibold">Sign In</p >
                        </Link>
                    ) : (
                        <Link
                            to={"/task"}
                            className="p-5 px-6 text-white z-10 rounded-2xl transition-all duration-300 flex gap-2 items-center justify-center relative group"
                        >
                            <div className="absolute w-full h-full rounded-3xl blur-md group-hover:opacity-100 opacity-0 bg-blue-500/90 translate-x-20 group-hover:translate-x-0 transition-all duration-1000"></div>
                            <p className="text-xs relative font-semibold">Task</p >
                        </Link>
                    )}
                </div>
            </div>
            <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
                <div className="flex-col flex items-center justify-center lg:pb-14 pb-60">
                    <div className="flex items-center justify-center gap-2">
                        <style>
                            {`
                                @keyframes intoGlass{
                                    0%{
                                        box-shadow: inset 0px 0px 0px #000;
                                    }
                                    30%{
                                        box-shadow: inset 0px 0px 1px #555;
                                    }
                                    60%{
                                        box-shadow: inset 1px 2px 4px #aaa;
                                    }
                                    70%{    
                                        transform: scale(1);
                                        box-shadow: inset 1px 2px 4px #aaa;
                                    }
                                    90%{
                                        transform: scale(1.05);
                                        box-shadow: inset 1px 2px 4px #aaa;
                                    }
                                    92%{
                                        transform: scale(1);
                                        box-shadow: inset 1px 2px 4px #aaa;
                                    }
                                    100%{
                                        box-shadow: inset 1px 2px 4px #aaa, 0px 2px 40px #779;
                                    }
                                }
                            `}
                        </style>
                        <div
                            style={{ animation: "intoGlass 2s forwards", animationDelay: "1s" }}
                            className="lg:size-28 md:size-14 size-14 lg:rounded-3xl md:rounded-2xl rounded-xl pb-2">
                            <AnimatedLogo />
                        </div>
                        <h1 className="lg:text-9xl md:text-7xl text-5xl text-transparent bg-clip-text bg-gradient-to-b from-slate-100 via-slate-400 to-slate-500 tracking-tighter">TODOIST</h1>
                    </div>
                    <p className="text-slate-200 md:text-base text-xs md:block hidden">Complete your goals on time.</p>
                </div>
                <div className="w-full h-32 bg-blue-300 absolute bottom-20 rounded-[100%] blur-3xl opacity-30"></div>
                <div className="w-full h-60 absolute -bottom-10">
                    <img src="/shaderbg4.png" className="w-full h-full object-cover object-bottom" />
                </div>

                <style>
                    {`
                        @keyframes slideLeftUp{
                            0%{
                                transform: translate(30px, 30px) rotate(5deg);
                            }
                            100%{
                                transform: translate(0, 0);
                            }
                        }
                        @keyframes slideLeftUpAndRotate{
                            0%{
                                transform: translate(30px, 30px) rotate(10deg);
                            }
                            100%{
                                transform: translate(0, 0) rotate(3deg);
                            }
                        }
                    `}
                </style>
                <div
                    className="[animation:slideLeftUpAndRotate_1s_ease-in-out] lg:w-80 w-72 absolute bg-neutral-500/20 rounded-3xl lg:bottom-16 lg:right-12 bottom-[10%] right-[5%] flex flex-col gap-4 [box-shadow:inset_0px_0px_8px_#aaa] backdrop-blur-md rotate-3"
                >
                    <div className="flex text-white items-end gap-2 justify-between px-8 pt-8">
                        <div className="flex items-end gap-2">
                            <h1 className="text-4xl">April</h1>
                            <p>2</p>
                        </div>
                        <p>2028</p>
                    </div>
                    <div className="border-b mb-2 mx-8"></div>
                    <div className="flex justify-between text-white py-1 px-8 [mask-image:linear-gradient(to_right,transparent_0%,black_20%,black_80%,transparent_100%)] ">
                        <div className="flex flex-col items-center justify-center group relative p-1">
                            <div className="absolute bg-white/30 blur-sm group-hover:opacity-100 opacity-0 w-full h-full transition-all duration-300 rounded-lg"></div>
                            <p className="text-[10px]">W</p>
                            {/* <CircleCheckIcon /> */}
                            <p className="p-1 px-2">24</p>
                        </div>
                        <div className="flex flex-col items-center justify-center group relative p-1">
                            <div className="absolute bg-white/30 blur-sm group-hover:opacity-100 opacity-0 w-full h-full transition-all duration-300 rounded-lg"></div>
                            <p className="text-[10px]">T</p>
                            <p className="p-1 px-2">25</p>
                        </div>
                        <div className="flex flex-col items-center justify-center group relative p-1">
                            <div className="absolute bg-white/30 blur-sm group-hover:opacity-100 opacity-0 w-full h-full transition-all duration-300 rounded-lg"></div>
                            <p className="text-[10px]">F</p>
                            <p className="p-1 px-2">26</p>
                        </div>
                        <div className="flex flex-col items-center justify-center group relative p-1">
                            <div className="absolute bg-white/30 blur-sm group-hover:opacity-100 opacity-0 w-full h-full transition-all duration-300 rounded-lg"></div>
                            <p className="text-[10px]">S</p>
                            <p className="p-1 bg-blue-500 rounded-lg px-2 [box-shadow:inset_0px_0px_4px_#005]">27</p>
                        </div>
                        <div className="flex flex-col items-center justify-center group relative p-1">
                            <div className="absolute bg-white/30 blur-sm group-hover:opacity-100 opacity-0 w-full h-full transition-all duration-300 rounded-lg"></div>
                            <p className="text-[10px]">S</p>
                            <p className="p-1 px-2">28</p>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="group relative p-2 pb-8">
                            <button className="text-white w-full text-sm relative">Add Task</button>
                        </div>
                    </div>
                </div>

                <div
                    // style={{ animation: "slideLeftUp 0.5s ease-in-out" }}
                    className="[animation:slideLeftUp_0.5s_ease-in-out]  lg:w-80 w-72 absolute bg-neutral-500/20 rounded-3xl lg:bottom-20 lg:right-20 bottom-[12%] flex flex-col gap-4 [box-shadow:inset_0px_0px_8px_#aaa] backdrop-blur-md overflow-hidden"
                >
                    <div className="flex text-white items-end gap-2 justify-between pt-8 px-8">
                        <div className="flex items-end gap-2">
                            <h1 className="text-4xl">April</h1>
                            <p>2</p>
                        </div>
                        <p>2028</p>
                    </div>
                    <div className="border-b mb-2 mx-8"></div>
                    <div className="flex justify-between text-white py-1 [mask-image:linear-gradient(to_right,transparent_0%,black_20%,black_80%,transparent_100%)] px-8">
                        <div className="flex flex-col items-center justify-center group relative p-1">
                            <div className="absolute bg-white/30 blur-sm group-hover:opacity-100 opacity-0 w-full h-full transition-all duration-300 rounded-lg"></div>
                            <p className="text-[10px]">W</p>
                            {/* <CircleCheckIcon /> */}
                            <p className="p-1 px-2">24</p>
                        </div>
                        <div className="flex flex-col items-center justify-center group relative p-1">
                            <div className="absolute bg-white/30 blur-sm group-hover:opacity-100 opacity-0 w-full h-full transition-all duration-300 rounded-lg"></div>
                            <p className="text-[10px]">T</p>
                            <p className="p-1 px-2">25</p>
                        </div>
                        <div className="flex flex-col items-center justify-center group relative p-1">
                            <div className="absolute bg-white/30 blur-sm group-hover:opacity-100 opacity-0 w-full h-full transition-all duration-300 rounded-lg"></div>
                            <p className="text-[10px]">F</p>
                            <p className="p-1 px-2">26</p>
                        </div>
                        <div className="flex flex-col items-center justify-center group relative p-1">
                            <div className="absolute bg-white/30 blur-sm group-hover:opacity-100 opacity-0 w-full h-full transition-all duration-300 rounded-lg"></div>
                            <p className="text-[10px]">S</p>
                            <p className="p-1 bg-blue-500 rounded-lg px-2 [box-shadow:inset_0px_0px_4px_#005]">27</p>
                        </div>
                        <div className="flex flex-col items-center justify-center group relative p-1">
                            <div className="absolute bg-white/30 blur-sm group-hover:opacity-100 opacity-0 w-full h-full transition-all duration-300 rounded-lg"></div>
                            <p className="text-[10px]">S</p>
                            <p className="p-1 px-2">28</p>
                        </div>
                    </div>
                    <div className="w-full">
                        <Link to={user === null ? "/signin" : "/task"}>
                            <div className="group relative p-2 pb-8">
                                <div className="w-full absolute h-full bg-blue-500/90 top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-10 blur-md transition-all duration-1000"></div>
                                <button className="text-white w-full text-sm relative">Add Task</button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home