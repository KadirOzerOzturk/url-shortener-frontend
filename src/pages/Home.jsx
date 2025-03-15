import React, { useState } from 'react';
import History from '../components/History';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';

function Home() {
    const [url, setUrl] = useState('');
    const { user } = useSelector((state) => state.auth);
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [isShortened, setIsShortened] = useState(false);

    const shorten = (e) => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/url/shorten`, {
            original_url: url,
            ...(user ? { user_email: user.email } : {})
        })
            .then((response) => {
                setShortenedUrl(response.data.shortened_url);
                setIsShortened(true);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 min-h-screen ">
            <Helmet>
                <title>Shorterly - URL Shortener</title>
                <meta name="description" content="Welcome to Shorterly, where you can shorten your URLs easily and quickly!" />
                <meta name="keywords" content="URL shortener, shorten links, free URL shortener" />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Shorterly - URL Shortener" />
                <meta property="og:description" content="Welcome to Shorterly, where you can shorten your URLs easily and quickly!" />
                <meta property="og:image" content={process.env.REACT_APP_MAIN_ICON} />
                <meta property="og:url" content="https://www.shorterly.net" />
            </Helmet>

            {/* Header Section */}
            <h1 className="text-gray-800 text-center text-4xl sm:text-5xl font-bold mt-16">Shorten Your Long Links</h1>
            <p className="text-gray-600 text-center text-lg sm:text-xl mt-2 max-w-2xl">
                Use Shorterly to create concise, easy-to-share links with just one click. Keep track of your shortened URLs with advanced analytics.
            </p>

            {/* AdSense Ad Slot */}
            <div className="w-full my-8">
                <script async="true" type="text/javascript" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                <ins
                    className="adsbygoogle"
                    style={{
                        display: "block",
                    }}
                    data-ad-client="ca-pub-3367723680642426"
                    data-ad-slot="1006343378"
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                ></ins>
                <script>
                    (adsbygoogle = window.adsbygoogle || []).push({ });
                </script>
            </div>

            {/* URL Input Section */}
            <div className="text-gray-800 text-center text-xl sm:text-2xl mt-4">
                Paste your long URL below
            </div>

            <div className="flex justify-center w-full max-w-xl mt-6">
                <div className="relative w-full">
                    <input
                        type="text"
                        className="rounded-full px-4 h-16 py-2 w-full pr-20 bg-gray-800 text-slate-400"
                        placeholder="https://example.com"
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <button
                        onClick={shorten}
                        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-purple-700 text-white px-6 mx-1 py-2 h-14 rounded-full">
                        Shorten
                    </button>
                </div>
            </div>

            {/* Shortened URL Display */}
            {shortenedUrl && (
                <div className="mt-6 text-center text-xl text-gray-700">
                    <p>Shortened URL:
                        <a href={process.env.REACT_APP_REDIRECT_URL + "/" + shortenedUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-700 font-semibold">
                            {process.env.REACT_APP_REDIRECT_URL + "/" + shortenedUrl}
                        </a>
                    </p>
                </div>
            )}

            {/* Why Use Shorterly Section */}
            <div className="mt-12 max-w-4xl text-center bg-[#FBD8C4] rounded-lg p-4 text-gray-600">
                <h2 className="text-2xl font-semibold text-gray-800">Why Use Shorterly?</h2>
                <p className="mt-2">Shorterly makes link sharing simple. Our platform allows you to generate short URLs that are easy to share, track, and manage.</p>
                <ul className="mt-4 list-disc list-inside text-left space-y-2">
                    <li>📌 <strong>Easy-to-use:</strong> Shorten links instantly.</li>
                    <li>📊 <strong>Track performance:</strong> See analytics for your URLs.</li>
                    <li>🔒 <strong>Secure:</strong> Your data is protected with industry-standard encryption.</li>
                </ul>
            </div>

            {/* Another AdSense Ad Slot */}
            <div className="w-full my-8">
                <script async="true" type="text/javascript" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                <ins
                    className="adsbygoogle"
                    style={{
                        display: "block",
                    }}
                    data-ad-client="ca-pub-3367723680642426"
                    data-ad-slot="1006343378"
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                ></ins>
                <script>
                    (adsbygoogle = window.adsbygoogle || []).push({ });
                </script>
            </div>

            {/* History Section */}
            <History isShortened={isShortened} />
        </div>
    );
}

export default Home;
