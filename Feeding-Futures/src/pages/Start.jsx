import React from 'react';

const Start = () => {
  return (
    <div className="h-screen w-full bg-white flex flex-col items-center mt-20 font-poppins px-4">
      {/* Title */}
      <p className="text-3xl md:text-5xl font-bold mb-6 text-center text-black">
        Welcome to Feeding <span className="text-[#06C167] font-extrabold">Futures</span>
      </p>

      {/* Subtitle */}
      <p className="text-3xl mb-12 mt-10 font-medium text-center text-black">Login as</p>

      {/* Buttons stacked vertically */}
      <div className="flex flex-col items-center gap-4">
        <a
          href="signup.php"
          className="bg-[#06C167] text-white px-8 py-2 tracking-[2px] text-lg transition-all duration-200"
          style={{ letterSpacing: '2px' }}
          onMouseEnter={e => (e.currentTarget.style.letterSpacing = '6px')}
          onMouseLeave={e => (e.currentTarget.style.letterSpacing = '2px')}
        >
          User
        </a>

        <a
          href="admin/signup.php"
          className="bg-[#06C167] text-white px-8 py-2 tracking-[2px] text-lg transition-all duration-200"
          style={{ letterSpacing: '2px' }}
          onMouseEnter={e => (e.currentTarget.style.letterSpacing = '6px')}
          onMouseLeave={e => (e.currentTarget.style.letterSpacing = '2px')}
        >
          Admin
        </a>

        <a
          href="delivery/deliverysignup.php"
          className="bg-[#06C167] text-white px-8 py-2 tracking-[2px] text-lg transition-all duration-200"
          style={{ letterSpacing: '2px' }}
          onMouseEnter={e => (e.currentTarget.style.letterSpacing = '6px')}
          onMouseLeave={e => (e.currentTarget.style.letterSpacing = '2px')}
        >
          Delivery
        </a>
      </div>
    </div>
  );
};

export default Start;
