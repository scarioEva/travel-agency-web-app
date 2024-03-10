import { useState } from "react";
import { Login } from "../components/dashboardComp/Login";
import { AddFlight } from "../components/dashboardComp/AddFlight";
import { UpdateRate } from "../components/dashboardComp/UpdateRate";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

export const Dashboard = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [menu, setMenu] = useState("updateRate");
  return (
    <>
      {loggedIn ? (
        <div className="h-full flex flex-col">
          <div className="flex  gap-10 items-center px-4 py-2s border-b border-b-gray-200">
            <div>
              <div>
                <img
                  src="/images/logo.svg"
                  style={{ width: "80px" }}
                  alt="logo"
                  className="cursor-pointer"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-10">
                <div>
                  <span
                    className={`cursor-pointer ${
                      menu === "updateRate"
                        ? " border-b border-blue-500 pb-1"
                        : ""
                    }`}
                    onClick={() => setMenu("updateRate")}
                  >
                    Update Rate
                  </span>
                </div>
                <div>
                  <span
                    className={`cursor-pointer ${
                      menu === "addFlight"
                        ? " border-b border-blue-500 pb-1"
                        : ""
                    }`}
                    onClick={() => setMenu("addFlight")}
                  >
                    Add Flight
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-grow text-right">
              <div
                className="inline-block cursor-pointer"
                onClick={() => setLoggedIn(false)}
              >
                <PowerSettingsNewIcon />
              </div>
            </div>
          </div>
          <div className="flex-grow overflow-auto p-4">
            {menu === "addFlight" ? <AddFlight /> : <UpdateRate />}
          </div>
        </div>
      ) : (
        <Login onSuccess={() => setLoggedIn(true)} />
      )}
    </>
  );
};
