import { CircularProgress } from "@mui/material";
import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const Images = ({ destination }) => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  const getImage = async () => {
    setLoader(true);

    try {
      let res = await axios.get(`/place/getImage?name=${destination}`);

      if (res?.status === 200) {
        setData([...res?.data?.data]);
      }
      setLoader(false);
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  };
  console.log(data);
  useEffect(() => {
    if (destination) getImage();
  }, [destination]);
  return (
    <>
      {loader ? (
        <div className="flex items-center justify-center">
          <CircularProgress size={50} color="secondary" />
        </div>
      ) : (
        <div className="custom-slider ">
          <Carousel dynamicHeight={false} infiniteLoop={true} autoPlay={true}>
            {data?.map((itm, idx) => {
              return (
                <div key={idx}>
                  <img src={itm} alt={"img" + idx} />
                </div>
              );
            })}
          </Carousel>
        </div>
      )}
    </>
  );
};
