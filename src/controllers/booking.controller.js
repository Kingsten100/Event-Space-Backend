import AsyncHandler from 'express-async-handler'
import Listing from '../models/listing.model.js'
import Booking from '../models/booking.model.js'

// ==== CREATE BOOKING ==== //
export const createBooking = AsyncHandler(async(req, res) => {

  const { listingId, startDate, endDate, totalPrice } = req.body

  const userId = req.user._id

  if(!listingId || !startDate || !endDate || !totalPrice){
    return res.status(400).json({ message: 'All fields are required'})
  }

  const listing = await Listing.findById(listingId)

  if(!listing){
    return res.status(404).json({ message: 'No listing found'})
  }

  const doubleBooking = await Booking.findOne({
    listing: listingId,
    $or: [
      {startDate: { $lte: new Date(endDate) }, endDate: { $gte: new Date(startDate)}}
    ]
  })

  if(doubleBooking){
    return res.status(400).json({ message: 'Listing not available for these dates'})
  }

  const booking = await Booking.create({
    listing: listingId,
    user: userId,
    startDate,
    endDate,
    totalPrice
  })

  res.status(201).json({ message: 'Booking created successfully', booking})
})

// ==== GET MY BOOKINGS ==== //
export const getMyBookings = AsyncHandler(async(req, res) => {

  const userId = req.user._id

  const myBookings = await Booking.find({ user: userId })

  if(!myBookings || myBookings.length === 0){
    return res.status(404).json({ message: 'No bookings found'})
  }

  res.status(200).json(myBookings)
})

// ==== DELETE BOOKING ==== //
export const deleteBooking = AsyncHandler(async(req, res) => {
  const { id } = req.params

  const userId = req.user._id

  const booking = await Booking.findById(id)

  if(!booking){
    return res.status(404).json({ message: 'No booking found'})
  }

  if(booking.user.toString() !== userId.toString()){
    return res.status(400).json({ message: 'You are not authorized or no booking was found'})
  }

  await Booking.deleteOne(booking)

  res.status(209).json({ message: 'Booking deleted'})

})

// ==== SIMULATE PAYMENT ==== //
export const simulatePayment = AsyncHandler(async(req, res) => {
  
  const { bookingId, paymentMethod } = req.body
  const userId = req.user._id

  const booking = await Booking.findOne({ _id: bookingId, user: userId})

  if(!booking){
    return res.status(404).json({ message: 'No booking found'})
  }

  booking.status = "confirmed"
  booking.paymentStatus = "paid"
  booking.paymentMethod = paymentMethod || "simulated"

  await booking.save()

  res.status(200).json({ message: 'Payment successful (simulated)'})
})