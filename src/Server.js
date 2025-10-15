import mongoose from 'mongoose'
import app from './App.js'

const PORT = process.env.PORT || 9999
const MONGO_URI = process.env.MONGO_URI

const dbConnect = async () => {
    try {
        const mongo = await mongoose.connect(MONGO_URI)
        console.log('Mongo DB connected ' + mongo.connection.host)
        
    } catch (err) {
        console.log('Failed to connect to MongoDB' + err.message)
        process.exit(1)
    }
}

const startServer = async () => {
    try {
        await dbConnect()
        app.listen(PORT, () => { console.log('Servern körs på http://localhost:' + PORT)})
        
    } catch (err) {
        console.log('Failed to start server', err.message)
        process.exit(1)
    }
}

startServer()