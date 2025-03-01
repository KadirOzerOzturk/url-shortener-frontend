import { QRCodeCanvas } from "qrcode.react";
import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet";

function QrGenerator() {
    const [url, setUrl] = useState("");
    const [size, setSize] = useState(256);
    const [fgColor, setFgColor] = useState("#000000");
    const [bgColor, setBgColor] = useState("#ffffff");
    const [padding, setPadding] = useState(10);
    const [qrKey, setQrKey] = useState(0);
    const qrRef = useRef(null); // QR kodunu refere etmek için

    const handleGenerate = () => {
        setQrKey((prev) => prev + 1);
    };

    const handleDownload = () => {
        if (qrRef.current) {
            const canvas = qrRef.current.querySelector("canvas");
            if (canvas) {
                const link = document.createElement("a");
                link.href = canvas.toDataURL("image/png"); // PNG formatında indirme
                link.download = "QRCode.png"; // Dosya adı
                link.click();
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full mt-24  ">
            <Helmet>
                <title>QR Code Generator</title>
                <meta name="description" content="Generate QR codes for your URLs quickly and easily with our QR Code Generator." />
                <meta name="keywords" content="QR Code, URL to QR, QR code generator, free QR code, create QR code" />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="QR Code Generator" />
                <meta property="og:description" content="Generate QR codes for your URLs quickly and easily with our QR Code Generator." />
                <meta property="og:image" content="URL_TO_YOUR_IMAGE" />
                <meta property="og:url" content="https://www.shorterly.net/qr-generator" />
            </Helmet>

            <div className="w-full max-w-4xl p-6 rounded-lg">
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
                <div className="flex flex-col md:flex-row justify-center mt-6 w-full px-4">
                    <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
                        <div className="text-gray-800 text-xl font-semibold mb-4">
                            Customize QR Code
                        </div>

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

                    {url && (
                        <div ref={qrRef} className="mt-10 bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center w-full max-w-lg">
                            <QRCodeCanvas
                                key={qrKey}
                                value={url}
                                size={size}
                                bgColor={bgColor}
                                fgColor={fgColor}
                                level="H"
                                includeMargin={false}
                                style={{ padding: `${padding}px`, backgroundColor: bgColor }}
                            />
                            <div className="text-gray-600 mt-2">Your QR Code</div>
                            <button onClick={handleDownload} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                Download QR Code
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default QrGenerator;
