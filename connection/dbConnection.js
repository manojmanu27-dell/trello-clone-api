
// const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require("mongoose");

const config = require("config");
const uri = `mongodb+srv://admin:${config.get('mongoDbProperties').password}@cluster0.exgiztd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
const connectionDb = async ()=>{
  try {
    await mongoose.connect(uri)
    console.log("Mongo db connected successfully")
  } catch (error) {
    console.error("Error Occured",error);
    process.exit(1)
  }
}

module.exports = connectionDb;
