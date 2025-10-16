import express from 'express'
import { createBooking, getMyBookings } from '../controllers/booking.controller.js'
import { verifyToken } from '../middleware/auth.middleware.js'


const router = express.Router()

router.post('/', verifyToken, createBooking)
router.get('/me/bookings', verifyToken, getMyBookings)

export default router