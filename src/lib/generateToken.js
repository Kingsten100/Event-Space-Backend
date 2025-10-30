import jwt from 'jsonwebtoken'

const generateToken = (user) => {
  return jwt.sign({
    userInfo:{
      _id: user.id,
      name: user.name,
      email: user.email,
      isHost: user.isHost
    }
  }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h'})
}

export default generateToken