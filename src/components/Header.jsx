import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

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
    </>
  );
};
