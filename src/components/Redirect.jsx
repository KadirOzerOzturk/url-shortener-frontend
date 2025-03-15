import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Redirect = () => {
  const { shortUrl } = useParams();

  useEffect(() => {
    setTimeout(() => {
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
  }, 3000); 
    
  }, [shortUrl]); 

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4">
        <div className="bg-[#FBD8C4] w-full max-w-xl rounded-lg p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
            <p className="mb-6">You will be redirected shortly. Please wait a moment.</p>
            <p className="text-lg">If you are not redirected automatically, click the link below:</p>
            <a href="/new-destination" className="text-blue-500">Go to New Page</a>
        </div>
    </div>
);
}
export default Redirect;
