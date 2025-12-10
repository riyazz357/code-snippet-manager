const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const snippet= require('./models/Snippet');
const { createSnippetSchema } = require('./schema');
const Snippet = require('./models/Snippet');

const app=express();
const PORT=5000;

app.use(cors())
app.use(express.json()); // to parse the json bodies

const MongoDB_URI='<your database_connection_string_here>';
mongoose.connect(MongoDB_URI)
.then(()=> console.log("Mongodb connected"))
.catch(err=> console.error("mongo connection error",err))

// routes

app.get('/api/snippets',async(req,res)=>{
    try{
        const snippets=(await Snippet.find()).toSorted({createdAt:-1});
        res.json(snippets);
    }
    catch(error){
        res.status(500)
        .json({error:"server error"})
    };''
});

//creating snippet with zod validation
app.post('/api/snippets',async(req,res)=>{
    try{
        const validateData=createSnippetSchema.parse(req.body);
         //if valid save to db
        const newSnippet=new Snippet(validateData);
        await newSnippet.save();
        res.status(201)
        .json(newSnippet);

       

    }
    catch(error){
        if(error.name==='ZodError'){
            return res.status(400)
            .json({error: error.errors})
        }
        res.status(500).json({error:"server error"});
    }
});
app.listen(PORT,()=>{
    console.log(`server is up and running on http://localhost:${PORT}`);
});