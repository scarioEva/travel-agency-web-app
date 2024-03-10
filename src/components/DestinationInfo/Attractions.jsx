import { CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const Attractions = ({ destination }) => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [count, setCount] = useState(0);

  const getImage = async () => {
    setLoader(true);

    try {
      let res = await axios.get(
        `/place/getNeaByAttractions?location=${destination}`
      );
      if (res?.status == 200) {
        setData([...res?.data?.data]);
      }

      setLoader(false);
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  };

  useEffect(() => {
    if (destination && count == 0) {
      getImage();
      setCount(1);
    }
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      {loader ? (
        <div className="flex items-center justify-center">
          <CircularProgress size={50} color="secondary" />
        </div>
      ) : (
        <>
          <div className="mt-8">
            <Typography variant="h6" style={{ fontWeight: "600" }}>
              Nearby Attractions
            </Typography>
            <Carousel
              responsive={responsive}
              swipeable={false}
              draggable={false}
            >
              {data?.map((itm, idx) => {
                return (
                  <div
                    key={idx}
                    className={`px-3 h-full ${idx === 0 ? "pl-0" : ""}`}
                  >
                    <div className="bg-white h-full p-4 border border-gray-100 rounded-lg shadow-xl">
                      <span className="font-bold block">{itm?.name}</span>
                      <span className="text-gray-400">{itm?.address}</span>
                    </div>
                  </div>
                );
              })}
            </Carousel>
          </div>
        </>
      )}
    </>
  );
};
