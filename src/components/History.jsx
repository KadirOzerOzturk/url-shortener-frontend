import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

function History({ isShortened }) {


  const [shortUrls, setShortUrls] = useState([
  ])

  useEffect(() => {
    axios.get('/url').then((response) => {
      setShortUrls(response.data)
    }
    ).catch((error) => {
      console.error(error)
    })
  }, [isShortened])
  // sort as created_at desc
  shortUrls.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at)
  })
  
  

  return (
    <div className="flex justify-center items-center text-center rounded-full">
      {shortUrls.length === 0 ? (
        <div className="bg-yellow-400 rounded-xl p-6 mt-20 shadow-lg transform hover:scale-105 transition-all duration-300">
          <div className="text-purple-900 text-3xl font-extrabold">📜 History</div>
          <div className="text-purple-700 text-lg mt-4 font-semibold">
            🚀 No history yet, go shorten some links!
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-pink-500 to-yellow-400 hide-scrollbar overflow-y-auto w-2/3 mt-8 max-h-96 rounded-2xl shadow-2xl p-4 border-4 border-white custom-scrollbar">
          <table className="w-full border-collapse border border-white">
            <thead >
              <tr className="bg-purple-700 text-yellow-200 text-lg rounded-xl">
                <th className="py-3 px-6 border-b-2 border-white text-nowrap">🔗 Short URL</th>
                <th className="py-3 px-6 border-b-2 border-white text-nowrap">🌍 Original URL</th>
                <th className="py-3 px-6 border-b-2 border-white text-nowrap">📸 QR</th>
                <th className="py-3 px-6 border-b-2 border-white text-nowrap">📊 Clicks</th>
                <th className="py-3 px-6 border-b-2 border-white text-nowrap">✅ Status</th>
                <th className="py-3 px-6 border-b-2 border-white text-nowrap">📅 Expire Date</th>
              </tr>
            </thead>
            <tbody>
              {shortUrls.map((shortUrl, index) => (
                <tr
                  key={index}
                  className="bg-yellow-100 text-purple-800 text-lg font-semibold hover:bg-yellow-300 transition-all duration-300"
                >
                  <td className="p-4 border border-white text-nowrap">{shortUrl.shortened_url}</td>
                  <td className="p-4 border border-white max-w-xs overflow-x-auto whitespace-nowrap hide-scrollbar">{shortUrl.original_url}</td>
                  <td className="p-4 border border-white text-nowrap">{shortUrl.qr ? shortUrl.qr: "-"}</td>
                  <td className="p-4 border border-white text-nowrap">{shortUrl.usage_count}</td>
                  <td className="p-4 border border-white text-nowrap">{shortUrl.status ? shortUrl.status : "Active"}</td>
                  <td className="p-4 border border-white text-nowrap">{moment(shortUrl.expires_at).format("DD.MM.YYYY hh:mm:ss Z")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>

  )
}

export default History