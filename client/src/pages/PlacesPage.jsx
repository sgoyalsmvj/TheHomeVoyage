import { Link, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../components/PlaceImg";
// import { Button } from "@/components/ui/button";
export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data.places);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place, index) => (
            <div key={index} className="my-4">
              <div className="flex justify-center items-center cursor-pointer gap-4 bg-gray-100 pr-4 m-4 rounded-xl shadow-sm shadow-gray-300">
                <div className=" w-1/6  grow shrink-0 ">
                  <PlaceImg className="rounded-lg" place={place} />
                </div>
                <div className="grow-0 shrink w-3/4">
                  <h2 className="text-2xl font-medium">{place.title}</h2>
                  <p className="text-md mt-2">{place.description}</p>
                </div>
                <Link to={"/account/places/" + place._id}>
                  <button className="h-10 px-4 py-2 bg-primary rounded-md  text-primary-foreground hover:bg-primary/90">Edit</button>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
