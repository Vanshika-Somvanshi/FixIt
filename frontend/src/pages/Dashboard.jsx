import React, { useContext, useState } from 'react'
import { authContext } from '../context/AuthContext'
import useFetchData from '../hooks/useFetchData'
import { BASE_URL } from '../config'
import userImg from "../assets/images/avatar-icon.png";
import ProfileEditor from './Dashboard/ProfileEditor';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const { user, role, token } = useContext(authContext)
    const { data: bookings, loading, error } = useFetchData(`${BASE_URL}/api/v1/bookings/my-bookings`)
    const [tab, setTab] = useState('bookings')

    const updateBookingStatus = async (id, status) => {
        try {
            const res = await fetch(`${BASE_URL}/api/v1/bookings/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            })
            const result = await res.json()
            if (!res.ok) throw new Error(result.message)
            toast.success(result.message)
            setTimeout(() => window.location.reload(), 1500)
        } catch (err) {
            toast.error(err.message)
        }
    }

    return (
        <section className="bg-[#f5f5f5] min-h-screen py-10">
            <div className="max-w-[1170px] px-5 mx-auto">
                <div className="grid md:grid-cols-3 gap-10">
                    <div className="md:col-span-1 bg-white p-[30px] rounded-md shadow-panelShadow text-center h-fit">
                        <img src={user?.photo || userImg} alt="" className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-blue-500 object-cover" />
                        <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">{user?.name}</h3>
                        <p className="text-textColor text-[15px] leading-6 font-medium capitalize">{role} Account</p>
                        <p className="text-textColor text-[15px] leading-6 font-medium mt-1 mb-6">{user?.email}</p>

                        <div className="mt-[50px] md:mt-[100px]">
                            <button
                                onClick={() => setTab('bookings')}
                                className={`${tab === 'bookings' ? 'bg-blue-100 text-blue-600' : 'bg-transparent text-headingColor'} w-full btn mt-0 rounded-md`}
                            >
                                Bookings
                            </button>

                            {role === 'service' && (
                                <button
                                    onClick={() => setTab('settings')}
                                    className={`${tab === 'settings' ? 'bg-blue-100 text-blue-600' : 'bg-transparent text-headingColor'} w-full btn mt-4 rounded-md`}
                                >
                                    Profile Settings
                                </button>
                            )}
                        </div>
                    </div>
                    
                    <div className="md:col-span-2 bg-white p-[30px] rounded-md shadow-panelShadow">
                        {tab === 'bookings' && (
                            <>
                                <h3 className="text-[20px] leading-[30px] text-headingColor font-bold mb-5 flex items-center gap-2">
                                   My Bookings
                                </h3>

                                {loading && <p className="text-gray-500 text-center font-bold mt-5">Loading Bookings...</p>}
                                {error && <p className="text-red-500 text-center font-bold mt-5">{error}</p>}

                                {!loading && !error && bookings?.length === 0 && (
                                    <div className="text-center mt-10">
                                        <p className="text-textColor font-bold text-lg">You have no bookings yet!</p>
                                    </div>
                                )}

                                {!loading && !error && bookings?.length > 0 && (
                                    <table className="w-full text-left text-sm text-gray-500 break-words">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">{role === 'customer' ? 'Service Provider' : 'Customer'}</th>
                                                <th scope="col" className="px-6 py-3">Name</th>
                                                <th scope="col" className="px-6 py-3">Date</th>
                                                <th scope="col" className="px-6 py-3">Price</th>
                                                <th scope="col" className="px-6 py-3">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookings?.map(booking => {
                                                const profile = role === 'customer' ? booking.service : booking.user;
                                                return (
                                                <tr key={booking._id} className="bg-white border-b">
                                                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900">
                                                        <img src={profile?.photo || userImg} className="w-10 h-10 rounded-full object-cover hidden sm:block" alt="" />
                                                        <div className="pl-3 w-full">
                                                            <div className="text-base font-semibold">{role === 'customer' ? profile?.specialization : profile?.email}</div>
                                                        </div>
                                                    </th>
                                                    <td className="px-6 py-4">{profile?.name}</td>
                                                    <td className="px-6 py-4">{new Date(booking.appointmentDate).toLocaleDateString()}</td>
                                                    <td className="px-6 py-4">Rs. {booking.ticketPrice}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                                            {booking.status}
                                                        </span>
                                                        {role === 'service' && booking.status === 'pending' && (
                                                            <div className="flex gap-2 mt-2">
                                                                <button onClick={() => updateBookingStatus(booking._id, 'approved')} className="bg-green-500 hover:bg-green-600 text-white text-[12px] px-2 py-1 rounded">Approve</button>
                                                                <button onClick={() => updateBookingStatus(booking._id, 'cancelled')} className="bg-red-500 hover:bg-red-600 text-white text-[12px] px-2 py-1 rounded">Reject</button>
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            )})}
                                        </tbody>
                                    </table>
                                )}
                            </>
                        )}
                        {tab === 'settings' && role === 'service' && <ProfileEditor user={user} token={token} />}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Dashboard
