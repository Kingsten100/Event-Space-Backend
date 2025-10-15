import express from 'express'
import { verifyToken } from '../middleware/auth.middleware.js'
import { createListing, getListings } from '../controllers/listing.controller.js'

const router = express.Router()

router.post('/create', verifyToken, createListing)
router.get('/listings', getListings)

export default router