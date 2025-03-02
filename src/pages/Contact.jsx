import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import contactus from "../assets/contactus.png"
import axios from 'axios'

function Contact() {
    const [info, setInfo] = useState("");
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        name: "",
        from: "",
        to: "oztrkkadirozer@gmail.com",
        body: "",
        subject: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestData = { ...form };
            requestData.subject = requestData.body;

            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/mail/send`, requestData);

            if (res.status === 200) {
                setInfo("Email sent successfully!");
                setForm({
                    name: "",
                    from: "",
                    body: "",
                    subject: ""
                });
            }
        } catch (error) {
            setError('Something went wrong! Please try again later');
        }
    }

    return (
        <div className="flex items-center justify-center w-full min-h-screen p-4">
            <Helmet>
                <title>Contact Us - Shorterly</title>
                <meta name="description" content="Get in touch with us for any queries or support related to Shorterly's URL Shortener and QR Code Generator." />
                <meta name="keywords" content="Contact, QR Code support, URL shortener help, customer support" />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Contact Us - Shorterly" />
                <meta property="og:description" content="Get in touch with us for any queries or support related to Shorterly's URL Shortener and QR Code Generator." />
                <meta property="og:image" content={process.env.REACT_APP_MAIN_ICON} />

                <meta property="og:url" content="https://www.shorterly.net/contact" />
            </Helmet>
            <div className='bg-[#FBD8C4] w-full max-w-4xl rounded-lg p-8 flex flex-col md:flex-row'>
                <form className='w-full md:w-1/2'>
                    <h1 className='text-2xl font-bold mb-4'>Contact Us</h1>
                    <input
                        type="text"
                        placeholder='Name'
                        className='w-full h-12 px-4 mb-4 rounded-lg'
                        onChange={handleChange}
                        name="name"
                        value={form.name}
                    />
                    <input
                        type="from"
                        placeholder='Email'
                        className='w-full h-12 px-4 mb-4 rounded-lg'
                        onChange={handleChange}
                        name="from"
                        value={form.email}
                    />
                    <textarea
                        placeholder='Message'
                        className='w-full max-h-32 px-4 mb-4 py-2 rounded-lg'
                        onChange={handleChange}
                        name="body"
                        value={form.body}
                    ></textarea>
                    <button
                        type='submit'
                        className='bg-blue-500 text-white px-4 py-2 rounded-lg'
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                    {info && <p className="mt-4 text-green-500">{info}</p>}
                    {error && <p className="mt-4 text-red-500">{error}</p>}
                </form>
                <img
                    src={contactus}
                    alt="Contact Us"
                    className="opacity-90 pl-3 rounded-xl hidden md:block md:w-1/2"
                    style={{
                        WebkitMaskImage: "radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
                        maskImage: "radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)"
                    }}
                />
            </div>
        </div>
    )
}

export default Contact;