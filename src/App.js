import express from 'express'
import userRoutes from './routes/user.route.js'
import listingRoutes from './routes/listing.route.js'
import bookingRoutes from './routes/booking.route.js'
import reviewRoutes from './routes/review.route.js'
import cors from 'cors'


const app = express()

app.use(cors({
  origin: ["http://localhost:5173"], // eller flera origins om du vill
  credentials: true, // om du använder cookies eller auth headers
}));
app.use(express.json())

app.use('/api/auth', userRoutes)

app.use('/api/listing', listingRoutes)

app.use('/api/bookings', bookingRoutes)

app.use('/api/review', reviewRoutes)

export default app