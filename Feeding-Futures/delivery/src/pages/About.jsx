import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-700 text-white flex flex-col">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center bg-blue-800 p-12 text-center">
        <h2 className="text-4xl font-bold mb-4">Helping Nourish the Future</h2>
        <p className="text-xl mb-6 max-w-3xl">
          At Feeding Futures, we believe no meal should go to waste. Together, we can feed the hungry and reduce food waste, creating a sustainable future for all.
        </p>
        <a href="#join" className="bg-white text-blue-800 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition">
          Join the Movement
        </a>
      </section>

      {/* About Section */}
      <section id="about" className="bg-white py-16 text-center">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-semibold mb-6 text-gray-800">What We Do</h3>
          <p className="text-lg text-gray-600 mb-4">
            We bridge the gap between surplus food from providers like restaurants, events, and canteens, and those in need through our network of dedicated NGOs. Every meal counts. 
          </p>
          <p className="text-lg text-gray-600">
            Our platform makes it easy for NGOs to receive food donations, ensuring it reaches the people who need it most, reducing waste, and making the world a better place, one meal at a time.
          </p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="join" className="bg-blue-700 p-16 text-center text-white">
        <h3 className="text-3xl font-semibold mb-6">Join Us in the Fight Against Hunger</h3>
        <p className="text-xl mb-6">
          We’re looking for passionate NGOs, volunteers, and food providers to help us scale our impact. Let’s work together to reduce food waste and end hunger.
        </p>
        <a href="#contact" className="bg-white text-blue-700 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition">
          Get in Touch
        </a>
      </section>

      {/* Impact Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 p-16 text-center text-white">
        <h3 className="text-3xl font-semibold mb-6">Our Impact So Far</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white text-blue-800 p-8 rounded-xl shadow-md">
            <h4 className="text-2xl font-bold mb-2">50,000+ Meals Donated</h4>
            <p>Helping thousands of families receive nutritious meals every day.</p>
          </div>
          <div className="bg-white text-blue-800 p-8 rounded-xl shadow-md">
            <h4 className="text-2xl font-bold mb-2">100+ Partner NGOs</h4>
            <p>Collaborating with NGOs across the region to fight hunger.</p>
          </div>
          <div className="bg-white text-blue-800 p-8 rounded-xl shadow-md">
            <h4 className="text-2xl font-bold mb-2">500+ Food Providers</h4>
            <p>Connecting with restaurants, offices, and events to redistribute food.</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
