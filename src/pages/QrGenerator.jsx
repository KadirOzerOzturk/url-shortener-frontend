import { QRCodeCanvas } from "qrcode.react";
import React, { useState } from "react";

function QrGenerator() {
  const [url, setUrl] = useState("");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [padding, setPadding] = useState(10);
  const [qrKey, setQrKey] = useState(0); // QR kodunu güncellemek için key

  const handleGenerate = () => {
    setQrKey((prev) => prev + 1); // QR kodunu yenilemek için key değiştir
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen ">
      <div className="w-full max-w-4xl p-6  rounded-lg">
        {/* Başlık ve URL Girişi */}
        <div className="text-gray-800 text-center text-5xl font-bold mt-6">
          QR Code Generator
        </div>
        <div className="text-gray-800 text-center text-2xl mt-4">
          Generate your QR code
        </div>

        <div className="flex justify-center mt-6 w-full px-4">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="rounded-full px-4 h-16 py-2 w-full pr-20 bg-gray-800 text-slate-400"
              placeholder="https://example.com"
            />
            <button
              onClick={handleGenerate}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-purple-700 text-white px-6 mx-1 py-2 h-14 rounded-full"
            >
              Generate
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-6 w-full px-4">

        {/* QR Kod Özelleştirme Paneli */}
        <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
          <div className="text-gray-800 text-xl font-semibold mb-4">
            Customize QR Code
          </div>

          {/* Renk Seçenekleri */}
          <div className="flex justify-between">
            <div>
              <label className="block text-gray-600">Foreground Color:</label>
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-10 h-10 cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-gray-600">Background Color:</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-10 h-10 cursor-pointer"
              />
            </div>
          </div>

          {/* QR Kod Boyutu ve Padding */}
          <div className="mt-4">
            <label className="block text-gray-600">QR Code Size (px):</label>
            <input
              type="range"
              min="100"
              max="500"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="w-full"
            />
            <span className="text-gray-800">{size}px</span>
          </div>

          <div className="mt-4">
            <label className="block text-gray-600">Padding:</label>
            <input
              type="range"
              min="0"
              max="30"
              value={padding}
              onChange={(e) => setPadding(parseInt(e.target.value))}
              className="w-full"
            />
            <span className="text-gray-800">{padding}px</span>
          </div>
        </div>
         {/* QR Kod Önizleme */}
      {url && (
        <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center w-full max-w-lg">
          <QRCodeCanvas
            key={qrKey} // QR kodunu yenilemek için key değişiyor
            value={url}
            size={size}
            bgColor={bgColor}
            fgColor={fgColor}
            level="H"
            includeMargin={false} // Padding kontrolü için margin kapalı
            style={{ padding: `${padding}px`, backgroundColor: bgColor }}
          />
          <div className="text-gray-600 mt-2">Your QR Code</div>
        </div>
      )}
      </div>

      </div>

     
    </div>
  );
}

export default QrGenerator;
