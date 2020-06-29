const express= require('express')
const Product= require('../models/product')

const router= new express.Router()

router.post('/api/products', async (req, res)=> {
    const product= new Product(req.body)
    
    try{
        await product.save()
        res.send(product)
    }catch(e){
        res.status(400).send(e)
    }

})

router.get('/api/products', async (req, res)=>{
    
    try{
        const products= await Product.find()

        res.send(products)
    }catch(e){
        res.status(500).send()
    }
})

router.get('/api/products/:id', async (req, res)=>{
    const _id= req.params.id

    try{
        const product= await Product.findById(_id)
        

        if(!product)
        {
            res.status(404).send()
        }
        res.send(product)
    }catch(e){
        res.status(500).send()
    }
    
})

router.patch('/api/products/:id', async(req, res)=>{

    const updates = Object.keys(req.body)
    const allowedUpdates = ['price', 'instock', 'stock']
    const isValidOperation = updates.every((update) =>allowedUpdates.includes(update))
    
if (!isValidOperation) {
 return res.status(400).send({ error: 'Invalid updates!' })
}

    try{ 
        const product= await Product.findById(req.params.id)

        updates.forEach((update)=> product[update]= req.body[update])
        await product.save()

        if(!product){
            return res.status(404).send()
        }

        res.send(product)
        
    }catch(e){
        res.status(500).send(e)
    }
})

router.delete('/api/products/:id', async(req, res)=>{
    try{
        const product= await Product.findByIdAndDelete(req.params.id)
        if(!product){
            return res.status(404).send()
        }
        res.send(product)

    }catch(e){
        res.status(500).send(e)
    }
})

module.exports= router