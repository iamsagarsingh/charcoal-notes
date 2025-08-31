import { useState } from "react";
import { authService } from "../appwrite/Auth";
import { useToast } from "../notifications/ToastProvider";

export const SendPasswordResetEmail = () => {
  const [email, setEmail] = useState("");
  const  {setToast} = useToast()
  async function handleSubmit(e) {
    e.preventDefault()
    const status = await authService.recoverPassword(email)
    if(status){
        showToast('success','success')
    }
    else{
        console.log("error in handlesub");
        
    }
  }
  return (
    <div className="flex justify-center items-center my-24 bg-sky-50 px-4">
      <div className="w-full max-w-sm bg-blue-100 border-4 border-black p-6 shadow-[6px_6px_0px_rgba(0,0,0,1)] rounded-lg">
        <h2 className="text-2xl font-extrabold mb-6 text-center border-b-4 border-black pb-2">
          Password Reset
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm font-bold mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Ex: you@example.com"
              className="w-full px-4 py-2 border-4 border-black bg-white shadow-[3px_3px_0px_rgba(0,0,0,1)] focus:outline-none"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-4 bg-white text-black border-4 border-black py-2 font-bold shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-blue-200 transition"
          >
            Get Recovery link
          </button>
        </form>
      </div>
    </div>
  );
};
