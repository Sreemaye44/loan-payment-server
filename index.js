const express= require('express');
const cors= require('cors');

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app =express();
const port=process.env.PORT||5000;

//middle wares
app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ewurel7.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const personalCollection=client.db('loan-payment').collection('personal');
        const businessCollection=client.db('loan-payment').collection('business');
        const applicationCollection = client.db('loan-payment').collection('application');
        
        app.post('/personaldetails', async(req,res)=>{
            const personal=req.body;
            const personalDetails=await personalCollection.insertOne(personal);
            res.send(personalDetails);
        
        });
        app.post('/businessdetails', async(req,res)=>{
            const business=req.body;
            const businessDetails=await businessCollection.insertOne(business);
            res.send(businessDetails);
        
        });
        app.post('/applicationdetails', async(req,res)=>{
            const application=req.body;
            const applicationDetails=await applicationCollection.insertOne(application);
            res.send(applicationDetails);
        
        });
    }

    finally {
        
    }
}
run().catch(err=>console.error(err))
app.get('/',(req,res)=>{
    res.send('server is running')
})

app.listen(port, ()=>{
    console.log(`server running on,${port}`)
})