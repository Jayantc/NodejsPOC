const mongoose= require('mongoose')

    const productSchema= new mongoose.Schema({
    name: {
    type: String,
    unique: true,
    required: true,
    trim: true
    },
    price: {
        type: Number,
        required: true,
        },
    instock:{
        type: Boolean,
        default: false
    },
    stock:{
        type: Number,
        default: 0
    }
    
   })

  

    const Product= mongoose.model('Product', productSchema)

   module.exports= Product