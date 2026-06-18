import { LoaderCircleIcon } from "lucide-react";
import { useUserContext } from "../context/AuthContext";
import { Outlet, Navigate } from "react-router";


const ProtectedRoute = () => {
    const {user, loading} = useUserContext();

    if(loading){
        return (
            <>
                <div className="w-full h-screen bg-black flex items-center justify-center">
                    <LoaderCircleIcon className="text-white animate-spin"/>
                </div>
            </>
        )
    }
    
    return user === null ? <Navigate to={"/signin"} replace/> : <Outlet/>; 
}

export default ProtectedRoute