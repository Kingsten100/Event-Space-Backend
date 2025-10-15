import mongoose from "mongoose";
import { amenities } from "../constants/amenities.js";
import { venueType } from "../constants/venueType.js";

const listingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  title: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true},
  location: { city: String, region: String},
  amenities: [{type: String, enum: [...Object.values(amenities)] }],
  price: { type: Number, required: true},
  images: [String],
  capacity: { type: Number, required: true},
  category: { type: String, enum: [...Object.values(venueType)], default: venueType.OTHER},
  rules: { alcoholAllowed: {type: Boolean, default: false}, petsAllowed: {type: Boolean, default: false} }

}, {timestamps: true})

const Listing = mongoose.model( 'Listing', listingSchema)
export default Listing