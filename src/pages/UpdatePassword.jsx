import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authService } from "../appwrite/Auth";
import { useToast } from "../notifications/ToastProvider";

export const UpdatePassword = () =>{
    const [password,setPassword] = useState('')
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const userId = searchParams.get('userId')
    const secret = searchParams.get('secret')
    const navigate = useNavigate()
    const {showToast} = useToast()
    const handleReset = (e) =>{
        e.preventDefault()
        if(userId && secret){
            authService.updatePasswordRecovery(userId,secret,password)
            .then(()=>{
                showToast('Reset-successful','success')
                navigate('/login')
            })
            .catch((err)=>{
                showToast('failed','error')
            })
        }
    }
     return (
    <div className="flex justify-center items-center my-24 bg-sky-50 px-4">
      <div className="w-full max-w-sm bg-blue-100 border-4 border-black p-6 shadow-[6px_6px_0px_rgba(0,0,0,1)] rounded-lg">
        <h2 className="text-2xl font-extrabold mb-6 text-center border-b-4 border-black pb-2">
          Reset Password
        </h2>
        <form className="space-y-4" onSubmit={handleReset}>
          {/* New Password */}
          <div>
            <label className="block text-sm font-bold mb-1" htmlFor="email">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border-4 border-black bg-white shadow-[3px_3px_0px_rgba(0,0,0,1)] focus:outline-none"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-4 bg-white text-black border-4 border-black py-2 font-bold shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-blue-200 transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}