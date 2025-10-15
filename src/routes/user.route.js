import express from 'express'
import { createUser, getUser, login } from '../controllers/user.controller.js'
import { verifyToken } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/register', createUser)

router.post('/login', login)

router.get('/me', verifyToken, getUser)

export default router