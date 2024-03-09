import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Checkbox, CircularProgress, Radio } from "@mui/material";
import { ColorRing, Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setBookingId, setFlightId } from "../redux/actions/list";
import { FlightList } from "../components/flightList";

const Home = () => {
  const [inputField, setInputField] = useState({
    from: "",
    to: "",
    seats: 0,
    direct: false,
  });
  const [errMsg, setErrMsg] = useState("");
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const [expand, setExpand] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onHandleChange = (key, val) => {
    let inputData = inputField;
    inputData[key] = val;
    setInputField({ ...inputData });
  };

  useEffect(() => {
    dispatch(setFlightId(""));
    dispatch(setBookingId(""));
  }, []);

  const getAvailableFlight = async () => {
    setLoader(true);

    try {
      // sadsa
      let payload = {
        ...{
          from: inputField?.from,
          to: inputField?.to,
        },
        ...(inputField?.seats == 0 ? {} : { seats: inputField?.seats }),
        ...{ connecting_flight: inputField?.direct },
      };

      let res = await axios.post("/flight/search", payload);
      console.log(res);

      if (res && res?.data && res?.data?.data) {
        setLoader(false);
        setData([...res?.data?.data]);
        setExpand(true);
      }
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  };

  const onBooking = (data) => {
    navigate("/booking");
    dispatch(setFlightId(data));
  };

  console.log({ data });

  return (
    <div
      style={{ backgroundImage: "url('/images/main_background.png')" }}
      className="h-full"
    >
      <div className=" flex-col h-full py-2 flex items-center justify-center overflow-hidden bg-[rgba(0,0,0,.7)]">
        <div>
          <div className="flex items-center mt-4 gap-4 border px-4 py-2 rounded-full bg-white w-[90vw]">
            <div>
              <span>From</span>
            </div>
            <div>
              <input
                type="text"
                className="py-2 px-2 border rounded-md"
                placeholder="Form"
                onChange={(e) => onHandleChange("from", e?.target?.value)}
              />
            </div>
            <div>
              <span>To</span>
            </div>
            <div>
              <input
                type="text"
                className="py-2 px-2 border rounded-md"
                placeholder="To"
                onChange={(e) => onHandleChange("to", e?.target?.value)}
              />
            </div>
            <div>
              <span>Seats</span>
            </div>
            <div>
              <input
                type="number"
                className="py-2 w-[70px] px-2 border rounded-md"
                placeholder="Seats"
                onChange={(e) =>
                  onHandleChange("seats", parseInt(e?.target?.value) || 0)
                }
              />
            </div>
            {/* <div>
              <div className="flex items-center "> */}
            {/* <div>
                  <Checkbox
                    onChange={(e) =>
                      onHandleChange("direct", e?.target?.checked)
                    }
                    color="secondary"
                  />
                </div> */}
            <div>Direct</div>
            <div>
              <select
                onChange={(e) => onHandleChange("direct", e?.target?.value)}
              >
                <option value="">Select</option>
                <option value="false">Yes</option>
                <option value="true">No</option>
              </select>
            </div>
            {/* </div>
            </div> */}
            <div className="flex-grow text-right">
              <button
                onClick={() => getAvailableFlight()}
                className="bg-blue-500 px-4 py-2 rounded-full text-white disabled:bg-blue-200"
                // disabled={!inputField?.from || !inputField?.to}
              >
                {loader ? <CircularProgress size={20} /> : "Search"}
              </button>
            </div>
          </div>
        </div>
        <div
          className={`${expand && !loader ? "flex-grow overflow-auto" : ""}`}
        >
          {expand && !loader && (
            <div>
              <div className="px-2 py-4 bg-white w-[90vw] rounded-xl mt-2">
                {!loader ? (
                  <>
                    {data?.length > 0 ? (
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th></th>
                            <th>Origin</th>
                            <th></th>
                            <th>Destination</th>
                            <th>Price</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.map((itm, idx) => {
                            return (
                              <FlightList
                                itm={itm}
                                idx={idx}
                                onBooking={onBooking}
                              />
                            );
                          })}
                        </tbody>
                      </table>
                    ) : (
                      <>
                        <div className="text-center p-5 flex-col text-center">
                          <div>
                            <img
                              src="/images/not_found.svg"
                              alt="not-found"
                              className="inline-block"
                              style={{ width: "300px" }}
                            />
                          </div>
                          <div>
                            <span>Not found!</span>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <div className="text-center">
                      <div className="inline-block">
                        <CircularProgress size={40} color="secondary" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
