import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.authorization

    if(!authHeader?.startsWith('Bearer ')){
      return res.status(401).json({ message: 'Not authenticated. No token provided'})
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    req.user = decoded.userInfo

    next()

  } catch (err) {
    return res.status(401).json({ message: 'Not authenticated'})
  }
}