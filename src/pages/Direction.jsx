import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import axios from "../api/axios";
import { Typography } from "@mui/material";
import MovingIcon from "@mui/icons-material/Moving";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export const Direction = () => {
  const location = useSelector(
    (state) => state?.listReducer?.location_obj,
    shallowEqual
  );

  const [loader, setLoader] = useState(true);
  const [data, setData] = useState({});

  const getDirection = async () => {
    setLoader(true);
    try {
      let res = await axios.get(
        `/place/getDirection?from=${location?.from}&to=${location?.to}`
      );

      if (res?.status == 200) {
        setData({ ...res?.data?.data });
      }

      setLoader(false);
    } catch (err) {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (Object.keys(location)?.length > 0) {
      getDirection();
    }
  }, [location]);

  return (
    <>
      <div className="p-4 h-full overflow-auto">
        <Typography variant="h4" style={{ fontWeight: "600" }}>
          Alternate routes ({location?.from} - {location?.to})
        </Typography>
        <div className="mt-4 p-4 rounded-lg border border-gray-200 shadow-xl flex justify-between items-center">
          <div>
            <span className="font-bold">Total distance: </span>
            <span>{data?.distance}</span>
          </div>
          <div>
            <span className="font-bold">Will take around: </span>
            <span>{data?.time_taken}</span>
          </div>
        </div>
        <div className="mt-10">
          <Typography variant="h6" style={{ fontWeight: "600" }}>
            Directions
          </Typography>
        </div>
        <div className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {data?.directions?.map((itm, idx) => {
              return (
                <div className="h-full">
                  <div
                    className={` rounded-lg ${
                      itm?.map ? "h-full" : ""
                    }  border border-gray-200 shadow-xl pb-10 relative `}
                    title={itm?.street}
                  >
                    {data?.directions?.length !== idx + 1 && (
                      <span className="absolute p-2 rounded-full bg-white border border-gray-500">
                        {idx + 1}
                      </span>
                    )}
                    <img
                      src={itm?.map}
                      className="rounded-t-lg w-full"
                      alt=""
                    />
                    <div className="px-4 py-2">
                      <span
                        style={{ fontSize: "11px" }}
                        className="font-bold  block overflow-hidden text-ellipsis whitespace-nowrap"
                      >
                        {itm?.street}
                      </span>
                      <span
                        style={{ fontSize: "11px" }}
                        className="text-gray-500"
                      >
                        {itm?.details}
                      </span>

                      <div className="mt-2 flex justify-between absolute bottom-2 w-full px-2 left-0">
                        <div>
                          <div className="flex gap-1">
                            <div>
                              <MovingIcon style={{ fontSize: "14PX" }} />
                            </div>
                            <div>
                              <span
                                style={{ fontSize: "11px" }}
                                className="text-gray-500"
                              >
                                {itm?.distance}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="flex gap-1">
                            <div>
                              <AccessTimeIcon style={{ fontSize: "14PX" }} />
                            </div>
                            <div>
                              <span
                                style={{ fontSize: "11px" }}
                                className="text-gray-500"
                              >
                                {itm?.time_takes}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
