import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import MatchDetails from "./MatchDetails"



const Lineups = () =>{

    const IdMatch= useParams().IdMatch
    const [details,setDetails]=useState([])
    const [lineups,setLineups]=useState([])
    const [text,setText]=useState("")

    useEffect(()=>{

        fetch(`/match/details/${IdMatch}`)
        .then(response => response.json())
        .then(result => {setDetails(result.response)
        setLineups(result.response[0].lineups)
        })
        .catch(error => console.log('error', error));
       
        },[])

if(lineups.length){
return(
 
    <StyledDiv>
   <MatchDetails data={details} />
   
   <div className="container">
   <div>
    <div className="title"> <img src={`${lineups[0].team.logo}`} className="flaggg"></img>{lineups[0].team.name} </div>
    <div className="coach"> <p className="sub-title">Coach</p> </div>
    <div className="coach-name"><p className="player">{lineups[0].coach.name}</p></div>
    <div className="coach"> <p className="sub-title">Starting XI</p> </div>
    {lineups[0].startXI.map((element)=>{
        return(<div className="coach-name" key={element.player.number}> <p className="number">{element.player.number}</p><p className="player">{element.player.name}</p></div>)
    })} 
     <div className="coach"> <p className="sub-title">Substitutes</p> </div>
     {lineups[0].substitutes.map((element)=>{
        return(<div className="coach-name" key={element.player.number+1}> <p className="number">{element.player.number}</p><p className="player">{element.player.name}</p></div>)
    })} 
    </div>

    <div className="team2">
    <div className="title"> <img src={`${lineups[1].team.logo}`} className="flaggg"></img>{lineups[1].team.name} </div>
    <div className="coach"> <p className="sub-title">Coach</p> </div>
    <div className="coach-name"><p className="player">{lineups[1].coach.name}</p></div>
    <div className="coach"> <p className="sub-title">Starting XI</p> </div>
    {lineups[1].startXI.map((element)=>{
        return(<div className="coach-name" key={element.player.number+2}> <p className="number">{element.player.number}</p><p className="player">{element.player.name}</p></div>)
    })} 
     <div className="coach"> <p className="sub-title">Substitutes</p> </div>
     {lineups[1].substitutes.map((element)=>{
        return(<div className="coach-name" key={element.player.number+3}> <p className="number">{element.player.number}</p><p className="player">{element.player.name}</p></div>)
    })} 
    </div>
    
   </div>
   


    </StyledDiv>

)}else 
setTimeout(() => {
    setText("Lineups are not available.")
 }, 1000);

return( 
<StyledDiv2> 
    <MatchDetails data={details} />
    <h1 className="h1">{text}</h1>
</StyledDiv2>)

}
export default Lineups

const StyledDiv = styled.div`
position: relative;
left: 15.5%;
width: 1292px;
background: #e6e6e6;
font-family: Arial, Helvetica, sans-serif;


.container{
    margin-top: 20px;
    display: flex;
    justify-content: center;  
}

.title{
display: flex;
background: #ffd633;
color: #333333;
font-weight: bold;
font-family: Arial, Helvetica, sans-serif;
font-size: 22px;
align-items: center;
width: 500px;
height: 50px;
border-radius: 5px;
}
.coach{
    display:flex;
    background: #cccccc;
    align-items: center;
    width: 500px;
    height: 30px;
    border-top: 1px solid #bfbfbf;
    border-bottom: 1px solid #bfbfbf;
    border-radius: 5px;

}
.sub-title{
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    color: #333333;
    height: 20px;
    padding-left: 10px;   
}
.coach-name{
    display:flex;
    background: #cccccc;
    align-items: center;
    width: 500px;
    height: 30px;
    background: #e6e6e6;
    border-bottom: 1px solid #bfbfbf;
}
.flaggg{
    width: 25px;
    height: 25px;
    margin: 8px;
    }
.player{
    margin-left: 30px;
}
.number{
    margin-left: 10px;
    color: #808080;
}
.team2{
    margin-left: 70px; 
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