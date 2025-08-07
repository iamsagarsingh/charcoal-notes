import React, { useState } from "react";
import { authService } from "../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { useToast } from "../notifications/ToastProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const {showToast} = useToast()

  async function handleSubmit(event) {
    event.preventDefault();
    const authStatus = await authService.Login(email, password);
    if (authStatus) {
      const userData = await authService.getAcc();
      if (userData) {
        dispatch({
          type: "LOGIN",
          payload: {
            $id: userData.$id,
            name: userData.name,
            email: userData.email,
          },
        });
        showToast('success','success')
        navigate("/dashboard");
      }
      else{
        showToast('failed', 'error')
    }
    }
  }
  return (
    <div className="flex justify-center items-center my-24 bg-sky-50 px-4">
      <div className="w-full max-w-sm bg-blue-100 border-4 border-black p-6 shadow-[6px_6px_0px_rgba(0,0,0,1)] rounded-lg">
        <h2 className="text-2xl font-extrabold mb-6 text-center border-b-4 border-black pb-2">
          Login
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

          {/* Password */}
          <div>
            <label className="block text-sm font-bold mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border-4 border-black bg-white shadow-[3px_3px_0px_rgba(0,0,0,1)] focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-4 bg-white text-black border-4 border-black py-2 font-bold shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-blue-200 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
