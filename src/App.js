import express from 'express'
import userRoutes from './routes/user.route.js'
import listingRoutes from './routes/listing.route.js'
import bookingRoutes from './routes/booking.route.js'
import reviewRoutes from './routes/review.route.js'

const app = express()

app.use(express.json())

app.use('/api/auth', userRoutes)

app.use('/api/listing', listingRoutes)

app.use('/api/bookings', bookingRoutes)

app.use('/api/review', reviewRoutes)

export default app