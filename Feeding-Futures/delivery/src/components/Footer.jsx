import React from 'react';
import { Mail, Phone } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            id="contact"
            className="bg-gradient-to-b from-blue-900 to-indigo-900 px-4 py-4 text-center text-white border-t-1 lg:px-6 lg:py-3"
        >
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col items-center gap-3 lg:flex-row lg:justify-between lg:items-center">
                    <div className="flex-shrink-0 text-2xl font-extrabold text-white cursor-pointer">
                        Feeding <b className="text-emerald-500">Futures</b>
                    </div>

                    <p className="max-w-[14rem] text-sm leading-6 text-slate-200 lg:max-w-none">
                        &copy; {currentYear} Feeding Futures - All rights reserved.
                    </p>

                    <div className="flex flex-col items-center gap-2 lg:items-start">
                        <a
                            href="mailto:feedingfutures@gmail.com"
                            className="flex items-center text-sm text-white hover:text-emerald-300 transition-colors duration-200"
                        >
                            <Mail className="mr-2 h-3.5 w-3.5 shrink-0" />
                            feedingfutures@gmail.com
                        </a>

                        <a
                            href="tel:+1234567890"
                            className="flex items-center text-sm text-white hover:text-emerald-300 transition-colors duration-200"
                        >
                            <Phone className="mr-2 h-3.5 w-3.5 shrink-0" />
                            987-774-3016
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
