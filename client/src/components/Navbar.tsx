import { useNavigate } from "react-router";
import { useUserContext } from "../context/AuthContext";

const Navbar = () => {

    const {setUser} = useUserContext();
    const navigate = useNavigate();

    const handleSignout = async() => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/signout`, {
                method: "POST",
                credentials: "include"
            })
    
            if(!response.ok){
                console.log("Signout Error. Status: ", response.status);
                return;
            }
    
            setUser(null);
            navigate("/");
        } catch (error) {
            console.log("Some unknown error occurred.", error);
        }
    }

  return (
    <div className="bg-black w-full p-4 flex justify-end items-center text-white">
        <button 
            onClick={handleSignout}
            className="bg-red-500/80 p-2 px-4 transition-all duration-300 rounded-lg [box-shadow:inset_0px_0px_4px_#003] hover:[box-shadow:inset_0px_-2px_10px_#003]"
        >
            SignOut
        </button>
    </div>
  )
}

export default Navbar