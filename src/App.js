import "./App.css";
import { Header } from "./components/Header";
import RouteController from "./routes/RouteController";

function App() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div>
        <Header />
      </div>
      <div className="flex-grow  overflow-hidden">
        <div className="h-full">
          <RouteController />
        </div>
      </div>
    </div>
  );
}

export default App;
