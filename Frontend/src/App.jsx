import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import Aptitude from "./pages/dashboard/Aptitude";
import Coding from "./pages/dashboard/Coding";
import ProfilePage from "./pages/ProfilePage"
import Interview from "./pages/Interview";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />


        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>}>
          <Route index element={<Overview />} />
          <Route path="aptitude" element={<Aptitude />} />
          <Route path="coding" element={<Coding />} />
          <Route path="interviews" element={<Interview />} />
          <Route path="profile" element={<ProfilePage />} />

        </Route>

        

      </Routes>
    </BrowserRouter>
  );
}

export default App;