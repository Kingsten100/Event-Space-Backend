import express from 'express'
import { verifyToken } from '../middleware/auth.middleware.js'
import { createReview, getReviews } from '../controllers/review.controller.js'


const router = express.Router()

router.get('/:id', getReviews)

router.post('/add', verifyToken, createReview)

export default router