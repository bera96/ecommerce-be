import "./App.css";
import { Toaster } from "react-hot-toast";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <div>
      <Toaster position="top-right" />
      <AppRoutes />
    </div>
  );
}

export default App;
