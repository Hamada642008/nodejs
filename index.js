// require express
const express = require('express');
const env = require('dotenv').config();
const article = require('./models/article')
// require mongodb
const mongo = require('mongoose');

// creat app or web server
const app = express();

// to conect to mongodb 

const connect = async()=>{
    try {
        await mongo.connect(process.env.mongourl); 
        console.log('connected to mongodb');
    } catch (error) {
        console.log(error);
    }
}
connect();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Welcome to my app!');
})

app.get('/nums',(req,res)=>{
    let nums = '';
    for (let index = 0; index < 10; index++) {
        nums += index + " - ";
    }
    res.send(`numbers: ${nums}`)
})

app.post('/add/:num1/:num2',(req,res)=>{
    // let num1 = req.body.num1;
    // let num2 = req.body.num2;
    // res.send(`total: ${num1+num2}`)

    let num1 = req.params.num1;
    let num2 = req.params.num2;
    res.send(`Total: ${parseInt(num1)+parseInt(num2)}`)
})

app.get('/hello',(req,res)=>{
    let name = req.query.name;
    res.send(`Hello ${name}`)
})

// to add data to mongodb
app.post('/employe',async(req,res)=>{
    const newarticle =  new article();
    newarticle.name = req.body.name;
    newarticle.age = req.body.age;
    newarticle.category = req.body.category;
    await newarticle.save()

    res.send("successfuly")
})

// to get data from mongodb
app.get('/employe',async(req,res)=>{
    const articles = await article.find();
    res.json(articles);
})

// to get data by id from mongodb
app.get('/employe/:id',async (req,res)=>{
    const idemployee= req.params.id;
    const specific_article = await article.findById(idemployee);
    res.json(specific_article)
})

// to delete data form mongodb
app.delete('/employe/:id',async (req,res)=>{
    try{
        const idemployee= req.params.id;
        const specific_article = await article.findByIdAndDelete(idemployee);
        res.send("deleted successfuly")
        res.json(specific_article)
        
    }catch(error){
        console.log(error);
    }
    
})

// to update data in mongodb
app.put('/employe/:id',async (req,res)=>{
    try{ 
        const idemployee= req.params.id;
        const specific_article = await article.findByIdAndUpdate(idemployee,req.body,{new:true});
        res.send("updated successfuly")
        res.json(specific_article)
    }catch(error){
        console.log(error);
    }   
})

// to show all data in mongodb
app.get("/showemployees",async(req,res)=>{
    const employees = await article.find()
    res.render("index.ejs",{employees:employees})
})





// to listen all requests or responses
const port = 4000;
app.listen(port, ()=>{
    console.log(`port: ${port}`);
})