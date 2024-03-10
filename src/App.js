import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";

import { Header } from "./components/Header";
import RouteController from "./routes/RouteController";

function App() {
  const location = useLocation();

  console.log(location?.pathname);
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div>{location?.pathname !== "/dashboard" && <Header />}</div>
      <div className="flex-grow  overflow-hidden">
        <div className="h-full">
          <RouteController />
        </div>
      </div>
    </div>
  );
}

export default App;
