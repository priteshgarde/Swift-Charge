import logo from "./logo.svg";
import "./App.css";
import MyMap from "./Components/Map/MyMap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Payment from "./Components/Payment";
import SearchStation from "./Components/UI/SearchStation";
import ForgotPassword from "./Components/Forms/ForgotPassword";
import Home from "./Components/UI/Home";
import MyNavBar from "./Components/Navigations/MyNavBar";
import Signup from "./Components/Forms/Signup";
import HomeBody from "./Components/UI/HomeBody";
import Login from "./Components/Forms/Login";
import AddVehicle from "./Components/Forms/AddVehicle";
import { useEffect, useState } from "react";
import MyStation from "./Components/UI/MyStation";
import Admin from "./Components/UI/Admin";
import MyBookings from "./Components/UI/MyBookings";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  console.log(user);
  return (
    <BrowserRouter>
      <MyNavBar {...{ user, setUser }} />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<HomeBody />} />
          <Route path="Signup" element={<Signup {...{ user, setUser }} />} />
          <Route path="login" element={<Login {...{ user, setUser }} />} />
          <Route path="payment" element={<Payment />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<HomeBody />} />
          <Route
            path="/addVehicle"
            element={<AddVehicle {...{ user, setUser }} />}
          />
        </Route>
        <Route
          path="/bookslot"
          element={<SearchStation {...{ user, setUser }} />}
        />
        <Route
          path="/forgotPassword"
          element={<ForgotPassword {...{ user, setUser }} />}
        />
        <Route
          path="/myStation"
          element={<MyStation {...{ user, setUser }} />}
        />
        <Route path="mybookings" element={<MyBookings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
