import React, { useContext, useState } from "react";
import { UserContext } from "../userContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";
import { Button } from "@/components/ui/button";
const ProfilePage = () => {
  const [redirect, setRedirect] = useState(false);
  const { ready, user, setUser } = useContext(UserContext);
  let { subPage } = useParams();
  if (subPage === undefined) {
    subPage = "profile";
  }
  if (!ready) {
    return "Loading..";
  }
  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }
  async function logout() {
    await axios.get("/logout");
    setRedirect(true);
    setUser(null);
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <AccountNav />
      {subPage === "profile" && (
        <div className="text-center max-w-lg mx-auto flex flex-col items-center justify-center">
          <p>
            <span>Logged in as</span>{" "}
            <b>
              {" "}
              {user.name} ({user.email})
            </b>
          </p>
          <Button className="primary  max-w-sm mt-4" onClick={logout}>
            Logout
          </Button>
        </div>
      )}
      {subPage === "places" && <PlacesPage />}
    </div>
  );
};

export default ProfilePage;
