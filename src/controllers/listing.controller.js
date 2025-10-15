import AsyncHandler from "express-async-handler";
import Listing from "../models/listing.model.js";


export const createListing = AsyncHandler(async(req, res) => {
  const { user, title, description, address, location, amenities, price, images, capacity, category, rules} = req.body

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

  res.status(201).json({
    message: 'Listing created successfully',
    listing
  })
})