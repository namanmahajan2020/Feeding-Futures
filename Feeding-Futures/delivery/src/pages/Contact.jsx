import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, message } = formData;

    if (!name || !email || !message) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });  // Clear form
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <div className=" bg-gradient-to-b from-blue-50 to-white font-poppins">
      {/* Heading */}
      <div className="flex justify-center">
        <p className="text-4xl font-extrabold leading-tight my-6 mb-10 border-b-4 border-b-green-600 pb-1 inline-block">
          Contact <span className='text-green-800'>Us</span>
        </p>
      </div>

      {/* Contact Form and Info */}
      <div className="max-w-4xl mx-auto px-6 md:px-0 grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 space-y-4 rounded-2xl shadow-md text-gray-700 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
        >
          <div>
            <label htmlFor="name" className="block font-semibold mb-1">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-semibold mb-1">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block font-semibold mb-1">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            name="send"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded transition"
          >
            Send
          </button>

          {submitStatus && (
            <div className={`mt-4 ${submitStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {submitStatus === 'success' ? 'Feedback submitted successfully!' : 'Error submitting feedback. Please try again.'}
            </div>
          )}
        </form>

        {/* Contact Info */}
        <div className="bg-white p-6 rounded-2xl shadow-md text-gray-700 space-y-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
          <p className="text-xl font-semibold text-green-700 border-b pb-2">Get in Touch</p>

          <div className="flex items-center space-x-3">
            <i className="fas fa-envelope text-green-600"></i>
            <p><strong>Email:</strong> feedingfutures@gmail.com</p>
          </div>

          <div className="flex items-center space-x-3">
            <i className="fas fa-phone text-green-600"></i>
            <p><strong>Phone:</strong> 987-774-3016</p>
          </div>

          <div className="flex items-center space-x-3">
            <i className="fas fa-map-marker-alt text-green-600"></i>
            <p><strong>Location:</strong> Chennai, Tamil Nadu</p>
          </div>

          <div className="pt-4 border-t-1 mt-5 border-green-700">
            <p className="text-sm mt-3 text-gray-600">
              We’d love to stay connected! Follow us on social media for updates, events, and stories from <span className="text-green-700 font-semibold">Feeding Futures</span>.
            </p>

            <div className="flex flex-col sm:flex-row sm:space-x-6 mt-10 justify-center gap-10 sm:space-y-0">
              <a href="https://www.facebook.com/">
                <img className='w-12 hover:scale-105 transition-all' src="img/facebook.png" alt="Facebook" />
              </a>
              <a href="https://www.instagram.com/">
                <img className='w-12 hover:scale-105 transition-all' src="img/instagram.png" alt="Instagram" />
              </a>
              <a href="https://www.youtube.com/">
                <img className='w-12 hover:scale-105 transition-all' src="img/youtube.png" alt="Youtube" />
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Contact;
