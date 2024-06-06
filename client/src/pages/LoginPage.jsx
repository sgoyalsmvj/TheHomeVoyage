import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../userContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(""); // Add an error state
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      alert("login successful!");
      setUser(data);
      setRedirect(true);
    } catch (error) {
      // Set the error message based on the response from the server
      if (error.response && error.response.status === 401) {
        setError("Wrong username or password."); // Specific error message for wrong credentials
      } else {
        setError("An error occurred. Please try again later."); // General error message
      }
    }
  }

  async function handleGoogleLogin(ev) {
    ev.preventDefault();
    window.location.href = `${import.meta.env.VITE_BASEURL}/google`;
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="-mb-128">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form
          className="max-w-md w-[300px] mx-auto flex flex-col items-center justify-center"
          onSubmit={handleLoginSubmit}
        >
          <Input
            type="email"
            placeholder="Email"
            className="mb-2"
            value={email}
            onChange={(ev) => {
              setEmail(ev.target.value);
              setError("");
            }}
          />
          <Input
            type="password"
            placeholder="Password"
            className="mb-2"
            value={password}
            onChange={(ev) => {
              setPassword(ev.target.value);
              setError("");
            }}
          />
          {error && <p className="text-red-500 mb-2">{error}</p>}{" "}
          {/* Display the error message */}
          <Button className="mb-2 w-full">Login</Button>
          <Button onClick={handleGoogleLogin} className="bg-red-600 w-full">
            Login with GOOGLE
          </Button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?
            <Link className="underline text-red" to={"/register"}>
              Register Now!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
