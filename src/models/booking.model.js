import mongoose, { mongo } from "mongoose";


const bookingSchema = new mongoose.Schema({
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  startDate: { type: Date, required: true},
  endDate: { type: Date, required: true},
  totalPrice: { type: Number, required: true},
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "confirmed" }
}, { timestamps: true})

const Booking = new mongoose.model("Booking", bookingSchema)

export default Booking