import { useEffect, useState } from "react";
import { FlightList } from "../components/flightList";
import axios from "../api/axios";
import { useDispatch } from "react-redux";
import { setBookingId, setFlightId } from "../redux/actions/list";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";

export const MyBookings = () => {
  const [flightData, setFlightData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBookings();
    dispatch(setFlightId(""));
  }, []);

  const getBookings = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/booking/getAll`);
      console.log(res);
      if (res?.status == 200) {
        setFlightData([...res?.data?.data]);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const selectBooking = (id) => {
    dispatch(setBookingId(id));
    navigate("/booking");
  };

  return (
    <>
      <div className="px-4 h-full">
        <div className="mt-4">
          <Typography variant="h4" style={{ fontWeight: "600" }}>
            Your Bookings
          </Typography>
        </div>
        {loading ? (
          <>
            <div className=" h-full flex justify-center items-center">
              <div className="-mt-40">
                <CircularProgress color="secondary" size={100} />
              </div>
            </div>
          </>
        ) : (
          <>
            {flightData?.length > 0 ? (
              <>
                {flightData?.map((itm, idx) => {
                  return (
                    <div className="bg-white p-4 rounded-md shadow-xl border border-gray-100 mt-4">
                      <table style={{ width: "100%" }}>
                        <tbody>
                          <FlightList
                            itm={itm?.flight_details}
                            button={false}
                            idx={idx}
                            id={itm?._id}
                            hover={true}
                            onSelect={(val) => selectBooking(val)}
                          />
                        </tbody>
                      </table>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="h-full flex justify-center items-center">
                <div>
                  <img
                    className="-mt-36 block"
                    src="/images/not_found.svg"
                    style={{ width: "200px" }}
                    alt=""
                  />
                  <span className="block">You don't have any booking!</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
