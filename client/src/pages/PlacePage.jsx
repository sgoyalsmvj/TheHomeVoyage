import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";
import AddressLink from "../components/AddressLink";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState();

  useEffect(() => {
    if (!id) return;
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data.place);
      console.log(response.data.place);
    });
  }, [id]);
  if (!place) return "";

  return (
    <div className="mt-4 mx-8 px-8 pt-6 flex flex-col items-start">
      <h1 className="text-4xl font-semibold ml-3 ">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <div className="flex justify-center items-center ">
        <PlaceGallery place={place} />
      </div>
      <div className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr] ">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl ">Description</h2>
            {place.description.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
          Check-In : {place.checkIn}:00
          <br />
          Check-Out : {place.checkOut}:00
          <br />
          Max number of Guests : {place.maxGuests}
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl ">Extra Info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5 ">
          {place.extraInfo.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
