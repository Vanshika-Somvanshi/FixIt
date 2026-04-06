import React, { useState } from 'react'
import { BASE_URL } from '../../config'
import { toast } from 'react-toastify'

const SidePanel = ({ ticketPrice, timeSlots = [], providerId }) => {
  const [loading, setLoading] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)

  const bookingHandler = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/api/v1/bookings`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          service: providerId,
          ticketPrice: ticketPrice || 500,
          appointmentDate: new Date() // Sending current date since this is a simple Service Booking
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message + ' Please try again')
      }

      toast.success(data.message)
      setLoading(false)
      setShowCheckout(false)
    } catch (error) {
      toast.error(error.message)
      setLoading(false)
    }
  }

  const handleCheckoutTrigger = () => {
    if(!localStorage.getItem('token')){
      toast.error("Please login to book a service")
      return
    }
    setShowCheckout(true)
  }

  return (
    <>
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Base Price</p>
        <span className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold'>
          Rs. {ticketPrice || 500}
        </span>
      </div>

      <div className="mt-[30px]">
        <p className='text__para mt-0 font-semibold text-headingColor'>
          Available Time Slots:
        </p>

        <ul className='mt-3'>
          {timeSlots.map((item, index) => (
            <li key={index} className='flex items-center justify-between mb-2'>
              <p className='text-[15px] leading-6 text-textColor font-semibold capitalize'>
                {item.day}
              </p>
              <p className='text-[15px] leading-6 text-textColor font-semibold'>
                {item.startingTime} - {item.endingTime}
              </p>
            </li>
          ))}
          {timeSlots.length === 0 && (
            <p className="text-sm text-center text-gray-500">No time slots specified.</p>
          )}
        </ul>
      </div>

      <button className='btn px-2 w-full rounded-md mt-6' onClick={handleCheckoutTrigger} disabled={loading}>
        Book Service
      </button>

    </div>

    {showCheckout && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-60 overflow-hidden">
        <div className="bg-white p-8 rounded-xl shadow-panelShadow w-[90%] max-w-md relative animate-fade-in">
          <h2 className="text-2xl font-bold mb-6 text-center">Secure Checkout</h2>
          
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-1">Card Number</p>
            <input type="text" placeholder="1111 1111 1111 1111" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Expiry</p>
              <input type="text" placeholder="MM/YY" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">CVC</p>
              <input type="text" placeholder="123" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>Rs. {ticketPrice || 500}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
             <button className='btn px-2 w-full rounded-md mt-0 bg-green-500 hover:bg-green-600 border-none' onClick={bookingHandler} disabled={loading}>
              {loading ? "Processing..." : "Confirm & Pay"}
            </button>
            <button className='w-full py-3 rounded-md text-gray-500 hover:bg-gray-100 font-semibold' onClick={()=>setShowCheckout(false)} disabled={loading}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  )
}

export default SidePanel