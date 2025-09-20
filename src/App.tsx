import { BrowserRouter, Routes, Route, } from "react-router-dom";
import DashboardLayout from "./pages/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Authors from "./pages/Authors";
import Setting from "./pages/Setting";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/books" element={<Books />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
