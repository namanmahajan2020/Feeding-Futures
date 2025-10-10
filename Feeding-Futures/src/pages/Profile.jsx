import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Profile = () => {
    const [navActive, setNavActive] = useState(false);
    const navigate = useNavigate();
    const [donations, setDonations] = useState([]);

    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const gender = localStorage.getItem("gender");

    useEffect(() => {
        if (!name || !email) {
            navigate("/signup");
        } else {
            fetchDonations();
        }
    }, []);

    const fetchDonations = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/donations/get", { email });
            setDonations(res.data);
        } catch (error) {
            console.error("Error fetching donations:", error);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/signup");
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white">
            {/* Navbar */}
            <Navbar navActive={navActive} setNavActive={setNavActive} />
            {/* Main content area that grows to push footer down */}
            <div className="flex-grow flex items-start justify-center mt-16 mb-10 px-4">
                <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-6 mt-10">
                    <h2 className="text-3xl text-gray-800 font-semibold mb-6 flex items-center">
                        <img src="img/user.png" alt="user" className="w-10 h-10 mr-3" />
                        Your Profile
                    </h2>

                    <div className="text-gray-700 space-y-3">
                        <p><span className="font-semibold">Name:</span> {name}</p>
                        <p><span className="font-semibold">Email:</span> {email}</p>
                        <p><span className="font-semibold">Gender:</span> {gender}</p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                    >
                        Logout
                    </button>

                    <hr className="my-6" />

                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">Your Donations</h3>
                    <div className=" overflow-y-auto max-h-56 border rounded-lg shadow-sm">
                        <table className=" min-w-full text-sm text-gray-700">
                            <thead className="bg-green-100 text-green-800 sticky top-0">
                                <tr>
                                    <th className="py-2 px-3">Food</th>
                                    <th className="py-2 px-3">Type</th>
                                    <th className="py-2 px-3">Category</th>
                                    <th className="py-2 px-3">Date/Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donations.length > 0 ? (
                                    donations.map((item, index) => (
                                        <tr key={index} className="border-t text-left hover:bg-gray-50">
                                            <td className="py-2 px-3">{item.food}</td>
                                            <td className="py-2 px-3">{item.type}</td>
                                            <td className="py-2 px-3">{item.category}</td>
                                            <td className="py-2 px-3">{new Date(item.date).toLocaleString()}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="py-4 text-center text-gray-500">
                                            No donations found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Footer always at bottom */}
            <Footer />
        </div>
    );
};

export default Profile;
