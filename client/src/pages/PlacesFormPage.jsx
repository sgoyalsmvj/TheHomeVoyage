import React, { useEffect, useState } from "react";
import Perks from "../components/Perks";
import { PhotoUploader } from "../components/PhotoUploader";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const PlacesFormPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    console.log(photos);
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      const { data } = response;
      console.log(data);
      setTitle(data.place.title);
      setAddress(data.place.address);
      setPhotos(data.place.photos);
      setDescription(data.place.description);
      setPerks(data.place.perks);
      setExtraInfo(data.place.extraInfo);
      setCheckIn(data.place.checkIn);
      setCheckOut(data.place.checkOut);
      setMaxGuests(data.place.maxGuests);
      setPrice(data.place.price);
    });
  }, [id]);

  async function handleDelete(ev) {
    ev.preventDefault();
    try {
      await axios.delete(`/places/${id}`);
      setRedirect(true);
    } catch (error) {
      console.error("Error deleting place:", error);
    }
  }

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    try {
      if (id) {
        // Update existing place
        await axios.put(`/places/${id}`, placeData);
      } else {
        // Create new place
        await axios.post("/places", placeData);
      }
      setRedirect(true);
    } catch (error) {
      console.error("Error saving place:", error);
    }
  }

  if (redirect) {
    return <Navigate to="/account/places" />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {/* Title */}
        <h2 className="text-2xl mt-4">Title</h2>
        <p className="text-gray-500 text-sm mb-2">
          Title for your place. Should be short and catchy as in advertisement.
        </p>
        <Input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="Title, for example: My lovely apt"
        />

        {/* Address */}
        <h2 className="text-2xl mt-4">Address</h2>
        <p className="text-gray-500 text-sm mb-2">Address to this place.</p>
        <Input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="Address"
        />

        {/* Photos */}
        <h2 className="text-2xl mt-4">Photos</h2>
        <p className="text-gray-500 text-sm mb-2">More photos = better.</p>
        <PhotoUploader photos={photos} onChange={setPhotos} />

        {/* Description */}
        <h2 className="text-2xl mt-4">Description</h2>
        <p className="text-gray-500 text-sm mb-2">Description of the place.</p>
        <Textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />

        {/* Perks */}
        <h2 className="text-2xl mt-4">Perks</h2>
        <p className="text-gray-500 text-sm mb-2">
          Select all the perks of your place.
        </p>
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>

        {/* Extra info */}
        <h2 className="text-2xl mt-4">Extra Info</h2>
        <p className="text-gray-500 text-sm mb-2">House rules, etc.</p>
        <Textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />

        {/* Check in/out times */}
        <h2 className="text-2xl mt-4">Check in & out times</h2>
        <p className="text-gray-500 text-sm mb-2">
          Add check-in and check-out times. Remember to have some time window
          for cleaning the room between guests.
        </p>
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <Input
              type="text"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              placeholder="14"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <Input
              type="text"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              placeholder="11"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <Input
              type="number"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <Input
              type="number"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>
        </div>

        {/* Save and Delete Buttons */}
        <Button className="primary my-4">Save</Button>
        {id && (
          <Button className="ml-2" variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        )}
      </form>
    </div>
  );
};

export default PlacesFormPage;
