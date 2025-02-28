import React, { useEffect } from "react";

function GoogleAds() {
  useEffect(() => {
    // Google Ads scriptini yüklemek
    const script = document.createElement("script");
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.onload = () => {
      // Script yüklendikten sonra adsbygoogle.push() fonksiyonunu çağırıyoruz
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    };

    document.body.appendChild(script);

    return () => {
      // Component unmount olduğunda scripti kaldırıyoruz
      document.body.removeChild(script);
    };
  }, []); // useEffect sadece component mount olduğunda çalışacak

  return (
    <div>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: "300px",  // Genişlik
          height: "250px", // Yükseklik
        }}
        data-ad-client="ca-pub-3367723680642426" // AdSense client ID'niz
        data-ad-slot="1006343378"  // Slot ID'niz
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}

export default GoogleAds;
