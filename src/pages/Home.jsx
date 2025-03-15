import React, { useState } from 'react'
import History from '../components/History'
import axios from 'axios'
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
            ...(user ? { userEmail: user.email } : {})
            })
            .then((response) => {
                setShortenedUrl(response.data.shortened_url); // Update the shortened URL
                setIsShortened(true)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div>
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
            <div className="text-gray-800 text-center text-3xl sm:text-5xl font-bold mt-32">
                Shorten your links
            </div>
            <div className="text-gray-800 text-center text-xl sm:text-2xl mt-4">
                Paste your long URL below
            </div>
            <div className="flex justify-center mt-4">
                <div className="relative w-11/12 sm:w-1/3">
                    <input
                        type="text"
                        className="rounded-full px-4 h-16 py-2 w-full pr-16 bg-gray-800 text-slate-400"
                        placeholder="https://example.com"
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <button onClick={shorten} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-purple-700 text-white px-6 mx-1 py-2 h-14 rounded-full">
                        Shorten
                    </button>
                </div>
            </div>

            {shortenedUrl && (
                <div className="mt-4 text-center text-xl text-gray-700">
                    <p>Shortened URL: <a href={process.env.REACT_APP_REDIRECT_URL + "/" + shortenedUrl} target="_blank" rel="noopener noreferrer" className="text-purple-700">{process.env.REACT_APP_REDIRECT_URL + "/" + shortenedUrl}</a></p>
                </div>
            )}

            <History isShortened={isShortened} />
        </div>
    );
}

export default Home;