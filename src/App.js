import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import bg from "./assets/playfull-bg.jpg";
import QrGenerator from "./pages/QrGenerator"; 
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Redirect from "./components/Redirect";

function App() {
  return (
    <div className="relative h-screen w-screen bg-cover bg-center font-KG">
      <img
        src={bg}
        alt="background"
        className=" fixed w-screen h-screen object-cover "
      />
      <Navbar />

      <div className="absolute inset-0 mt-2 overflow-x-auto flex flex-col ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/qr-generator" element={<QrGenerator />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/io/:shortUrl" element={<Redirect  />} /> 

        </Routes>
      {/*
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 ml-4 hidden md:block">
          <GoogleAds />
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 mr-4 hidden md.block">
          <GoogleAds />
        </div>
      */ }
        
      </div>
    </div>
  );
}

export default App;
