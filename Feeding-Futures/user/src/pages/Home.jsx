import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  const quotes = [
    "A shared meal can carry more hope than words.",
    "When food is saved, futures are saved too.",
    "Kindness tastes better when everyone gets a plate.",
  ];
  const works = [
    {
      img: "img/p1.jpeg",
      alt: "Work 1",
      title: "Joy In Every Plate",
      text: "Fresh rescued meals served to children with care and dignity.",
    },
    {
      img: "img/p4.jpeg",
      alt: "Work 2",
      title: "Stronger Communities",
      text: "Volunteers and partners coordinate to deliver food quickly.",
    },
    {
      img: "img/p3.jpeg",
      alt: "Work 3",
      title: "Food To Futures",
      text: "Every surplus meal becomes support for someone who needs it.",
    },
  ];
  const [activeQuote, setActiveQuote] = useState(0);

  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen font-poppins">
      {/* Banner */}
      <section className="w-full pt-16 sm:pt-[4.5rem] sm:-mt-[4.5rem]">
        <div
          className="hidden sm:flex h-[90vh] w-full bg-cover bg-center items-center justify-center"
          style={{ backgroundImage: "url('img/coverimage.jpeg')" }}
        >
          <div className="mx-6 max-w-3xl rounded-3xl border border-white/30 bg-white/20 p-8 text-center text-white shadow-[0_20px_50px_rgba(15,23,42,0.24)] backdrop-blur-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-white/90">
              Share Food. Build Hope.
            </p>
            <h1 className="mt-4 text-5xl font-extrabold leading-tight">
              Feeding Futures starts with one plate at a time.
            </h1>
            <p className="mt-4 text-xl text-white/90">
              We connect extra food to people who need it, quickly and respectfully.
            </p>
          </div>
        </div>
        <div className="sm:hidden px-2">
          <img
            src="img/coverimage.jpeg"
            alt="Children sharing food"
            className="w-full h-auto rounded-2xl object-cover"
          />
          <div className="mt-3 rounded-2xl bg-white/80 p-4 text-center shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">
              Share Food. Build Hope.
            </p>
            <p className="mt-2 text-xl font-bold text-slate-800">
              Feeding Futures starts with one plate at a time.
            </p>
          </div>
        </div>
      </section>

      <div className="flex justify-center mt-6 mb-6 px-4 sm:px-0">
        <>
          <style>
            {`
              @keyframes wiggle {
                0%, 100% { transform: rotate(-2deg) scale(1); box-shadow: 0 0 10px orange; }
                50% { transform: rotate(2deg) scale(1.1); box-shadow: 0 0 20px yellow; }
              }
              .hover-wiggle:hover {
                animation: wiggle 0.9s ease-in-out infinite;
              }
            `}
          </style>

          <NavLink
            to="/foodDonationForm"
            className="inline-block border-2 mt-1 rounded-lg border-red-500 shadow-lg shadow-red-900 bg-red-700 text-white uppercase tracking-widest px-10 py-3 font-semibold transition-all duration-500 ease-in-out hover:bg-red-700 hover:border-red-600 hover:shadow-2xl hover-wiggle"
          >
            Donate Food
          </NavLink>
        </>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-0">
        <div className="bg-green-600 p-6 max-w-3xl mt-2 mb-10 mx-auto rounded-2xl">
          <p className="text-white text-xl sm:text-xl font-normal text-center leading-relaxed">
            Cutting food waste is a delicious way of saving money, helping to
            feed the world and protect the planet.
          </p>
        </div>
      </div>

      {/* Quote Picker */}
      <div className="mx-auto mb-10 max-w-4xl px-4 sm:px-6">
        <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
          <p className="text-center text-xl font-semibold italic text-emerald-700 sm:text-2xl">
            "{quotes[activeQuote]}"
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {quotes.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveQuote(idx)}
                className={`h-2.5 w-10 rounded-full transition ${
                  activeQuote === idx ? "bg-emerald-600" : "bg-emerald-200 hover:bg-emerald-300"
                }`}
                aria-label={`Show quote ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Our Works */}
      <div className="p-6 max-w-6xl mx-auto mt-16 sm:mt-20 md:mt-24">
        <p className="text-4xl text-center font-semibold underline decoration-green-500 decoration-4 sm:no-underline sm:text-6xl sm:font-black sm:tracking-[-0.02em] sm:text-slate-900">
          Our Works
        </p>
        <p className="text-center text-3xl mt-8 mb-8 font-medium sm:text-3xl sm:font-medium sm:text-slate-600 sm:max-w-3xl sm:mx-auto sm:leading-snug">
          "Look what we can do together."
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {works.map((work) => (
            <article
              key={work.alt}
              className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 sm:rounded-3xl sm:shadow-[0_18px_40px_rgba(15,23,42,0.12)] sm:hover:-translate-y-2"
            >
              <img
                src={work.img}
                alt={work.alt}
                className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105 sm:h-64"
              />
              <div className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-emerald-700 sm:text-2xl sm:font-bold sm:text-emerald-700">
                  {work.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600 sm:mt-2 sm:text-base sm:leading-relaxed">
                  {work.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;
