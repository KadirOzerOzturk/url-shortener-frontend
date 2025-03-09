import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import loginIcon from "../assets/Login-amico.png";
import { login } from '../store/auth';
function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    
    const dispatch = useDispatch();
    const [info, setInfo] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestData = { ...form };
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, requestData);

            if (res.status === 200) {
                setInfo("Logged in successfully!");
                setForm({
                    email: "",
                    password: ""
                });
                setError("");
                dispatch(login(res.data.user));
                localStorage.setItem("user", JSON.stringify(res.data.user));
            }
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || 'Something went wrong! Please try again later');
            setInfo("");
        }
        
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex items-center justify-center w-full min-h-screen p-4">
           <Helmet>
    <title>Login - Shorterly</title>
    <meta name="description" content="Login to Shorterly to access your URL shortener and QR code generator dashboard." />
    <meta name="keywords" content="Login, URL shortener, QR code generator, Shorterly" />
    <meta name="robots" content="index, follow" />
    <meta property="og:title" content="Login - Shorterly" />
    <meta property="og:description" content="Login to Shorterly to access your URL shortener and QR code generator dashboard." />
    <meta property="og:image" content={process.env.REACT_APP_MAIN_ICON} />
    <meta property="og:url" content="https://www.shorterly.net/login" />
</Helmet>

            <div className='bg-[#FBD8C4] w-full max-w-4xl rounded-lg p-8 flex flex-col md:flex-row'>
                <form className='w-full md:w-1/2'>
                    <h1 className='text-2xl font-bold mb-4 text-center'>Login</h1>
                    <input
                        type="email"
                        placeholder='Email'
                        className='w-full h-12 px-4 mb-4 rounded-lg'
                        onChange={handleChange}
                        name="email"
                        value={form.email}
                    />
                    <div className="relative w-full mb-4">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder='*********'
                            className='w-full h-12 px-4 rounded-lg'
                            onChange={handleChange}
                            name="password"
                            value={form.password}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 px-4 py-2 text-sm text-gray-600"
                            onClick={toggleShowPassword}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    <button
                        type='submit'
                        className='bg-blue-500 text-white px-4 py-2 rounded-lg'
                        onClick={handleSubmit}
                    >
                        Login
                    </button>
                    {info && <p className="mt-4 text-green-500">{info}</p>}
                    {error && <p className="mt-4 text-red-500">{error}</p>}
                </form>
                <img
                    src={loginIcon}
                    alt="Contact Us"
                    className="opacity-90 pl-3 rounded-xl hidden md:block md:w-1/2"
                    style={{
                        WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
                        maskImage: "radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)"
                    }}
                />
            </div>
        </div>
    );
}

export default Login;