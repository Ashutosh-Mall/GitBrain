import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom"
import SendFiles from "./pages/SendFiles";
export default function App() {
  return (
    <div className="min-h-screen min-w-full bg-white bg-[radial-gradient(circle,#e5e7eb_1px,transparent_1px)] bg-[size:18px_18px]">
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<SendFiles />} />
      </Routes>
    </div>
  );
}
