import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../../api/axios";

export const UpdateRate = () => {
  const [data, setData] = useState({
    rate: null,
    code: "",
  });
  const [err, setErr] = useState({ data: "", status: false });
  const [list, setList] = useState([]);
  const getList = async () => {
    try {
      let res = await axios.get("/curConv/getList");
      if (res?.status == 200) {
        setList([...res?.data?.data]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(data);
  useEffect(() => {
    getList();
  }, []);

  const onHandleChange = (key, value) => {
    setErr({ ...{ data: "", status: false } });
    let new_data = data;
    new_data[key] = value;
    setData({ ...new_data });
  };

  const onSubmit = async () => {
    try {
      let res = await axios.post("/curConv/chgRate", { payload: data });

      if (res?.status === 200) {
        setData({
          ...{
            rate: "",
            code: "",
          },
        });
        setErr({ ...{ data: res?.data?.data, status: true } });
        getList();
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
            Update Rate
          </Typography>
          <div className="mt-4 border border-gray-100 p-4 rounded-md bg-white shadow-lg">
            <div className="flex gap-6">
              <div>
                <div className="flex gap-1">
                  <div>
                    <span
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                      className="text-gray-500 block"
                    >
                      Select Currency
                    </span>

                    <select
                      value={data?.code}
                      className="py-2 px-2 border rounded-md"
                      onChange={(e) => onHandleChange("code", e?.target?.value)}
                    >
                      <option value=""></option>
                      {list?.map((itm, idx) => {
                        return (
                          <option key={itm?.name} value={itm?.code}>
                            {itm?.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <span
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                      className="text-gray-500 block"
                    >
                      Old rate
                    </span>
                    <input
                      type="text"
                      className="py-2 px-2 border rounded-md w-28"
                      value={
                        list?.filter((itm) => itm?.code === data?.code)[0]
                          ?.rate || 0
                      }
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="flex gap-1">
                  <div>
                    <span
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                      className="text-gray-500 block"
                    >
                      New rate
                    </span>
                    <input
                      type="number"
                      className="py-2 px-2 border rounded-md"
                      placeholder="New rate"
                      value={data?.rate}
                      onChange={(e) => onHandleChange("rate", e.target.value)}
                    />
                  </div>
                  <div></div>
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
