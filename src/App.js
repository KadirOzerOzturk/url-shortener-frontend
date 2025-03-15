import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import bg from "./assets/playfull-bg.jpg";
import QrGenerator from "./pages/QrGenerator";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Redirect from "./components/Redirect";
import { Helmet } from "react-helmet";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";

function App() {
  const location = useLocation(); 

  return (
    <div className="flex flex-col min-h-screen font-KG">
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

      {/* Arkaplan resmi */}
      <div className="fixed inset-0 -z-10 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}></div>

      <Navbar />

      {/* İçeriği ortalama */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-4xl"> {/* İçeriğin genişliğini kontrol et */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/qr-generator" element={<QrGenerator />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/io/:shortUrl" element={<Redirect />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </main>

      {location.pathname.startsWith("/io/") ? null : <Footer />}
    </div>
  );
}

export default App;