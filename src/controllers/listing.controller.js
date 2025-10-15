import AsyncHandler from "express-async-handler";
import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";

// ==== CREATE LISTING ==== //
export const createListing = AsyncHandler(async(req, res) => {
  const {title, description, address, location, amenities, price, images, capacity, category, rules} = req.body

  const userId = req.user._id

  if(!title || !description || !address || !location || !amenities || !price || !images || !capacity || !category || !rules){
    console.log(isHost)
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

