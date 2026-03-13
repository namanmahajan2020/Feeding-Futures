import React from "react";
import { FaLeaf, FaHandsHelping, FaClock, FaMobileAlt } from "react-icons/fa";

const featureCards = [
  {
    title: "Sustainability",
    text: "Reducing waste, lowering emissions, and preserving resources.",
    icon: FaLeaf,
  },
  {
    title: "Community",
    text: "Partnering with NGOs to feed the hungry across India.",
    icon: FaHandsHelping,
  },
  {
    title: "Efficiency",
    text: "Real-time food tracking and optimized delivery routes.",
    icon: FaClock,
  },
  {
    title: "Technology",
    text: "Easy-to-use app connecting donors, volunteers & NGOs seamlessly.",
    icon: FaMobileAlt,
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white font-poppins">
      <div className="h-18 sm:h-20" />

      <section
        id="about"
        className="mx-auto mt-8 flex max-w-7xl flex-col items-stretch gap-8 px-4 sm:mt-12 sm:px-6 md:px-12 lg:mt-15 lg:flex-row lg:items-center lg:gap-12 lg:px-24"
      >
        <div className="space-y-5 lg:w-1/2 sm:space-y-6">
          <h1 className="text-3xl font-extrabold leading-tight text-green-700 sm:text-4xl md:text-5xl md:whitespace-nowrap">
            About <span className="text-gray-900">Feeding Futures</span>
          </h1>

          <p className="text-base leading-7 text-gray-700 sm:text-lg md:text-xl">
            We turn food waste into food hope. Connecting surplus meals to people
            in need - fast, smart, and sustainably.
          </p>

          <p className="text-sm italic leading-6 text-gray-600 sm:text-base">
            "Because every bite shared today shapes the future we feed."
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6">
            {featureCards.map(({ title, text, icon: Icon }) => (
              <div
                key={title}
                className="flex items-start gap-3 rounded-xl bg-green-100 p-4 shadow-md transition hover:shadow-xl sm:gap-4 sm:p-6"
              >
                <Icon className="mt-1 text-2xl text-green-600 sm:text-3xl" />
                <div>
                  <h3 className="text-lg font-semibold text-green-800">{title}</h3>
                  <p className="mt-1 text-sm text-gray-700">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2 lg:mt-15 lg:w-1/2">
          <img
            src="img/community.webp"
            alt="Community sharing food"
            className="w-full rounded-3xl shadow-lg transition-transform duration-500 hover:scale-105"
          />
          <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-7 text-gray-700 sm:mt-8 sm:text-lg md:mt-10 md:text-xl">
            Every shared meal is a gesture of kindness that feeds not just the
            body, but also hope and community. By turning surplus food into
            nourishment, we help build a future where no one goes hungry and
            every bite makes a difference.
          </p>
        </div>
      </section>

      <section className="mx-auto min-h-screen px-4 py-12 font-poppins sm:px-6 sm:py-16 md:px-12 lg:px-24 lg:py-20">
        <h1 className="mb-8 text-center text-3xl font-bold text-green-700 sm:mb-10 sm:text-4xl md:mb-12 md:text-5xl">
          Nourishing Communities, One Meal at a Time
        </h1>

        <div className="mx-auto max-w-6xl space-y-6 text-left text-base leading-7 text-gray-700 sm:space-y-8 md:text-justify md:text-lg md:leading-relaxed">
          <p>
            Every meal counts when millions go hungry. We connect surplus food
            to those in need, transforming waste into hope and health.
          </p>

          <p>
            Collaborating with NGOs and local partners, we recover leftover food
            from workplaces, events, and kitchens - delivering it efficiently
            and sustainably.
          </p>

          <h2 className="mb-3 mt-8 text-2xl font-semibold text-green-700 sm:mb-4 sm:mt-10">
            Why It Matters
          </h2>
          <p>
            Food waste is a major global crisis - while millions suffer from
            hunger daily, nearly one-third of all food produced is discarded,
            wasting vital resources like water, energy, and labor, and
            contributing significantly to climate change. At Feeding Futures, we
            tackle this issue head-on by rescuing surplus food and efficiently
            redirecting it to those in need through real-time tracking and smart
            logistics.
          </p>

          <p>
            Our mission goes beyond feeding the hungry; it is about building a
            sustainable community that values every meal, protects our planet,
            and creates lasting impact. By turning food waste into nourishment,
            we are shaping a healthier, more equitable future for all.
          </p>

          <h2 className="mb-3 mt-8 text-2xl font-semibold text-green-700 sm:mb-4 sm:mt-10">
            Making a Difference
          </h2>
          <p>
            Making a difference every day, we rescue surplus food - from small
            donations to large festival feasts - and transform it into
            thousands of nutritious meals for communities in need. Through
            strong partnerships with local NGOs and dedicated volunteers, we
            ensure every meal reaches those who need it most quickly and
            efficiently, creating a lasting positive impact across many lives
            each week.
          </p>

          <h2 className="mb-3 mt-8 text-2xl font-semibold text-green-700 sm:mb-4 sm:mt-10">
            Join the Movement
          </h2>
          <p>
            We invite you to be part of this journey - whether you are a donor
            with surplus food, a volunteer with a heart to help, or a partner
            organization committed to change. Because every bite shared today
            shapes the future we feed.
          </p>

          <p className="text-lg font-semibold italic text-green-600 sm:text-xl">
            Together, we can turn food waste into food hope - one meal at a
            time.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
