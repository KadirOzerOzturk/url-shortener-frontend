import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import profilePic from "../assets/profile.jpg";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../store/auth";
import History from "../components/History";
import axios from "axios";

function Profile() {
    const { user } = useSelector((state) => state.auth);
    const [bio, setBio] = useState("Full-stack developer & tech enthusiast! 🚀");
    const [hobbies, setHobbies] = useState(["💻 Coding", "🎮 Gaming", "📷 Photography", "🌍 Traveling"]);
    const [socialLinks, setSocialLinks] = useState({
        LinkedIn: "",
        GitHub: "",
        Twitter: "",
    });
    const [history, setHistory] = useState([]);

    const [editMode, setEditMode] = useState(false);
    const [newName, setNewName] = useState(user.name);
    const [newBio, setNewBio] = useState(bio);
    const [newHobbies, setNewHobbies] = useState(hobbies.join(", "));
    const [newSocialLinks, setNewSocialLinks] = useState(socialLinks);
    const dispatch = useDispatch();

    const handleEdit = () => {
        setEditMode(!editMode);
    };

    const saveChanges = () => {
        dispatch(setUser({ ...user, name: newName }));
        setBio(newBio);
        setHobbies(newHobbies.split(",").map((h) => h.trim()));
        setSocialLinks(newSocialLinks);
        setEditMode(false);
    };

    const handleLogout = () => {
        dispatch(logout());
    };
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/url/get_by_email/${user.email}`).then((res) => {
            setHistory(res.data);
        }
        ).catch((error) => {
            console.error(error);
        }
        );
    }, [user._id]);

    const handleDelete = (e, shortened_url) => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}/url/${shortened_url}`).then((res) => {
            setHistory(history.filter((item) => item.shortened_url !== shortened_url));
        });
    }


    return (
        <div className="flex items-center justify-center min-h-screen  px-4">
            <Helmet>
                <title>My Profile</title>
                <meta name="description" content="Check out my fun and playful profile!" />
            </Helmet>

            <div className="bg-[#FBD8C4] shadow-lg rounded-lg p-8 w-full max-w-4xl flex flex-col md:flex-row">
                {/* Profile Section */}
                <div className="flex flex-col items-center border-r border-gray-200 md:pr-8">
                    <img src={profilePic} alt="Profile" className="w-32 h-32 rounded-full shadow-md" />
                    {editMode ? (
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full text-center mt-4"
                        />
                    ) : (
                        <h1 className="text-2xl font-bold text-gray-800 mt-4">{user.name}</h1>
                    )}

                    {editMode ? (
                        <textarea
                            value={newBio}
                            onChange={(e) => setNewBio(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full mt-2"
                        />
                    ) : (
                        <p className="text-gray-600 text-lg mt-2 text-center">{bio}</p>
                    )}

                    {/* Hobbies */}
                    <div className="mt-4 w-full">
                        <h2 className="text-lg font-semibold text-gray-800">Hobbies</h2>
                        {editMode ? (
                            <input
                                type="text"
                                value={newHobbies}
                                onChange={(e) => setNewHobbies(e.target.value)}
                                className="border border-gray-300 rounded-lg px-4 py-2 w-full mt-2"
                            />
                        ) : (
                            <div className="flex flex-wrap justify-center gap-2 mt-2 text-gray-700 text-sm">
                                {hobbies.map((hobby, index) => (
                                    <span key={index} className="bg-gray-200 px-3 py-1 rounded-full">
                                        {hobby}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Social Links */}
                    <div className="mt-6 w-full">
                        <h2 className="text-lg font-semibold text-gray-800">Connect with me</h2>
                        <div className="flex flex-wrap gap-4 mt-2">
                            {Object.entries(socialLinks).map(([platform, link]) => (
                                <a
                                    key={platform}
                                    href={link || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full text-center hover:bg-blue-700 transition-all"
                                >
                                    {link === "" ? "-" : platform}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Edit / Logout Buttons */}
                    <div className="flex justify-between w-full mt-6">
                        {editMode ? (
                            <button onClick={saveChanges} className="bg-green-500 text-white px-6 py-2 rounded-lg w-1/2 mr-2 hover:bg-green-600">
                                Save
                            </button>
                        ) : (
                            <button onClick={handleEdit} className="bg-blue-500 text-white px-6 py-2 rounded-lg w-1/2 mr-2 hover:bg-blue-600">
                                Edit Profile
                            </button>
                        )}
                        <button onClick={handleLogout} className="bg-red-500 text-white px-6 py-2 rounded-lg w-1/2 ml-2 hover:bg-red-600">
                            Logout
                        </button>
                    </div>
                </div>

                {/* History Section */}
                <div className="mt-6 md:mt-0 md w-full">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Your URL History</h2>
                    <div className="rounded-lg shadow-sm w-full overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead className="bg-[#FBD8C4] text-gray-800">
                                <tr>
                                    <th className="px-4 py-2 border">Shortened URL</th>
                                    <th className="px-4 py-2 border">Original URL</th>
                                    <th className="px-4 py-2 border">Date</th>
                                    <th className="px-4 py-2 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.length >0 ? history.map((item) => (
                                    <tr key={item.id} className="hover:bg-[#f3c6ae] transition-all">
                                        <td className="border px-4 py-2 truncate max-w-[150px]">
                                            <a href={`${process.env.REACT_APP_REDIRECT_URL}${item.shortened_url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                {process.env.REACT_APP_REDIRECT_URL + item.shortened_url}
                                            </a>
                                        </td>
                                        <td className="border px-4 py-2 truncate max-w-[150px]" title={item.original_url}>
                                            {item.original_url.length >= 15 ? item.original_url.slice(0, 15) + "..." : item.original_url}
                                        </td>
                                        <td className="border px-4 py-2">{new Date(item.date).toLocaleDateString()}</td>
                                        <td className="border px-4 py-2 text-red-500 cursor-pointer hover:text-red-700" onClick={(e) => handleDelete(e, item.shortened_url)}>
                                            Delete
                                        </td>
                                    </tr>
                                )
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-4">No URLs found.</td>
                                    </tr>
                                )}
                            
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Profile;
