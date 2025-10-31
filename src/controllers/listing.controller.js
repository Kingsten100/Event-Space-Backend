import AsyncHandler from "express-async-handler";
import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";
import Booking from "../models/booking.model.js";

// ==== CREATE LISTING ==== //
export const createListing = AsyncHandler(async(req, res) => {
  const {title, description, address, location, amenities, price, images, capacity, category, rules} = req.body

  const userId = req.user._id

  if(!title || !description || !address || !location || !amenities || !price || !images || !capacity || !category || !rules){
    return res.status(400).json({ message: 'All fields are required'})
  }
  
  const listing = await Listing.create({
  user: userId,
  title,
  description,
  address,
  location,
  amenities,
  price,
  images,
  capacity,
  category,
  rules
})

const user = await User.findById(userId);
  if (!user.isHost) {
    user.isHost = true;
    await user.save();
  }


  res.status(201).json({
    message: 'Listing created successfully',
    listing
  })
})

// ==== GET LISTINGS ==== //
export const getListings = AsyncHandler(async(req, res) => {

  const listings = await Listing.find()

  res.status(200).json(listings)
 
})

// ==== GET LISTING BY ID ==== //
export const getListingById = AsyncHandler(async(req, res) => {

  const listingId = req.params.id

  if (!mongoose.Types.ObjectId.isValid(listingId)) {
  return res.status(400).json({ message: "Invalid listing Id" });
}

  const listing = await Listing.findById(listingId)

  res.status(200).json(listing)
})

// ==== GET MY LISTINGS ==== //
export const getMyListings = AsyncHandler(async(req, res) => {

  const userId = req.user._id

  const listings = await Listing.find({ user: userId})

  if(!listings || listings.length === 0){
    return res.status(404).json({ message: 'No listings found for this user'})
  }

  res.status(200).json(listings)
 
})

// ==== UPDATE MY LISTING === //
export const updateMyListing = AsyncHandler(async(req, res) => {
  const {id} = req.params
  const {title, description, address, location, amenities, price, images, capacity, category, rules} = req.body

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({ message: 'Invalid listing Id'})
  }

  const toUpdate = {}

  if(title) toUpdate.title = title
  if(description) toUpdate.description = description
  if(address) toUpdate.address = address
  if(location) toUpdate.location = location
  if(amenities) toUpdate.amenities = amenities
  if(price) toUpdate.price = price
  if(images) toUpdate.images = images
  if(capacity) toUpdate.capacity = capacity
  if(category) toUpdate.category = category
  if(rules) toUpdate.rules = rules
  
  if(Object.keys(toUpdate).length === 0){
    res.status(400).json({ message: 'No changes provided' })
  }

  const updatedListing = await Listing.findByIdAndUpdate(id, toUpdate, {new: true})

  if(!updatedListing){
    return res.status(404).json({ message: 'Can not find that listing'})
  }

  res.status(200).json(updatedListing)
})

// ==== DELETE LISTING ==== //
export const deleteListing = AsyncHandler(async(req, res) => {

  const { id } = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({ message: 'Invalid listing Id'})
  }

  const deletedListing = await Listing.findByIdAndDelete(id)

  if(!deleteListing){
    return res.status(404).json({ message: 'No listing found'})
  }

  res.status(204).json({ message: 'Listing is deleted'})
})

// ==== LISTING AVAILABILITY ==== //
export const listingAvailability = AsyncHandler(async(req, res) => {
  const { id } = req.params

  const booking = await Booking.find({
    listing: id,
    status: { $in: ["pending", "confirmed"] }
  }).select("startDate endDate status")

  res.status(200).json(booking)


})

// ==== SEARCH & FILTER ==== //

export const getFilteredListings = AsyncHandler(async(req, res) => {

  const {
    search,
    minPrice,
    maxPrice,
    capacity,
    category,
    amenities,
    city
  } = req.query

  const query = {}

  if(search){
    query.$text = { $search: search}
  }

  if(minPrice || maxPrice){
    query.price = {}
    if(minPrice) query.price.$gte = Number(minPrice)
    if(maxPrice) query.price.$lte = Number(maxPrice)
  }

  if(capacity){
    query.capacity = { $gte: Number(capacity)}
  }

  if(amenities) {
    const amenitiesArray = Array.isArray(amenities) ? amenities : [amenities]
    query.amenities = { $all: amenitiesArray}
  }

  if(city){
    query["location.city"] = { $regex: new RegExp(city, "i")}
  }

  const listings = await Listing.find(query).sort({ createdAt: -1})

  res.status(200).json(listings)
})

// ==== GET LISTINGS BY CATEGORY ==== //
export const getListingsByCategory = AsyncHandler(async (req, res) => {
  const { category } = req.query;
  console.log(category)

  let filter = {};

  if (category) {
    filter.category = { $regex: new RegExp(`^${category}$`, "i") };
  }

  console.log(filter)
  const listings = await Listing.find(filter).limit(8)
  res.status(200).json(listings)
})
