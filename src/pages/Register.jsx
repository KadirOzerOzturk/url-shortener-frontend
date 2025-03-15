import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import loginIcon from "../assets/Login-amico.png";

function Register() {
    const [form, setForm] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [info, setInfo] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestData = { ...form };
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/register`, requestData);

            if (res.status === 201) {
                setInfo("User registered successfully!");
                setForm({
                    name: "",
                    surname: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                });
                setError("");
            }
        } catch (error) {
            setError('Something went wrong! Please try again later');
            setInfo("");
        }
    };

    useEffect(() => {
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match!");
        } else {
            setError("");
        }
    }, [form.password, form.confirmPassword]);

    return (
        <div className="flex items-center justify-center w-full min-h-screen p-4">
            <Helmet>
                <title>Register - Shorterly</title>
                <meta name="description" content="Register to Shorterly's URL Shortener and QR Code Generator. Create your account and get started with shortening URLs and generating QR codes effortlessly." />
                <meta name="keywords" content="Register, URL Shortener, QR Code Generator, Shorterly Registration, Create Account" />
                <meta name="robots" content="index, follow" />
            </Helmet>
            <div className='bg-[#FBD8C4] w-full max-w-4xl rounded-lg p-8 flex flex-col md:flex-row shadow-lg'>
                <form className='w-full md:w-1/2' onSubmit={handleSubmit}>
                    <h1 className='text-2xl font-bold mb-4 text-center'>Register</h1>
                    <div className='flex flex-col md:flex-row gap-2'>
                        <input type="text" name="name" placeholder='Name' className='w-full h-12 px-4 mb-4 rounded-lg border border-gray-300' onChange={handleChange} value={form.name} aria-label="Name" />
                        <input type="text" name='surname' placeholder='Surname' className='w-full h-12 px-4 mb-4 rounded-lg border border-gray-300' onChange={handleChange} value={form.surname} aria-label="Surname" />
                    </div>
                    <input type="email" name="email" placeholder='Email' className='w-full h-12 px-4 mb-4 rounded-lg border border-gray-300' onChange={handleChange} value={form.email} aria-label="Email" />
                    <div className="relative w-full mb-4">
                        <input type={showPassword ? "text" : "password"} name="password" placeholder='Password' className='w-full h-12 px-4 pr-10 rounded-lg border border-gray-300' onChange={handleChange} value={form.password} aria-label="Password" />
                        <button type="button" className="absolute inset-y-0 right-2 px-2 py-1 text-sm text-gray-600" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    <div className="relative w-full mb-4">
                        <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder='Confirm Password' className='w-full h-12 px-4 pr-10 rounded-lg border border-gray-300' onChange={handleChange} value={form.confirmPassword} aria-label="Confirm Password" />
                        <button type="button" className="absolute inset-y-0 right-2 px-2 py-1 text-sm text-gray-600" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    <button type='submit' className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full'>
                        Register
                    </button>
                    {info && <p className="mt-4 text-green-500">{info}</p>}
                    {error && <p className="mt-4 text-red-500">{error}</p>}
                </form>
                <img src={loginIcon} alt="Register" className="opacity-90 pl-3 rounded-xl hidden md:block md:w-1/2" />
            </div>
        </div>
    );
}

export default Register;
