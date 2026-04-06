import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../config';

const ProfileEditor = ({ user, token }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        bio: '',
        specialization: '',
        ticketPrice: 0,
        qualifications: [],
        experiences: [],
        timeSlots: [],
        about: '',
    });

    useEffect(() => {
        setFormData({
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            bio: user?.bio || '',
            specialization: user?.specialization || '',
            ticketPrice: user?.ticketPrice || 0,
            qualifications: user?.qualifications || [],
            experiences: user?.experiences || [],
            timeSlots: user?.timeSlots || [],
            about: user?.about || '',
        });
    }, [user]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleReusableInputChangeFunc = (key, index, event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => {
            const updateItems = [...prevFormData[key]];
            updateItems[index][name] = value;
            return {
                ...prevFormData,
                [key]: updateItems,
            };
        });
    };

    const addItem = (key, item) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [key]: [...prevFormData[key], item],
        }));
    };

    const deleteItem = (key, index) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [key]: prevFormData[key].filter((_, i) => i !== index),
        }));
    };

    const updateProfileHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${BASE_URL}/api/v1/services/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const result = await res.json();
            if (!res.ok) {
                throw new Error(result.message);
            }

            toast.success(result.message);
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div>
            <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
                Profile Information
            </h2>
            <form onSubmit={updateProfileHandler}>
                <div className="mb-5">
                    <p className="form__label">Name*</p>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name" className="form__input" />
                </div>
                <div className="mb-5">
                    <p className="form__label">Email*</p>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="form__input" readOnly aria-readonly disabled="true" />
                </div>
                <div className="mb-5">
                    <p className="form__label">Phone*</p>
                    <input type="number" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone number" className="form__input" />
                </div>
                <div className="mb-5">
                    <p className="form__label">Bio*</p>
                    <input type="text" name="bio" value={formData.bio} onChange={handleInputChange} placeholder="Bio" className="form__input" maxLength={100} />
                </div>

                <div className="mb-5">
                    <div className="grid grid-cols-2 gap-5 mb-[30px]">
                        <div>
                            <p className="form__label">Specialization*</p>
                            <input type="text" name="specialization" value={formData.specialization} onChange={handleInputChange} placeholder="Your specialisation" className="form__input" />
                        </div>
                        <div>
                            <p className="form__label">Ticket Price*</p>
                            <input type="number" name="ticketPrice" value={formData.ticketPrice} onChange={handleInputChange} placeholder="100" className="form__input" />
                        </div>
                    </div>
                </div>

                {/* QUALIFICATIONS */}
                <div className="mb-5">
                    <p className="form__label">Qualifications*</p>
                    {formData.qualifications?.map((item, index) => (
                        <div key={index} className="flex grid grid-cols-2 gap-5 items-center mb-4 border border-gray-200 p-4 rounded-md">
                            <div>
                                <p className="form__label">Start Date*</p>
                                <input type="date" name="startingDate" value={item.startingDate} onChange={(e) => handleReusableInputChangeFunc('qualifications', index, e)} className="form__input" />
                            </div>
                            <div>
                                <p className="form__label">End Date*</p>
                                <input type="date" name="endingDate" value={item.endingDate} onChange={(e) => handleReusableInputChangeFunc('qualifications', index, e)} className="form__input" />
                            </div>
                            <div className="col-span-2">
                                <p className="form__label">Degree/Certification*</p>
                                <input type="text" name="degree" value={item.degree} onChange={(e) => handleReusableInputChangeFunc('qualifications', index, e)} className="form__input" />
                            </div>
                            <div className="col-span-2 flex justify-between">
                                <input type="text" name="university" value={item.university} onChange={(e) => handleReusableInputChangeFunc('qualifications', index, e)} placeholder="University or Body" className="form__input w-3/4" />
                                <button type="button" onClick={() => deleteItem('qualifications', index)} className="bg-red-600 p-2 rounded-full text-white w-10 h-10 mt-2 hover:bg-red-700">X</button>
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={() => addItem('qualifications', { startingDate: '', endingDate: '', degree: '', university: '' })} className="bg-black py-2 px-5 rounded text-white h-fit cursor-pointer hover:bg-gray-800">Add Qualification</button>
                </div>

                {/* EXPERIENCES */}
                <div className="mb-5">
                    <p className="form__label">Experiences*</p>
                    {formData.experiences?.map((item, index) => (
                        <div key={index} className="flex grid grid-cols-2 gap-5 items-center mb-4 border border-gray-200 p-4 rounded-md">
                            <div>
                                <p className="form__label">Start Date*</p>
                                <input type="date" name="startingDate" value={item.startingDate} onChange={(e) => handleReusableInputChangeFunc('experiences', index, e)} className="form__input" />
                            </div>
                            <div>
                                <p className="form__label">End Date*</p>
                                <input type="date" name="endingDate" value={item.endingDate} onChange={(e) => handleReusableInputChangeFunc('experiences', index, e)} className="form__input" />
                            </div>
                            <div className="col-span-2">
                                <p className="form__label">Position*</p>
                                <input type="text" name="position" value={item.position} onChange={(e) => handleReusableInputChangeFunc('experiences', index, e)} className="form__input" />
                            </div>
                            <div className="col-span-2 flex justify-between">
                                <input type="text" name="location" value={item.location} onChange={(e) => handleReusableInputChangeFunc('experiences', index, e)} placeholder="Location or Company" className="form__input w-3/4" />
                                <button type="button" onClick={() => deleteItem('experiences', index)} className="bg-red-600 p-2 rounded-full text-white w-10 h-10 mt-2 hover:bg-red-700">X</button>
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={() => addItem('experiences', { startingDate: '', endingDate: '', position: '', location: '' })} className="bg-black py-2 px-5 rounded text-white h-fit cursor-pointer hover:bg-gray-800">Add Experience</button>
                </div>

                {/* TIME SLOTS */}
                <div className="mb-5">
                    <p className="form__label">Time Slots*</p>
                    {formData.timeSlots?.map((item, index) => (
                        <div key={index} className="flex justify-between items-center mb-4 border border-gray-200 p-4 rounded-md gap-4">
                            <select name="day" value={item.day} onChange={(e) => handleReusableInputChangeFunc('timeSlots', index, e)} className="form__input w-1/3">
                                <option value="">Select Day</option>
                                <option value="monday">Monday</option>
                                <option value="tuesday">Tuesday</option>
                                <option value="wednesday">Wednesday</option>
                                <option value="thursday">Thursday</option>
                                <option value="friday">Friday</option>
                                <option value="saturday">Saturday</option>
                                <option value="sunday">Sunday</option>
                            </select>
                            <input type="time" name="startingTime" value={item.startingTime} onChange={(e) => handleReusableInputChangeFunc('timeSlots', index, e)} className="form__input w-1/3" />
                            <input type="time" name="endingTime" value={item.endingTime} onChange={(e) => handleReusableInputChangeFunc('timeSlots', index, e)} className="form__input w-1/3" />
                            <button type="button" onClick={() => deleteItem('timeSlots', index)} className="bg-red-600 p-2 rounded-full text-white flex-shrink-0 w-10 h-10 hover:bg-red-700">X</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addItem('timeSlots', { day: '', startingTime: '', endingTime: '' })} className="bg-black py-2 px-5 rounded text-white h-fit cursor-pointer hover:bg-gray-800">Add Time Slot</button>
                </div>

                <div className="mb-5">
                    <p className="form__label">About*</p>
                    <textarea name="about" rows={5} value={formData.about} placeholder="Write about yourself" onChange={handleInputChange} className="form__input border border-gray-300 w-full p-4 rounded-md"></textarea>
                </div>

                <div className="mt-7">
                    <button type="submit" className="bg-blue-500 text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg hover:bg-blue-600 duration-300">Update Profile</button>
                </div>
            </form>
        </div>
    );
};

export default ProfileEditor;
