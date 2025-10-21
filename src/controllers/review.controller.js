import AsyncHandler from 'express-async-handler'
import Listing from '../models/listing.model.js'
import Review from '../models/review.model.js'

// ==== CREATE REVIEW ==== //
export const createReview = AsyncHandler(async(req, res) => {
  const { listingId, rating, comment } = req.body
  const userId = req.user._id

  if(!rating || !comment){
    return res.status(400).json({ message: 'All fields are required'})
  }

  const listing = await Listing.findById(listingId)

  if(!listing){
    return res.status(404).json({ message: 'No listing found'})
  }

  const existingReview = await Review.findOne({ user: userId, listing: listingId });
  if (existingReview) {
    return res.status(400).json({ message: "You have already reviewed this listing" });
  }

  const review = await Review.create({
    user: userId,
    listing: listingId,
    rating,
    comment
  })


  res.status(201).json({ message: 'Review added successfully', review})
})
