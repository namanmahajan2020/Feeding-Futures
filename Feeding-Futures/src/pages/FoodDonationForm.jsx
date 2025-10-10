import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate(); 
const userEmail = localStorage.getItem("email");
const FoodDonationForm = () => {
    const [formData, setFormData] = useState({
        foodname: '',
        meal: 'veg',
        category: 'cooked-food',
        quantity: '',
        phoneno: '',
        district: 'chennai',
        address: '',
        name: '',
        email: userEmail || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/food-donation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                alert("Donation submitted successfully!");
                setFormData({
                    foodname: '',
                    meal: 'veg',
                    category: 'cooked-food',
                    quantity: '',
                    phoneno: '',
                    district: 'madurai',
                    address: '',
                    name: '',
                    email: userEmail,
                });
                navigate("/"); // 👈 Redirect to home page
            }
            else {
                alert(data.message || "Submission failed.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("Server error. Please try again.");
        }
    };


    return (
        <div className="bg-gradient-to-b from-green-50 to-white min-h-screen flex items-center justify-center py-8">
            <div className="bg-gradient-to-b from-white to-green-100 p-8 rounded-lg shadow-lg w-full max-w-2xl">
                <h1 className="text-3xl font-bold text-center text-black mb-6">
                    Feeding <span className="text-[#06C167]">Futures</span>
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-lg font-medium text-black mb-2" htmlFor="foodname">
                            Food Name:
                        </label>
                        <input
                            type="text"
                            id="foodname"
                            name="foodname"
                            className="w-full p-3 border border-gray-300 rounded-md"
                            value={formData.foodname}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg font-medium text-black mb-2">Meal type:</label>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="veg"
                                name="meal"
                                value="veg"
                                checked={formData.meal === 'veg'}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <label htmlFor="veg" className="mr-6">Veg</label>

                            <input
                                type="radio"
                                id="Non-veg"
                                name="meal"
                                value="Non-veg"
                                checked={formData.meal === 'Non-veg'}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <label htmlFor="Non-veg">Non-veg</label>
                        </div>
                    </div>

                    <div className="mb-9 mt-9">
                        <label className="block text-lg font-medium text-black mb-2">Select the Category:</label>
                        <div className="flex justify-around">
                            <label htmlFor="raw-food">
                                <input
                                    type="radio"
                                    id="raw-food"
                                    name="category"
                                    value="raw-food"
                                    checked={formData.category === 'raw-food'}
                                    onChange={handleChange}
                                    className="hidden"
                                />
                                <img
                                    src="img/raw-food.png"
                                    alt="raw-food"
                                    className={`w-40 cursor-pointer hover:scale-105  ${formData.category === 'raw-food' ? 'border-2 border-black' : ''}`}
                                />
                            </label>

                            <label htmlFor="cooked-food">
                                <input
                                    type="radio"
                                    id="cooked-food"
                                    name="category"
                                    value="cooked-food"
                                    checked={formData.category === 'cooked-food'}
                                    onChange={handleChange}
                                    className="hidden"
                                />
                                <img
                                    src="img/cooked-food.png"
                                    alt="cooked-food"
                                    className={`w-40 cursor-pointer hover:scale-105  ${formData.category === 'cooked-food' ? 'border-2 border-black' : ''}`}
                                />
                            </label>

                            <label htmlFor="packed-food">
                                <input
                                    type="radio"
                                    id="packed-food"
                                    name="category"
                                    value="packed-food"
                                    checked={formData.category === 'packed-food'}
                                    onChange={handleChange}
                                    className="hidden"
                                />
                                <img
                                    src="img/packed-food.png"
                                    alt="packed-food"
                                    className={`w-40 cursor-pointer hover:scale-105 ${formData.category === 'packed-food' ? 'border-2 border-black' : ''}`}
                                />
                            </label>
                        </div>
                    </div>

                    <div className="mb-12">
                        <label className="block text-lg font-medium text-black mb-2" htmlFor="quantity">
                            Quantity (number of persons / kg):
                        </label>
                        <input
                            type="text"
                            id="quantity"
                            name="quantity"
                            className="w-full p-3 border border-gray-300 rounded-md"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <p className="text-center text-2xl text-gray-700 font-semibold mb-1">Contact Details</p>

                    <div className="mb-4">
                        <label className="block text-lg font-medium text-black mb-2" htmlFor="name">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full p-3 border border-gray-300 rounded-md"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg font-medium text-black mb-2" htmlFor="phoneno">
                            Phone No:
                        </label>
                        <input
                            type="text"
                            id="phoneno"
                            name="phoneno"
                            className="w-full p-3 border border-gray-300 rounded-md"
                            maxLength="10"
                            pattern="[0-9]{10}"
                            value={formData.phoneno}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg font-medium text-black mb-2" htmlFor="district">
                            District:
                        </label>
                        <select
                            id="district"
                            name="district"
                            className="w-full p-3 border border-gray-300 rounded-md"
                            value={formData.district}
                            onChange={handleChange}
                        >
                            <option value="madurai">Madurai</option>
                            <option value="chennai">Chennai</option>
                            <option value="coimbatore">Coimbatore</option>
                            {/* Add other districts here */}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg font-medium text-black mb-2" htmlFor="address">
                            Address:
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            className="w-full p-3 border border-gray-300 rounded-md"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4 mt-10 flex justify-center">
                        <button
                            type="submit"
                            className="w-3/5 bg-green-600 text-white p-3 rounded-md text-lg hover:scale-105 hover:bg-green-700"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FoodDonationForm;
