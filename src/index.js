const express= require('express')
require('./db/mongoose')
const userRouter= require('./routers/user')
const productRouter= require('./routers/product')
const orderRouter= require('./routers/order')


const app= express()
const port= process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(productRouter)
app.use(orderRouter)

app.listen(port, ()=> {
    console.log('server is on the port ' +port)
})

const product= require('./models/product')
const User= require('./models/user')
const Order= require('./models/order')

