import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthcontext } from "../context/auth.context";

const Login = () => {
  const { authUser, setAuthUser } = useAuthcontext();

  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const handelForm = async (e) => {
    e.preventDefault();
    console.log(input);

    if (!input.username || !input.password) {
      toast.error("Fill all fields");
    }

    try {
      const url = "http://localhost:4000/api/auth/login";
      const response = await axios.post(url, input);
      console.log(response.data);
      toast.success(response.data.message);
      setAuthUser(response.data.user);
      // token set
      localStorage.setItem("token", response.data.token)
    } catch (err) {
      console.log("error: ", err.response.data.message);
      toast.error(err.response.data.message);
    }
  };
  return (
    <div className="login w-full" id="register">
      <div className="w-full lg:w-[80%] mx-auto flex justify-center items-center px-4 py-6">
        <form
          onSubmit={handelForm}
          className="loginForm grid grid-cols-1 gap-3 py-6 lg:px-4 lg:w-[50%]"
        >
          <h1 className="text-4xl font-bold mx-auto">Log in</h1>
          <p className="mt-2 lg:mb-4 mb-8 text-slate-600 text-center">
            Welcome back! Sign in using your social account or email to continue
            us
          </p>
          {/* USERNAME */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold text-blue-500">
                username
              </span>
            </div>
            <input
              type="text"
              name="username"
              value={input.username}
              onChange={(e) => setInput({ ...input, username: e.target.value })}
              className="w-full border-b-[1.5px] border-gray-300 rounded-none outline-none px-4 py-1"
            />
          </label>

          {/* PASSWORD */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold text-blue-500">
                password
              </span>
            </div>
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              className="w-full border-b-[1.5px] border-gray-300 rounded-none outline-none px-4 py-1"
            />
          </label>

          <button className="btn btn-block bg-blue-700 text-white font-semibold mt-12 lg:rounded-lg rounded-3xl hover:text-black">
            Log in
          </button>

          <span className="text-slate-600 mx-auto">
            Don't have an account{" "}
            <a href="/signup" className="text-blue-500">
              sign up
            </a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
