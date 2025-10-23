import React from 'react';
import { Mail, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer
            id="contact"
            className="bg-gradient-to-b from-blue-900 to-indigo-900 py-3 px-6 text-center text-white flex justify-between items-center border-t-1"
        >
            <div className="flex-shrink-0 text-2xl font-extrabold text-white cursor-pointer">
                Feeding <b className="text-emerald-500">Futures</b>
            </div>

            <p className="text-sm text-slate-200">
                &copy; 2025 Feeding Futures - All rights reserved.
            </p>

            <div className="flex flex-col space-x-6">
                {/* Mail Icon */}
                <a
                    href="mailto:feedingfutures@gmail.com"
                    className="flex items-center text-white hover:text-emerald-500 transition-colors duration-200 text-sm"
                >
                    <Mail className="w-3 h-3 mr-2" />
                    feedingfutures@gmail.com
                </a>

                {/* Phone Icon */}
                <a
                    href="tel:+1234567890"
                    className="flex items-center text-white hover:text-emerald-500 transition-colors duration-200 text-sm"
                >
                    <Phone className="w-3 h-3 mr-2" />
                    987-774-3016
                </a>
            </div>
        </footer>
    );
};

export default Footer;
