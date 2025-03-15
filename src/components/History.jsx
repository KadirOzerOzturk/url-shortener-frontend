import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function History({ isShortened }) {
  const [shortUrls, setShortUrls] = useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/url`)
      .then((response) => {
        const urls = Array.isArray(response.data) ? response.data : [];
        const userUrls = user?.email ? urls.filter(url => url.user_email === user.email) : [];
        setShortUrls(userUrls);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [isShortened, user]);

  const sortedShortUrls = [...shortUrls].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <div className="flex  mb-12 flex-col items-center mt-10 px-4">
      {!user?.email ? (
        <div className="bg-red-500 text-white p-6 mt-10 shadow-xl rounded-xl text-center">
          <h2 className="text-2xl font-bold">🔒 Giriş Yapmalısınız</h2>
          <p className="mt-2">Geçmişi görmek için önce giriş yapın.</p>
        </div>
      ) : shortUrls.length === 0 ? (
        <div className="bg-yellow-400 rounded-xl p-6 mt-10 shadow-xl text-center transform hover:scale-105 transition-all duration-300">
          <h2 className="text-3xl font-extrabold text-purple-900">📜 Geçmiş Yok</h2>
          <p className="text-lg text-purple-700 mt-4 font-semibold">🚀 Hemen bir link kısalt!</p>
        </div>
      ) : (
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500 to-yellow-400 p-4 text-white text-center text-xl font-bold">Kısaltılmış Linkler</div>
          <div className="overflow-x-auto hide-scrollbar">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-purple-700 text-white text-left">
                  <th className="py-3 px-4">🔗 Kısa URL</th>
                  <th className="py-3 px-4 hidden md:table-cell text-nowrap">🌍 Orijinal URL</th>
                  <th className="py-3 px-4 hidden lg:table-cell text-nowrap">📊 Tıklamalar</th>
                  <th className="py-3 px-4 hidden lg:table-cell text-nowrap">📅 Son Kullanım</th>
                </tr>
              </thead>
              <tbody>
                {sortedShortUrls.map((shortUrl, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-100 transition-all duration-200">
                    <td className="py-3 px-4 text-blue-500 font-semibold">
                      <a href={`/io/${shortUrl.shortened_url}`} onClick={(e) => { e.preventDefault(); navigate(`/io/${shortUrl.shortened_url}`); }}>
                        {`https://shorterly.net/io/${shortUrl.shortened_url}`}
                      </a>
                    </td>
                    <td className="py-3 px-4 text-gray-700 max-w-xs  overflow-x-auto whitespace-nowrap hide-scrollbar hidden md:table-cell">{shortUrl.original_url}</td>
                    <td className="py-3 px-4 text-gray-700 hidden lg:table-cell">{shortUrl.usage_count}</td>
                    <td className="py-3 px-4 text-gray-700 hidden lg:table-cell">{moment(shortUrl.expires_at).format("DD.MM.YYYY HH:mm:ss")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default History;
