import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/login/Login'
import SigninPage from './pages/login/Signin'
import Dashboard from './pages/dashboard/Dashboard'
import LandingPage from './pages/landing/Landing'
import Admin from "./pages/admin/Admin"
import AuthInfo from "./pages/admin/AuthInfo/AuthInfo"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SigninPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/info" element={<AuthInfo />} />
    </Routes>
  )
}

export default App