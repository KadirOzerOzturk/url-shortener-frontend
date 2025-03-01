import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Redirect = () => {
  const { shortUrl } = useParams();

  useEffect(() => {
    // Fetch the long URL associated with the short URL
    const fetchLongUrl = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/url/${shortUrl}`);
        
        if (response.data && response.data.originalUrl) {
          window.location.href = response.data.originalUrl;
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

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4">
      <p className="text-3xl">Redirecting...</p>
    </div>
  );
};

export default Redirect;
