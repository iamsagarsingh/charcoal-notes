import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { authService } from "../appwrite/auth";

const Navbar = () => {
    const {state, dispatch} = useAuth()
    const navigate = useNavigate()
    async function handleLogout(){
        await authService.Logout()
        dispatch({type:"LOGOUT"})
        navigate('/login')
    }
  return (
    <nav className="bg-blue-200 text-black shadow-[4px_4px_0px_rgba(0,0,0,1)] border-4 border-black px-2 py-2 md:px-4 md:py-4 flex items-center justify-between mx-2">
      <div className="text-lg md:text-2xl font-extrabold tracking-wide">
        <span className="bg-white border-4 border-black px-3 py-1 shadow-[3px_3px_0px_rgba(0,0,0,1)]">
          Charcoal-Notes
        </span>
      </div>
      <ul className="flex gap-4 text-lg font-semibold">
        {
            state.status ? 
            (
                <ul className="flex gap-4 font-semibold items-center">
                <li className="text-2xl font-bold">
                    {state?.userData?.name}
                </li>
          <li className="bg-white border-4 border-black px-4 py-1 shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:bg-gray-100 cursor-pointer transition" onClick={handleLogout}>
            Logout
          </li>
                </ul>
            )
            :
            (
                <>
                <Link to="/login">
          <li className="bg-white border-4 border-black px-4 py-1 shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:bg-gray-100 cursor-pointer transition">
            Login
          </li>
        </Link>
        <Link to="/signup">
          <li className="bg-white border-4 border-black px-4 py-1 shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:bg-gray-100 cursor-pointer transition">
            Signup
          </li>
        </Link>
                </>
            )
        }
      </ul>
    </nav>
  );
};

export default Navbar;
