import axios from "axios";
import React, { useEffect, useState } from "react";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then((res) => {
      setPlaces(res.data);
    });
  }, []);
  return (
    <div>
      {places.length > 0 &&
        places.map((place) => (
          <div>
            <div>
              {place.photos?.[0] && (
                <img
                  src={"htp://localhost:4000/uploads/" + place.photos?.[0]}
                  alt=""
                />
              )}
            </div>
            {place.title}
          </div>
        ))}
    </div>
  );
};

export default IndexPage;
