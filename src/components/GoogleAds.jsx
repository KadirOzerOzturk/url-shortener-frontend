import React, { useEffect, useRef } from "react";

function GoogleAds() {
  const adRef = useRef(null);
  const isPushed = useRef(false); // Track if adsbygoogle.push() has already been called

  useEffect(() => {
    if (!window.adsbygoogle) {
      // Load the AdSense script only once
      const script = document.createElement("script");
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      script.async = true;
      script.crossOrigin = "anonymous";
      script.onload = () => {
        if (adRef.current && !isPushed.current) {
          window.adsbygoogle = window.adsbygoogle || [];
          window.adsbygoogle.push({});
          isPushed.current = true; // Mark ads as initialized
        }
      };

      document.body.appendChild(script);
    } else if (adRef.current && !isPushed.current) {
      // If script is already loaded, just push ads once
      window.adsbygoogle.push({});
      isPushed.current = true;
    }
  }, []);
  return (
    <div>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: "300px",  // Genişlik
          height: "250px", // Yükseklik
        }}
       data-ad-client ={process.env.REACT_APP_ADSENSE_CLIENT} 
       data-ad-slot={process.env.REACT_APP_ADSENSE_SLOT}  
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      
    </div>
  );
}

export default GoogleAds;
