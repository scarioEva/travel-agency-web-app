import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { CircularProgress, Typography } from "@mui/material";

export const Weather = ({ destination, mainData }) => {
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(true);

  const getImage = async () => {
    setLoader(true);

    try {
      let res = await axios.get(`/place/getWeather?location=${destination}`);

      if (res?.status === 200) {
        setData({ ...res?.data?.data });
      }

      setLoader(false);
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  };

  console.log(data);
  const getTime = (timestamp) => {
    let milliseconds = timestamp * 1000;
    let date = new Date(milliseconds);
    let hours = ("0" + date.getUTCHours()).slice(-2);
    let minutes = ("0" + date.getUTCMinutes()).slice(-2);
    let seconds = ("0" + date.getUTCSeconds()).slice(-2);
    return hours + ":" + minutes + ":" + seconds;
  };

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
        <>
          <div>
            <div className="bg-white mt-2 p-4 border border-gray-100 rounded-lg shadow-xl">
              <Typography variant="h6" style={{ fontWeight: "600" }}>
                Weather details
              </Typography>
              <div className="mt-2">
                <div className="flex items-center gap-4">
                  <div>
                    {data?.weather?.length > 0 && (
                      <img
                        width={70}
                        src={data?.weather[0]?.logo || ""}
                        alt={data?.weather[0]?.main || ""}
                      />
                    )}
                  </div>
                  <div>
                    <span className="block -ml-5" style={{ fontSize: "24px" }}>
                      {data?.main?.temp} &deg;
                    </span>
                  </div>
                  <div className="flex-grow">
                    <span className="block text-right">
                      {data?.weather[0]?.main || ""}
                    </span>
                    <span
                      className="block text-gray-400 text-right -mt-2"
                      style={{ fontSize: "14px" }}
                    >
                      {data?.weather[0]?.desc || ""}
                    </span>
                  </div>
                </div>
                <div className="mt-4" style={{ fontSize: "14px" }}>
                  <div>
                    <span className="font-bold">Feels like: </span>
                    <span>{data?.main?.feels_like} &deg;</span>
                  </div>
                  <div>
                    <span className="font-bold">Pressure: </span>
                    <span>{data?.main?.pressure}</span>
                  </div>
                  <div>
                    <span className="font-bold">Humidity: </span>
                    <span>{data?.main?.humidity}</span>
                  </div>
                  <div>
                    <span className="font-bold">Visibility: </span>
                    <span>{data?.visibility}</span>
                  </div>
                  <div>
                    <span className="font-bold">Wind speed: </span>
                    <span>{data?.wind?.speed}</span>
                  </div>
                  <div>
                    <span className="font-bold">Clouds: </span>
                    <span>{data?.clouds?.all}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white mt-3 p-4 border border-gray-100 rounded-lg shadow-xl">
              <Typography variant="h6" style={{ fontWeight: "600" }}>
                Other details
              </Typography>
              <div
                className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2"
                style={{ fontSize: "14px" }}
              >
                <div>
                  <span className="font-bold">Latitude: </span>
                  <span>{data?.coord?.lat}</span>
                </div>
                <div>
                  <span className="font-bold">Longitude: </span>
                  <span>{data?.coord?.lon}</span>
                </div>
                <div>
                  <span className="font-bold">Country: </span>
                  <span>{mainData?.country}</span>
                </div>
                <div>
                  <span className="font-bold">Population: </span>
                  <span>{mainData?.population}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
