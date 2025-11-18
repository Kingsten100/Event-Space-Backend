import AsyncHandler from "express-async-handler";
import { venueType } from "../constants/venueType.js";
import { amenities } from "../constants/amenities.js";

export const getFilters = AsyncHandler(async(req, res) => {
 
  res.status(200).json({categories: Object.values(venueType), amenities: Object.values(amenities)})
})