import { Typography } from "@mui/material";
import { useState } from "react";

export const Login = ({ onSuccess = () => {} }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    if (email === "123456" && password === "123456") {
      onSuccess();
    }
  };
  return (
    <>
      <div className="h-full  flex justify-between items-center">
        <div className="flex-grow text-center">
          <div className="bg-white rounded-lg border border-gray-100 shadow-lg inline-block p-4">
            <div className="text-center">
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                Login
              </Typography>
              <div className="mt-4">
                <input
                  type="text"
                  name=""
                  id=""
                  value={email}
                  onChange={(e) => setEmail(e?.target?.value)}
                  placeholder="Username"
                  className="py-2 px-2 border rounded-md"
                />
                <input
                  type="password"
                  name=""
                  id=""
                  onChange={(e) => setPassword(e?.target?.value)}
                  value={password}
                  placeholder="Password"
                  className="py-2 px-2 block mt-2 border rounded-md"
                />
                <button
                  onClick={() => onLogin()}
                  className="bg-blue-500 px-4 py-2 rounded-full hover:bg-blue-700 text-white mt-4"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
