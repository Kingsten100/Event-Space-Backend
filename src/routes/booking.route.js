import express from 'express'
import { createBooking, deleteBooking, getMyBookings, simulatePayment } from '../controllers/booking.controller.js'
import { verifyToken } from '../middleware/auth.middleware.js'


const router = express.Router()

router.post('/', verifyToken, createBooking)
router.get('/me/bookings', verifyToken, getMyBookings)

router.post('/payment', verifyToken, simulatePayment)

router.delete('/me/:id', verifyToken, deleteBooking)

export default router