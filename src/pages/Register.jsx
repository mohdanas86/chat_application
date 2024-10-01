import React, { useState } from "react";
import axios from "axios";
import GenderCheckBox from "../components/GenderCheckBox";
import toast from "react-hot-toast";
import { useAuthcontext } from "../context/auth.context";

const Register = () => {
  const { setAuthUser } = useAuthcontext();

  const [input, setInput] = useState({
    fullname: "",
    username: "",
    email: "",
    gender: "",
    password: "",
  });

  const onCheckBoxChange = (gender) => {
    setInput({ ...input, gender });
  };

  const handelForm = async (e) => {
    e.preventDefault();

    if (
      !input.fullname ||
      !input.username ||
      !input.gender ||
      !input.password
    ) {
      toast.error("Please fill out all required fields.");
      return; // Exit the function if the fields are not filled out
    }

    try {
      const url = "http://localhost:4000/api/auth/signup";
      const response = await axios.post(url, input);

      setAuthUser(response.data.userdata);
      // console.log(response.data.userdata);
      // console.log("token", response.data.token);

      // token set
      localStorage.setItem("token", response.data.token);
    } catch (err) {
      // Handle errors and display a user-friendly message
      toast.error(err);
      console.log(err);
    }
  };

  return (
    <div className="register w-full" id="register">
      <div className="w-full lg:w-[80%] mx-auto flex justify-center items-center px-4 py-6">
        <form
          onSubmit={handelForm}
          className="registerForm grid grid-cols-1 gap-3 py-6 lg:px-4 lg:w-[50%]"
        >
          <h1 className="text-4xl font-bold mx-auto">Sign up with Email</h1>
          <p className="mt-2 lg:mb-4 mb-8 text-slate-600 text-center">
            Get chatting with friends and family today by signing up for our
            chat app!
          </p>
          {/* FULL NAME */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold text-blue-500">
                full name
              </span>
            </div>
            <input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={(e) => setInput({ ...input, fullname: e.target.value })}
              className="w-full border-b-[1.5px] border-gray-300 rounded-none outline-none px-4 py-1"
            />
          </label>

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

          {/* EMAIL */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold text-blue-500">
                email
              </span>
            </div>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
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

          {/* GENDER CHEACKBOX */}
          <GenderCheckBox
            onCheckBoxChange={onCheckBoxChange}
            selectGender={input.gender}
          />

          <button className="btn btn-block bg-blue-700 text-white font-semibold mt-12 lg:rounded-lg rounded-3xl">
            Create an account
          </button>

          <span className="text-slate-600 mx-auto">
            Allready have an account{" "}
            <a href="/login" className="text-blue-500">
              log in
            </a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
