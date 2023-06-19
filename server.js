const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Product = require("./models/productModels")
const Review = require('./models/reviewProduct')
const port = 3000



// AGAR DATA MUNCUL DALAM FORMAT JSON 
app.use(express.json())
// ketika ingin mengubah data tapi tidak dalam bentuk format
app.use(express.urlencoded({extended:false}))

// untuk membuka cors yang di blok
const cors = require('cors')
app.use(cors())


// Colection pertama : Produk

  app.get('/products', async(req, res) => {
    try {
        const { search } = req.query
        let products = {};
        if (search != undefined){
          products = await Product.find({ name: { $regex: '.*' + search + '.*' } }).exec();
        } else {
          products = await Product.find({}) // find = untuk mencari  
        }
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
  })

// UNTUK MENCARI BERDASAR KAN ID
  app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
  })

// UNTUK MENAMBAHKAN ISI DARI DATABASE MONGODB
  app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
  })

// COLECTION 2

app.get('/review', async(req, res) => {
  try {
      const reviews = await Review.find({})
      res.status(200).json(reviews)
  } catch (error) {
      res.status(500).json({message:error.message})
  }
})

// UNTUK MENCARI BERDASAR KAN ID
app.get('/review/:id', async(req, res) => {
  try {
      const {id} = req.params
      const review = await Review.findById(id)
      res.status(200).json(review)
  } catch (error) {
      console.log(error.message);
      res.status(500).json({message:error.message})
  }
})

// untuk mengambil data review berdasarkan id api product masing masing
app.get('/productReview/:id', async(req, res) => {
  try {
      const {id} = req.params
      const review = await Review.find({
        productId: id
      })
      res.status(200).json(review)
  } catch (error) {
      console.log(error.message);
      res.status(500).json({message:error.message})
  }
})


// membuat isi review di postman dengan menggunakan productId.  productId isi ny ambil id product  
app.post('/review', async(req, res) => {
  try {
      const review = await Review.create(req.body)
      res.status(200).json(review)
  } catch (error) {
      console.log(error.message);
      res.status(500).json({message:error.message})
  }
})

// end COLECTION 2


mongoose.set("strictQuery",false)
mongoose.connect("mongodb+srv://admin:fujianto123@cluster0.hv9agwa.mongodb.net/PW1API?retryWrites=true&w=majority")
.then(() => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
    console.log(`connected to mongoDB`);
}).catch(error => {
    console.log(error);
})