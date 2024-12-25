import React from "react";
import Navbar from "./components/NavBar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrder/MyOrders";
const App = () => {
  const [showLogin, setShowLogin] = React.useState(false);


  React.useEffect(() => {
    const loadTawkTo = () => {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://embed.tawk.to/676c75e0af5bfec1dbe1eae3/1ifvqovji";
      script.charset = "UTF-8";
      script.setAttribute("crossorigin", "*");
      document.body.appendChild(script);
    };

    loadTawkTo();
  }, []);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : <> </>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element = {<Verify />} />
          <Route path="/myorders" element = {<MyOrders/>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
