import { Typography } from "@mui/material";
import { useState } from "react";
import axios from "../../api/axios";

export const AddFlight = () => {
  const [data, setData] = useState({
    origin_city: "",
    destination_city: "",
    airline: "",
    available_seats: null,
    number_of_connections: null,
    price: null,
    total_travel_time: "",
    from_time: "",
    to_time: "",
  });

  const [err, setErr] = useState({ data: "", status: false });

  const onHandleChange = (key, value) => {
    setErr({ ...{ data: "", status: false } });
    let new_data = data;
    new_data[key] = value;
    setData({ ...new_data });
  };

  const checkInput = () => {
    return Object?.values(data)?.filter((itm) => itm == "")?.length == 0;
  };

  const onSubmit = async () => {
    try {
      let res = await axios.post("/flight/add", { data: data });
      if (res?.status === 201) {
        setData({
          ...{
            origin_city: "",
            destination_city: "",
            airline: "",
            available_seats: null,
            number_of_connections: null,
            price: null,
            total_travel_time: "",
            from_time: "",
            to_time: "",
          },
        });
        setErr({ ...{ data: res?.data?.data, status: true } });
      }
    } catch (err) {
      setErr({ data: err?.response?.data?.data, status: false });
      console.log(err);
    }
  };

  return (
    <>
      <div className="h-full flex flex-col justify-center items-center -mt-32">
        <div>
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            Add flight
          </Typography>
          <div className="mt-4 border border-gray-100 p-4 rounded-md bg-white shadow-lg">
            <div className="flex gap-6">
              <div>
                <span
                  style={{ fontSize: "14px", fontWeight: "bold" }}
                  className="text-gray-500"
                >
                  Origin
                </span>
                <div className="flex gap-1">
                  <div>
                    <input
                      type="text"
                      className="py-2 px-2 border rounded-md"
                      placeholder="Origin"
                      value={data?.origin_city}
                      onChange={(e) =>
                        onHandleChange("origin_city", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      className="py-2 px-2 border rounded-md w-28"
                      placeholder="From time"
                      value={data?.from_time}
                      onChange={(e) =>
                        onHandleChange("from_time", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div>
                <span
                  style={{ fontSize: "14px", fontWeight: "bold" }}
                  className="text-gray-500"
                >
                  Destination
                </span>
                <div className="flex gap-1">
                  <div>
                    <input
                      type="text"
                      className="py-2 px-2 border rounded-md"
                      placeholder="Destination"
                      value={data?.destination_city}
                      onChange={(e) =>
                        onHandleChange("destination_city", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      className="py-2 px-2 border rounded-md w-28"
                      placeholder="To time"
                      value={data?.to_time}
                      onChange={(e) =>
                        onHandleChange("to_time", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-6 mt-4">
              <div>
                <span
                  style={{ fontSize: "14px", fontWeight: "bold" }}
                  className="text-gray-500"
                >
                  Airline
                </span>
                <div>
                  <input
                    type="text"
                    className="py-2 px-2 border rounded-md"
                    placeholder="Airline"
                    value={data?.airline}
                    onChange={(e) => onHandleChange("airline", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <span
                  style={{ fontSize: "14px", fontWeight: "bold" }}
                  className="text-gray-500"
                >
                  Total Travel time
                </span>
                <div>
                  <input
                    type="text"
                    className="py-2 px-2 border rounded-md"
                    placeholder="Total Travel time"
                    value={data?.total_travel_time}
                    onChange={(e) =>
                      onHandleChange("total_travel_time", e.target.value)
                    }
                  />
                </div>
              </div>

              <div>
                <span
                  style={{ fontSize: "14px", fontWeight: "bold" }}
                  className="text-gray-500"
                >
                  Price
                </span>
                <div>
                  <input
                    type="number"
                    className="py-2 px-2 border rounded-md"
                    placeholder="Price"
                    value={data?.price}
                    onChange={(e) =>
                      onHandleChange("price", parseInt(e.target.value))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-6 mt-4">
              <div>
                <span
                  style={{ fontSize: "14px", fontWeight: "bold" }}
                  className="text-gray-500"
                >
                  Number of connections
                </span>
                <div>
                  <input
                    type="number"
                    className="py-2 px-2 border rounded-md"
                    placeholder="Number of connections"
                    value={data?.number_of_connections}
                    onChange={(e) =>
                      onHandleChange(
                        "number_of_connections",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
              </div>

              <div>
                <span
                  style={{ fontSize: "14px", fontWeight: "bold" }}
                  className="text-gray-500"
                >
                  Available Seats
                </span>
                <div>
                  <input
                    type="number"
                    className="py-2 px-2 border rounded-md"
                    placeholder="Available Seats"
                    value={data?.available_seats}
                    onChange={(e) =>
                      onHandleChange(
                        "available_seats",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
              </div>
            </div>

            <div className="mt-3 text-center">
              {err?.data && (
                <span
                  className={`${
                    err?.status ? "text-green-500" : "text-red-500"
                  } block`}
                >
                  {err?.data}
                </span>
              )}
              <button
                className="bg-blue-500 hover:bg-blue-800 text-white px-4 py-2 rounded-md "
                onClick={() => onSubmit()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
