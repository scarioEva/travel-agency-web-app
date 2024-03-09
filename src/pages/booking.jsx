import { shallowEqual, useDispatch, useSelector } from "react-redux";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import { FlightList } from "../components/flightList";
import { Card, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { ModalStatus } from "../components/ModalStatus";
import { useNavigate } from "react-router-dom";
import { setBookingId, setFlightId } from "../redux/actions/list";

export const Booking = () => {
  const flight_id = useSelector(
    (state) => state?.listReducer?.flight_id,
    shallowEqual
  );

  const booking_id = useSelector(
    (state) => state?.listReducer?.booking_id,
    shallowEqual
  );

  const [flightData, setFlightData] = useState({});
  const [status, setStatus] = useState("");
  const [modalStatus, setModalStatus] = useState(false);
  const [personsData, setPersonsData] = useState([
    {
      name: "",
      age: null,
    },
  ]);
  const [errMsg, setErrMsg] = useState("");
  const [bookingData, setBookingData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getFlightData = async (id) => {
    try {
      const res = await axios.get(`/flight/searchById?id=${id}`);
      console.log(res);
      if (res && res?.data && res?.data?.data) {
        setFlightData({ ...res?.data?.data });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getBookingData = async () => {
    try {
      const res = await axios.get(`/booking/getById?id=${booking_id}`);
      console.log(res);
      if (res?.status === 200) {
        getFlightData(res?.data?.data?.flightId);
        setPersonsData(res?.data?.data?.passenger_details);
        // setFlightData({...res?.data?.data?.})
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (booking_id) getBookingData();
    else if (flight_id) getFlightData(flight_id);
    else navigate("/");
  }, [booking_id, flight_id]);

  const onPersonAdd = () => {
    let persons_list = personsData;
    persons_list.push({
      name: "",
      age: null,
    });

    setPersonsData([...persons_list]);
  };

  const onPersonsDeleteData = (current_idx) => {
    let persons_list = personsData?.filter((itm, idx) => idx != current_idx);

    console.log(persons_list);
    setPersonsData([...persons_list]);
  };

  const onHandleInputChange = (idx, key, value) => {
    let persons_list = personsData;
    persons_list[idx][key] = value;

    setPersonsData([...persons_list]);
  };

  const onHandleSubmit = async () => {
    try {
      if (booking_id) {
        const res = await axios.put(`/booking/update`, {
          payload: {
            passenger_details: personsData,
            id: booking_id,
          },
        });

        if (res?.status == 200) {
          setStatus("update");
          setModalStatus(true);
          setErrMsg("");
        }
      } else {
        const res = await axios.post(`/booking/add`, {
          payload: {
            flightId: flightData?._id,
            passenger_details: personsData,
          },
        });

        if (res?.status == 201) {
          setStatus("add");
          setModalStatus(true);
          setErrMsg("");
        }
      }
    } catch (err) {
      setErrMsg(err?.response?.data?.data);
      console.log(err);
    }
  };

  const onDelete = async () => {
    try {
      let res = await axios.delete(`/booking/delete?id=${booking_id}`);

      if (res?.status == 200) {
        setStatus("delete");
        setModalStatus(true);
        setErrMsg("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ModalStatus
        open={modalStatus}
        onClose={() => {
          setModalStatus(false);
          dispatch(setBookingId(""));
          dispatch(setFlightId(""));
          navigate("/my-bookings");
        }}
        status={status}
      />
      <div className="flex gap-4 px-3 ">
        <div className="flex-grow">
          <div className="mt-4">
            <Typography variant="h4" style={{ fontWeight: "600" }}>
              {booking_id ? "Update" : "Add"} Booking
            </Typography>
          </div>
          <div className="bg-white p-4 rounded-md shadow-xl border border-gray-100 mt-4">
            <table style={{ width: "100%" }}>
              <tbody>
                <FlightList itm={flightData} button={false} />
              </tbody>
            </table>
          </div>

          <div className="mt-10 block">
            <div className="flex justify-between items-center">
              <div>
                <Typography variant="h5" style={{ fontWeight: "600" }}>
                  Passengers details
                </Typography>
              </div>
              <div>
                <button
                  onClick={() => onPersonAdd()}
                  className="bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-900"
                >
                  <AddIcon /> Add passenger
                </button>
              </div>
            </div>

            <div className="border border-gray-300 p-4 rounded-md mt-2">
              {personsData?.map((itm, idx) => {
                return (
                  <div
                    className={`flex gap-3 items-center ${
                      idx === 0 ? "" : "mt-4"
                    }`}
                  >
                    <div className="flex-grow">
                      <span className="block " style={{ fontSize: "12px" }}>
                        Name
                      </span>
                      <input
                        type="text"
                        className="py-2 px-2 border rounded-md w-full"
                        placeholder="Enter name"
                        onChange={(e) =>
                          onHandleInputChange(idx, "name", e?.target?.value)
                        }
                        value={itm?.name}
                      />
                    </div>
                    <div>
                      <span className="block " style={{ fontSize: "12px" }}>
                        Age
                      </span>
                      <input
                        type="number"
                        className="py-2 px-2 border rounded-md"
                        placeholder="Enter age"
                        onChange={(e) =>
                          onHandleInputChange(idx, "age", e?.target?.value)
                        }
                        value={itm?.age}
                      />
                    </div>
                    <div style={{ width: "20px" }}>
                      {idx !== 0 && (
                        <div
                          className="text-red-500 mt-4 cursor-pointer"
                          onClick={() =>
                            idx != 0 ? onPersonsDeleteData(idx) : {}
                          }
                        >
                          <DeleteIcon />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div
          className="border-l border-l-gray-300 pl-4"
          style={{ width: "440px" }}
        >
          <div className="mt-5 shadow-xl border border-gray-100 p-4 rounded-lg">
            <Typography variant="h8" style={{ fontWeight: "600" }}>
              Price breakup
            </Typography>
            <div className="flex mt-3 items-center justify-between">
              <div className="text-gray-500">Flight price</div>
              <div className="text-gray-500">{flightData?.price}</div>
            </div>
            <div className="flex items-center mt-1 justify-between">
              <div className="text-gray-500">Total passengers</div>
              <div className="text-gray-500">{personsData?.length}</div>
            </div>
            <div className="flex items-center mt-2 justify-between border-t border-t-400 pt-2 ">
              <div className="font-bold">Total price</div>
              <div className="font-bold">
                {flightData?.price * personsData?.length}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div>
              {errMsg && (
                <div className="text-center block">
                  <span className="text-red-500">{errMsg}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between  ">
            <div>
              {booking_id && (
                <button
                  className="bg-red-500 hover:bg-red-800 px-4 py-1 text-white rounded-full"
                  onClick={() => onDelete()}
                >
                  Cancel booking
                </button>
              )}
            </div>
            <div>
              <button
                className="bg-green-500 hover:bg-green-800 px-4 py-1 text-white rounded-full"
                onClick={() => onHandleSubmit()}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
