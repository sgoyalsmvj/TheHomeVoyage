import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(""); 
  const {user} = useContext(UserContext);
  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("registration successful!");
      setRedirect("/") // Redirect to the home page
    } catch (error) {
      alert("Registration Failed! Try Again later.");
    }
  }
  async function handleGoogleLogin(ev) {
    ev.preventDefault();
    window.location.href = `${import.meta.env.VITE_BASEURL}/google`;
  }
  if(redirect){
    return <Navigate to={redirect} />
  }
  return (
    <div className="mt-4 grow flex items-center justify-around ">
      <div className="-mb-128 ">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md w-[300px] mx-auto " onSubmit={registerUser}>
          <Input
            type="text"
            placeholder="Name"
            className="mb-2"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            className="mb-2"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            className="mb-2"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <Button className="primary w-full mb-2">Register</Button>
          <Button onClick={handleGoogleLogin} className="bg-red-600 w-full">
            Sign in with GOOGLE
          </Button>
          <div className="text-center py-2 text-gray-500">
            Already A member?
            <Link className="underline text-black" to={"/login"}>
              Login!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
