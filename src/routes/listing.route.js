import express from 'express'
import { verifyToken } from '../middleware/auth.middleware.js'
import { createListing, getListingById, getListings, getMyListings, updateMyListing } from '../controllers/listing.controller.js'

const router = express.Router()

router.post('/create', verifyToken, createListing)

router.get('/alllistings', getListings)
router.get('/mylistings', verifyToken, getMyListings)

router.patch('/:id/edit', verifyToken, updateMyListing)
router.put('/:id/edit', verifyToken, updateMyListing)


router.get('/:id', getListingById)

export default router