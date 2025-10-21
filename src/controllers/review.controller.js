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

  await Review.updateListingRating(listingId)


  res.status(201).json({ message: 'Review added successfully', review})
})


// ==== GET REVIEWS FOR A LISTING ==== //
export const getReviews = AsyncHandler(async(req, res) => {
  const listingId  = req.params.id

  const reviews = await Review.find({ listing: listingId})
    .populate("user", "name")
    .sort({ createdAt: -1})

  if(!reviews || reviews.length === 0){
    return res.status(404).json({ message: 'No reviews found' })
  }

  res.status(200).json(reviews)
})


// ==== DELETE REVIEW ==== //
export const deleteReview = AsyncHandler(async(req, res) => {
  const reviewId  = req.params.id

  const userId = req.user._id

  if(!reviewId){
    return res.status(404).json({ message: 'Review ID is required'})
  }

  const review = await Review.findById(reviewId)

  if(!review){
    return res.status(404).json({ message: 'No review found'})
  }

    if (review.user.toString() !== userId.toString()) {
    return res.status(403).json({ message: "You are not allowed to delete this review" });
  }

  const listingId = review._id

  await review.deleteOne()
  await Review.updateListingRating(listingId)

  res.status(200).json({ message: 'Review deleted', reviewId})

})
