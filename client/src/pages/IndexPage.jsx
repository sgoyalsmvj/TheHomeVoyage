import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Image from "../components/Image";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces(response.data.places);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index}>
            <Skeleton height={400} className="mb-2 rounded-2xl" />
            <h2 className="font-bold"><Skeleton width={`60%`} /></h2>
            <h3 className="text-sm text-gray-500"><Skeleton width={`80%`} /></h3>
            <div className="mt-1">
              <span className="font-bold"><Skeleton width={`40%`} /></span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {places.length > 0 && places.map((place, index) => (
        <Link to={'/places/' + place._id} key={index}>
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
            {place.photos?.[0] ? (
              <Image className="rounded-2xl object-cover aspect-square" src={place.photos[0]} alt="" />
            ) : (
              <Skeleton height={200} className="rounded-2xl aspect-square" />
            )}
          </div>
          <h2 className="font-bold">{place.address}</h2>
          <h3 className="text-sm text-gray-500">{place.title}</h3>
          <div className="mt-1">
            <span className="font-bold">${place.price}</span> per night
          </div>
        </Link>
      ))}
    </div>
  );
}
