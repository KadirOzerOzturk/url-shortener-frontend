import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import contactus from "../assets/contactus.png"
function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: ""
    })
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(form)
        setForm({
            name: "",
            email: "",
            message: ""
        })
    }
    return (
        <div className="flex items-center justify-center w-full min-h-screen p-4">
            <Helmet>
                <title>Contact Us</title>
                <meta name="description" content="Get in touch with us for any queries or support related to our QR Code Generator." />
                <meta name="keywords" content="Contact, QR Code support, QR code generator help, customer support" />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Contact Us - QR Code Generator" />
                <meta property="og:description" content="Get in touch with us for any queries or support related to our QR Code Generator." />
                <meta property="og:image" content="URL_TO_YOUR_CONTACT_IMAGE" />
                <meta property="og:url" content="https://www.shorterly.net/contact" />
            </Helmet>
            <div className='bg-[#FBD8C4] w-full max-w-4xl rounded-lg p-8 flex flex-col md:flex-row'>
                <form className='w-full md:w-1/2'>
                    <h1 className='text-2xl font-bold mb-4'>Contact Us</h1>
                    <input type="text" placeholder='Name' className='w-full h-12 px-4 mb-4 rounded-lg' onChange={handleChange} name="name" value={form.name} />
                    <input type="email" placeholder='Email' className='w-full h-12 px-4 mb-4 rounded-lg' onChange={handleChange} name="email" value={form.email} />
                    <textarea placeholder='Message' className='w-full   max-h-32 px-4 mb-4 py-2 rounded-lg' onChange={handleChange} name="message" value={form.message}></textarea>
                    <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-lg' onClick={handleSubmit}>Submit</button>
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

export default Contact