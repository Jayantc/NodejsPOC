const mongoose= require('mongoose')
const User= require('./user')


    const orderSchema= new mongoose.Schema({
    orderDate: {
    type: String,
    required: true,
    },
    status:{
        type: Boolean,
        default: false
    },
    product: 
    {
        type: String,
        required: true
    },
    quantity:
    {
        type: Number,
        default: 1
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})
/* 
userSchema.virtual('users', {
    ref: 'User',
    localField: 'product',
    foreignField: 'cart.product'
})
userSchema.virtual('users', {
    ref: 'User',
    localField: 'quantity',
    foreignField: 'cart.quantity'
}) */

const Order= mongoose.model('Order', orderSchema)

   module.exports= Order