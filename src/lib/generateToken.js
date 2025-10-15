import jwt from 'jsonwebtoken'

const generateToken = (user) => {
  return jwt.sign({
    userInfo:{
      _id: user.id,
      name: user.name
    }
  }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h'})
}

export default generateToken