import express from 'express'
import { verifyToken } from '../middleware/auth.middleware.js'
import { createListing, deleteListing, getFilteredListings, getListingById, getListings, getListingsByCategory, getMyListings, listingAvailability, updateMyListing } from '../controllers/listing.controller.js'

const router = express.Router()

router.post('/create', verifyToken, createListing)

router.get('/alllistings', getListings)
router.get('/mylistings', verifyToken, getMyListings)
router.get('/alllistings/:id/availability', listingAvailability)
router.get('/search', getFilteredListings)
router.get('/category', getListingsByCategory)

router.patch('/:id/edit', verifyToken, updateMyListing)
router.put('/:id/edit', verifyToken, updateMyListing)

router.delete('/:id', verifyToken, deleteListing)

router.get('/:id', getListingById)

export default router