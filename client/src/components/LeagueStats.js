import { useEffect, useState } from "react";
import styled from "styled-components"
import {useParams } from "react-router-dom";
import LeagueDetailsHeader from "./LeagueDetailsHeader";



const LeagueStats = () =>{
    var myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", "1d0fdd7faf720ded32cf9e1bf8a78d4c");
    myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    const id = useParams().id
    let rank=0
    let rank2=0
    const [scorer,setScorer]=useState([])
    const [assists,setAssists]=useState([])
    const [text,setText]=useState("")

useEffect(() => {
    
    fetch(`https://v3.football.api-sports.io/players/topscorers?season=2022&league=${id}`, requestOptions)
      .then(response => response.json())
      .then(result =>{ setScorer(result.response)})
      .catch(error => console.log('error', error));

      fetch(`https://v3.football.api-sports.io/players/topassists?season=2022&league=${id}`, requestOptions)
      .then(response => response.json())
      .then(result =>{ setAssists(result.response)})
      .catch(error => console.log('error', error));
     
}, [id]); 

if(scorer.length)
return(
    <StyledDiv>
    <LeagueDetailsHeader  id={id} />
    <p className="title"><p className="text">Goals</p></p>
    <div className="container">

{scorer.map((element,index)=>{
     rank=rank+1
        return(
        <div className="row" key={index}>
        <p className="player"> {rank}. <img src={`${element.statistics[0].team.logo}`} className="flag"></img> {element.player.name}</p>
        <p className="number">{element.statistics[0].goals.total}</p>
    </div>)
})}

</div>
<p className="title"><p className="text">Assists</p></p>
    <div className="container">

{assists.map((element,index)=>{
     rank2=rank2+1
        return(
        <div className="row" key={index}>
        <p className="player"> {rank2}. <img src={`${element.statistics[0].team.logo}`} className="flag"></img> {element.player.name}</p>
        <p className="number">{element.statistics[0].goals.assists}</p>
    </div>)
})}

</div>
    
    
    </StyledDiv>
)
else 
 setTimeout(() => {
    setText("Stats are not available.")
 }, 1000);


return( 
    <StyledDiv2> 
         <LeagueDetailsHeader  id={id} />
        <h1 className="h1">{text}</h1>
    </StyledDiv2>)
}



export default LeagueStats

const StyledDiv = styled.div`

position: relative;
width: 1292px;
left: 15.5%;
background: #e6e6e6;

.container{
    border: 3px solid #737373;
    border-radius: 5px;
    width: 700px;
    margin-top: -26px;
    margin-left: 280px;
}
.title{
margin-left: 280px; 
display: flex;
background: #ffd633;
color: #333333;
font-weight: bold;
font-family: Arial, Helvetica, sans-serif;
font-size: 24px;
align-items: center;
width: 700px;
height: 70px;
border-radius: 5px;
border: 3px solid #737373;
}

.player{
    font-size: 20px; 
    font-weight: bold;
    color: #666666;
    margin: 10px;
    align-items: center;
    width:300px;
}

.number{
    font-size: 22px; 
    font-weight: bold;
    color: #666666; 
    text-align: center; 
   
}

.row{
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid white;
}
.flag{
    width: 25px;
    height: 25px;
    
    }

.text{
    margin-left: 20px;
}

`

const StyledDiv2 = styled.div`

position: relative;
left: 15.5%;
width: 1292px;
background: #e6e6e6;
font-family: Arial, Helvetica, sans-serif;
height: 737px;

.h1{
    color: #808080; 
    margin-left: 450px;
    margin-top: 200px;
}

`