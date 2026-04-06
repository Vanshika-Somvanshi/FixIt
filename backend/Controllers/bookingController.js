import Booking from '../models/BookingSchema.js'
import User from '../models/UserSchema.js'
import Service from '../models/ServiceSchema.js'

export const createBooking = async (req, res) => {
    try {
        const newBooking = new Booking({
            service: req.body.service,
            user: req.userId,
            ticketPrice: req.body.ticketPrice || 500,
            appointmentDate: req.body.appointmentDate || new Date(),
            status: 'pending'
        })

        const savedBooking = await newBooking.save()

        await User.findByIdAndUpdate(req.userId, {
            $push: { appointments: savedBooking._id }
        })

        await Service.findByIdAndUpdate(req.body.service, {
            $push: { appointments: savedBooking._id }
        })

        res.status(200).json({ success: true, message: 'Service booked successfully!', data: savedBooking })

    } catch (err) {
        res.status(500).json({ success: false, message: 'Booking failed. Try again.', error: err.message })
    }
}

export const getMyBookings = async (req, res) => {
    try {
        let bookings = [];
        if (req.role === 'customer') {
            bookings = await Booking.find({ user: req.userId }).populate('service', 'name photo specialization ticketPrice');
        } else if (req.role === 'service') {
            bookings = await Booking.find({ service: req.userId }).populate('user', 'name photo email');
        }
        res.status(200).json({ success: true, message: 'Bookings fetched', data: bookings })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Could not fetch bookings', error: err.message })
    }
}

export const updateBookingStatus = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(id, { $set: { status: req.body.status } }, { new: true });
        res.status(200).json({ success: true, message: 'Booking status updated', data: updatedBooking });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update status', error: err.message });
    }
}
