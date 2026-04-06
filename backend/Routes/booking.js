import express from 'express'
import { createBooking, getMyBookings, updateBookingStatus } from '../Controllers/bookingController.js'
import { authenticate, restrict } from '../auth/verifyToken.js' // We need to check if this auth middleware exists, I'll update it later if needed

const router = express.Router()

router.post('/', authenticate, createBooking)
router.get('/my-bookings', authenticate, getMyBookings)
router.put('/:id', authenticate, restrict(['service']), updateBookingStatus)

export default router
