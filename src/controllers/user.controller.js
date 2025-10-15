import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import generateToken from '../lib/generateToken.js'


// ==== CREATE USER ==== //
export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if(!name || !email || !password){
    return res.status(400).json({ message: 'All fields are required'})
  }

  const normalizedEmail = email.trim().toLowerCase()

  if(await User.exists({email: normalizedEmail})){
    return res.status(409).json({ message: 'This user already exists'})
  }

  const salt = await bcrypt.genSalt(10)

  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    name,
    email: normalizedEmail,
    password: hashedPassword
  })
  
  const token = generateToken(user)

  res.status(201).json({ _id: user._id, name: user.name, token})
})

// ===== LOGIN USER ===== //

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if(!email || !password){
    return res.status(400).json({ message: 'All fields are required'})
  }

  const user = await User.findOne({email}).exec()

  if(!user){
    return res.status(401).json({ message: 'invalid credentials'})
  }

  const match = await bcrypt.compare(password, user.password)

  if(!match){
    return res.status(401).json({ message: 'Invalid credentials'})
  }

  const token = generateToken(user)

  res.status(200).json({ _id: user._id, name: user.name, token})
})


// ==== GET USER ==== //

export const getUser = asyncHandler(async (req, res) => {
  
  if(!req.user){
    return res.status(404).json({ message: 'No user found'})
  }

  res.status(200).json(req.user)
  
})

// ==== UPDATE USER ==== //

export const updateUser = asyncHandler(async(req, res) => {
  if(!req.user){
    return res.status(404).json({ message: 'No user found'})
  }

  
})