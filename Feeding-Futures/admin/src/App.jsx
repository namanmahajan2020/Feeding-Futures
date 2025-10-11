import React from "react";

const Card = () => {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md p-6 mt-10">
      <h1 className="text-2xl font-bold text-green-600 mb-2">Hello, Tailwind!</h1>
      <p className="text-gray-700">
        This is a small card component styled with Tailwind CSS.
      </p>
      <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
        Click Me
      </button>
    </div>
  );
};

export default Card;
