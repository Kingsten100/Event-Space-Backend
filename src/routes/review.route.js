import express from 'express'
import { verifyToken } from '../middleware/auth.middleware.js'
import { createReview } from '../controllers/review.controller.js'


const router = express.Router()

router.post('/add', verifyToken, createReview)

export default router