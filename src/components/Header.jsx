import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setCurrencyData } from "../redux/actions/list";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedCur = useSelector(
    (state) => state?.listReducer?.currency_data,
    shallowEqual
  );

  const [list, setList] = useState([]);

  const getCurrency = async () => {
    try {
      let res = await axios.get("/curConv/getSelectedCurrency");
      if (res?.status == 200) {
        dispatch(setCurrencyData({ ...res?.data?.data }));
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(selectedCur);
  const getCurrencyList = async () => {
    try {
      let res = await axios.get("/curConv/getList");
      if (res?.status == 200) {
        setList([...res?.data?.data]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCurrency();
    getCurrencyList();
  }, []);

  const onSelectCurrency = async (val) => {
    try {
      let selected_value = list?.filter((itm) => itm?.code == val)[0];
      console.log(selected_value);
      let res = await axios.post("curConv/setCurrency", {
        code: selected_value?.code,
        rate: selected_value?.rate,
      });
      if (res?.status === 200) {
        getCurrency();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center px-4 py-2s border-b border-b-gray-200">
        <div>
          <div>
            <img
              src="/images/logo.svg"
              style={{ width: "80px" }}
              alt="logo"
              className="cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-4">
            <div>
              <select
                name=""
                id=""
                value={selectedCur?.c_code}
                onChange={(e) => onSelectCurrency(e?.target?.value)}
              >
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
              <div
                className="inline-block"
                onClick={() => navigate("/my-bookings")}
              >
                <AccountCircleOutlinedIcon
                  sx={{ fontSize: "30px", cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
