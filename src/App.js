import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import bg from "./assets/playfull-bg.jpg";
import QrGenerator from "./pages/QrGenerator"; 
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Redirect from "./components/Redirect";
import { Helmet } from "react-helmet";

function App() {
  return (
    <div className="relative h-screen w-screen bg-cover bg-center font-KG">
      <Helmet>
        <title>Shorterly - URL Shortener & QR Code Generator</title>
        <meta name="description" content="Shorterly is a powerful URL shortener and QR code generator. Shorten your links and generate QR codes easily!" />
        <meta name="keywords" content="URL shortener, QR code generator, shorten links, free URL shortener, create QR code" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Shorterly - URL Shortener & QR Code Generator" />
        <meta property="og:description" content="Shorterly is a powerful URL shortener and QR code generator. Shorten your links and generate QR codes easily!" />
        <meta property="og:image" content={process.env.REACT_APP_MAIN_ICON} />
        <meta property="og:url" content="https://www.shorterly.net" />
      </Helmet>
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
      </div>
    </div>
  );
}

export default App;