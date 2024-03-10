import { Typography } from "@mui/material";
import { Images } from "../components/DestinationInfo/Images";
import { Weather } from "../components/DestinationInfo/Weather";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import { Cuisine } from "../components/DestinationInfo/Cuisine";
import { Attractions } from "../components/DestinationInfo/Attractions";
import { shallowEqual, useSelector } from "react-redux";

export const DestInfo = () => {
  const location = useSelector(
    (state) => state?.listReducer?.location_obj,
    shallowEqual
  );

  const [data, setData] = useState({});

  const getDetails = async () => {
    try {
      let res = await axios.get(`/place?location=${location?.to}`);
      if (res?.status == 200) {
        console.log(res);
        setData({ ...res?.data?.data });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      <div className="h-full overflow-auto p-4">
        <Typography variant="h4" style={{ fontWeight: "600" }}>
          About {location?.to}
        </Typography>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="col-span-7  py-2">
            <Images destination={location?.to} />
          </div>
          <div className="col-span-5">
            <div>
              <Weather destination={location?.to} mainData={data} />
            </div>
          </div>
        </div>

        <div>
          <Cuisine destination={location?.to} />
        </div>
        <div>{/* <Attractions destination={destination} /> */}</div>
      </div>
    </>
  );
};
