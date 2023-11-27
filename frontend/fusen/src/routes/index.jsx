import { useRoutes } from "react-router-dom";
import FusenBoard from "../features/fusen/routes/FusenBoard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FusenBoard />} />
        {/* 他のルートもここに追加 */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
