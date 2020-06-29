const express= require('express')
const Order= require('../models/order')
const auth= require('../middleware/auth')
const router= new express.Router()

router.post('/api/orders', auth, async (req, res)=> {
    const order= new Order({
        ...req.body,
        owner: req.user._id
    })

    try{
        await order.save()
        res.send(order)
    }catch(e){
        res.status(400).send()
    }

})

router.get('/api/orders', auth, async (req, res)=>{
    
    try{
        
        await req.user.populate('orders').execPopulate()
        res.send(req.user.orders)
    }catch(e){
        res.status(500).send()
    }
    
})

router.get('/api/orders/:id', auth, async (req, res)=>{
    const _id= req.params.id

    try{
        const order= await Order.findOne({_id, owner: req.user._id})

        if(!order)
        {
            res. status(404).send()
        }
        res.send(order)
    }catch(e){
        res.status(500).send()
    }
    
})

router.patch('/api/orders/:id', auth, async(req, res)=>{

    const updates = Object.keys(req.body)
    const allowedUpdates = ['orderDate', 'status', 'product']
    const isValidOperation = updates.every((update) =>allowedUpdates.includes(update))
    
if (!isValidOperation) {
 return res.status(400).send({ error: 'Invalid updates!' })
}

    try{ 
        const order= await Order.findOne({_id: req.params.id, owner: req.user._id})

        
        if(!order){
            return res.status(404).send()
        }

        updates.forEach((update)=> order[update]= req.body[update])
        await order.save()

        res.send(order)
        
    }catch(e){
        res.status(500).send()
    }
})

router.delete('/api/orders/:id', auth, async(req, res)=>{
    try{
        const order= await Order.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        if(!order){
            return res.status(404).send()
      }
        res.send(order)

    }catch(e){
        res.status(500).send()
    }
})





 




module.exports= router