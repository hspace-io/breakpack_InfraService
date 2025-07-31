import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import LandingPage from './pages/landing/Landing'
import Admin from "./pages/Admin/Admin"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default App