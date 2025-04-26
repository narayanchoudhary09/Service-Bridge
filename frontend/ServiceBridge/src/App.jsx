import './index.css'
import './App.css'

import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar"
import LoginForm from './pages/Login'
import Register from "./pages/Register"
import Login from "./components/core/Auth/LoginForm"
import WorkerHomePage from './pages/WorkerHomepage'
import UserDhashbord from './pages/UserDhasbord';
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <div className='App bg-[#F5F5F5] min-h-screen w-screen font-inter flex flex-col'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/worker/homepage" element={<WorkerHomePage />} />
          <Route path="/user-dashboard" element={<UserDhashbord />} />
        </Routes>
      </div>
      <Toaster />
    </>
  )
}

export default App
