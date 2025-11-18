import { getFilters } from "../controllers/filters.controller.js"
import express from 'express'

const router = express.Router()

router.get('/', getFilters)

export default router