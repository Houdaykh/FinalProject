const { MongoClient } = require("mongodb");
require("dotenv").config();
var request = require('request-promise');

// const {x_rapidapi_key}= process.env

//Database connexion
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getLeagues = async (req,res) =>{
    
    var options = {
      'method': 'GET',
      'url': 'https://v3.football.api-sports.io/leagues',
      'headers': {
        'x-rapidapi-key': '1d0fdd7faf720ded32cf9e1bf8a78d4c',
        'x-rapidapi-host': 'v3.football.api-sports.io'
      }
    };
    try{
      let x = await request(options) 
      res.status(200).send(x)
    }catch(err){
      res.status(400).json({status:400 , message: err})
    }   
}

const addMatchFavoris = async (req,res) =>{
  const IdUser=req.body.IdUser
  const IdMatch=req.body.IdMatch
  const client = new MongoClient(MONGO_URI, options);
       
  const data = { 
   "IdUser":`${IdUser}`,
  "IdMatch":`${IdMatch}`,
  }

  try {
    await client.connect();
    const db = client.db("FootLab");
    const FindResult =await db.collection("MatchFavoris").findOne({ IdMatch :`${IdMatch}`, IdUser :`${IdUser}`})
    if(FindResult)
    {
      await db.collection("MatchFavoris").deleteOne({ IdMatch :`${IdMatch}`})
      res.status(201).json({ status: 201, message:"Data is deleted" });
    }
    else
    {
      await db.collection("MatchFavoris").insertOne(data);
     res.status(200).json({ status: 201, data: data });
    }
  } 
  catch (err) {
    res.status(500).json({ status: 500, data: data, message: err.message });
    console.log(err.stack);
  }
  finally{
    client.close()
  }
}

const getMatchsFavoris = async (req,res) =>{

const client = new MongoClient(MONGO_URI, options);

const IdUser= req.params.IdUser

let ids=""

try {
  await client.connect();
  const db = client.db("FootLab");
  const FindResult =await db.collection("MatchFavoris").find({IdUser :`${IdUser}`}).toArray();
  const arr=FindResult.map((element)=>{
    return element.IdMatch
  })
  ids=arr.join("-")
  try{
    var options = {
      'method': 'GET',
      'url': `https://v3.football.api-sports.io/fixtures?ids=${ids}`,
      'headers': {
        'x-rapidapi-key': '1d0fdd7faf720ded32cf9e1bf8a78d4c',
        'x-rapidapi-host': 'v3.football.api-sports.io'
      }
    };
    let x = await request(options) 
    res.status(200).send(x)
  }catch(err){
    res.status(400).json({status:400 , message: err})
  }  
  
 
} 
catch (err) {
  res.status(500).json({ status: 500,  message: err.message });
  console.log(err.stack);
}
finally{
  client.close()
}

}

const getMatchDetails = async (req,res) =>{
  const IdMatch=req.params.IdMatch
  
  var options = {
    'method': 'GET',
    'url': `https://v3.football.api-sports.io/fixtures?id=${IdMatch}`,
    'headers': {
      'x-rapidapi-key': '1d0fdd7faf720ded32cf9e1bf8a78d4c',
      'x-rapidapi-host': 'v3.football.api-sports.io'
    }
  };
  try{
    let x = await request(options) 
    res.status(200).send(x)
  }catch(err){
    res.status(400).json({status:400 , message: err})
  }   
}

const getTeam = async (req,res) =>{
    const teamName=req.params.teamName
    
  var options = {
    'method': 'GET',
    'url': `https://v3.football.api-sports.io/teams?name=${teamName}`,
    'headers': {
      'x-rapidapi-key': '1d0fdd7faf720ded32cf9e1bf8a78d4c',
      'x-rapidapi-host': 'v3.football.api-sports.io'
    }
  };
  try{
    let x = await request(options) 
    res.status(200).send(x)
  }catch(err){
    res.status(400).json({status:400 , message: err})
  }   
}

module.exports = {getLeagues,addMatchFavoris,getMatchsFavoris,getMatchDetails,getTeam}