import React, { useState } from 'react'
import History from '../components/History'
import axios from 'axios'
import { Helmet } from 'react-helmet';

function Home() {
    const [url, setUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [isShortened, setIsShortened] = useState(false);

    const shorten = (e) => {
        axios.post('/url/shorten', { original_url: url })
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
                <title>Shorterly</title>
                <meta name="description" content="Welcome to My URL Shortener, where you can shorten your URLs easily!" />
                <meta name="keywords" content="URL shortener, shorten links, free URL shortener" />
            </Helmet>
            <div className="text-gray-800 text-center text-5xl font-bold mt-32">
                Shorten your links
            </div>
            <div className="text-gray-800 text-center text-2xl mt-4">
                Paste your long URL below
            </div>
            <div className="flex justify-center mt-4">
                <div className="relative w-1/3">
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

            {/* Display the shortened URL */}
            {shortenedUrl && (
                <div className="mt-4 text-center text-xl text-gray-700">
                    <p>Shortened URL: <a href={shortenedUrl} target="_blank" rel="noopener noreferrer" className="text-purple-700">{shortenedUrl}</a></p>
                </div>
            )}

            {/* Pass the history array to the History component */}
            <History isShortened={isShortened} />
        </div>
    );
}

export default Home;
