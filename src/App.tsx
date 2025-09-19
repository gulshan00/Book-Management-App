import { BrowserRouter, Routes, Route, } from "react-router-dom";
import DashboardLayout from "./pages/DashboardLayout";
import Dashboard from "./pages/Dashboard";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route redirect */}
        {/* <Route path="/" element={<Navigate to="/dashboard" />} /> */}

        {/* Layout + Nested Pages */}
        <Route path="/" element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
