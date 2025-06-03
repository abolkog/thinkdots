import Game from "@pages/Game";
import Help from "@pages/Help";
import Home from "@pages/Home";
import { Route, Routes } from "react-router";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
      <Route path="/help" element={<Help />} />
    </Routes>
  );
}
