// import {express} from 'express'
import express from "express";
import cors from "cors"
import {MongoClient} from "mongodb"


const app = express()
app.use(cors())
app.use(express.json())

const MONGO_URL = "mongodb+srv://ashwini:ashwini123@cluster0.2lrzq9i.mongodb.net"

async  function createConnection(){
    const client = new MongoClient(MONGO_URL);
   await client.connect();
    console.log("mongo is connected👍");
    return client;
  }

export const  client = await createConnection();



const mobiles = [
    {
      model: "OnePlus 9 5G",
      img: "https://m.media-amazon.com/images/I/61fy+u9uqPL._SX679_.jpg",
      company: "Oneplus"
    },
    {
      model: "Iphone 13 mini",
      img:
        "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-mini-blue-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1645572315986",
      company: "Apple"
    },
    {
      model: "Samsung s21 ultra",
      img: "https://m.media-amazon.com/images/I/81kfA-GtWwL._SY606_.jpg",
      company: "Samsung"
    },
    {
      model: "Xiomi mi 11",
      img: "https://m.media-amazon.com/images/I/51K4vNxMAhS._AC_SX522_.jpg",
      company: "Xiomi"
    }
  ];
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/mobiles', async function (req, res) {
   const result =await client.db("ashwini").collection('mobile').find({}).toArray()
    res.send(result)
  })

  app.post('/mobiles',async function (req, res) {
   const data = req.body;
   console.log(data)

   const result =await client.db("ashwini").collection('mobile').insertMany(data)
    res.send(result)
  })  
app.listen(4000,console.log("App started on port 4000"))