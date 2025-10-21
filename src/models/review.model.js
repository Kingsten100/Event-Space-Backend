import mongoose from 'mongoose'
import Listing from './listing.model.js';

const reviewSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true},
  rating: { type: Number, min: 1, max: 5, required: true},
  comment: { type: String, trim: true, required: true}
}, { timestamps: true})

// ==== MODELLMETOD FÖR ATT RÄKNA UT SNITT BETYGET FÖR VARJE LISTING ==== // 
reviewSchema.statics.updateListingRating = async function (listingId) {
  const reviews = await this.find({ listing: listingId });

  if (reviews.length === 0) {
    await Listing.findByIdAndUpdate(listingId, { averageRating: 0, reviewsCount: 0 });
    return;
  }

  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  const avg = total / reviews.length;

  await Listing.findByIdAndUpdate(listingId, {
    averageRating: avg,
    reviewsCount: reviews.length,
  });
};

const Review = new mongoose.model('Review', reviewSchema)

export default Review