import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./pages/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Message from "./pages/Message";
import Setting from "./pages/Setting";
// import ProfilePage from "./pages/Profile";
import LoginPage from "./pages/Login";
import Profilepage from "./pages/Profilpage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard layout routes */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="books" element={<Books />} />
          <Route path="message" element={<Message />} />
          <Route path="setting" element={<Setting />} />
          {/* <Route path="profile" element={<ProfilePage />} /> */}
          <Route path="profile" element={<Profilepage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
