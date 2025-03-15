import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const Redirect = () => {
  const { shortUrl } = useParams();
  const [originalUrl, setOriginalUrl] = useState("");
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const fetchLongUrl = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/url/${shortUrl}`);
        if (response.data && response.data.originalUrl) {
          setOriginalUrl(response.data.originalUrl);
        } else {
          console.error("Hata: Orijinal URL bulunamadı");
        }
      } catch (error) {
        console.error("Hata:", error);
      }
    };

    if (shortUrl) {
      fetchLongUrl();
    }
  }, [shortUrl]);

  useEffect(() => {
    if (originalUrl) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            window.location.href = originalUrl;
            clearInterval(timer);
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [originalUrl]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.adsbygoogle && !window.adsLoaded) {
      window.adsbygoogle.push({});
      window.adsLoaded = true; // Reklamın yalnızca bir kez yüklenmesini sağla
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Helmet>
        <title>Redirecting...</title>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      </Helmet>

      <div className="flex flex-col items-center justify-center flex-grow p-4">
        {/* AdSense Reklam Alanı */}
        <div className="w-full max-w-xl mb-4">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client={process.env.REACT_APP_ADSENSE_CLIENT}
            data-ad-slot={process.env.REACT_APP_ADSENSE_SLOT}
            data-ad-format="auto"
          ></ins>
        </div>

        {/* Yönlendirme İçeriği */}
        <div className="bg-[#FBD8C4] w-full max-w-xl rounded-lg p-8 text-center shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Redirecting...</h1>
          <p className="mb-6 text-lg text-gray-700">
            You will be redirected in <span className="font-semibold">{countdown}</span> seconds. Please wait a moment.
          </p>
          {originalUrl && (
            <p className="text-lg">
              If you are not redirected automatically,{" "}
              <a href={originalUrl} className="text-blue-500 font-semibold underline">
                click here
              </a>.
            </p>
          )}
        </div>
      </div>

    
    </div>
  );
};

export default Redirect;
