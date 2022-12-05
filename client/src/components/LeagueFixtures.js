import { useEffect, useState } from "react";
import styled from "styled-components"
import { useNavigate, useParams } from "react-router-dom";
import LeagueDetailsHeader from "./LeagueDetailsHeader";
const fns = require("date-fns")

const LeagueFixtures = () =>{
  const navigate=useNavigate() 
    var myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", "1d0fdd7faf720ded32cf9e1bf8a78d4c");
    myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

const id = useParams().id
const [response,setResponse]=useState([])
const [text,setText]=useState("")

useEffect(() => {
    
    fetch(`https://v3.football.api-sports.io/fixtures?league=${id}&next=20`, requestOptions)
      .then(response => response.json())
      .then(result =>{ 
        setResponse(result.response)
        
    })
      .catch(error => console.log('error', error));
    
}, [id]);

if(response.length)
    return(
        <StyledDiv>
<LeagueDetailsHeader  id={id} />
{response.map((element,index)=>{
    return(
  <div className="match-line" key={index} onClick={(e)=>{navigate(`/matchDetails/stats/${element.fixture.id}`)}}>
       <div className="container"><p>{fns.format(new Date(element.fixture.date), "H:mm  --- MMM d  ")}</p></div>
       <div className="container"><p>{element.teams.home.name}</p></div>
       <div className="container"><p>{element.score.fulltime.home}vs{element.score.fulltime.away}</p></div>
       <div className="container"><p>{element.teams.away.name}</p></div>
      
     </div>  )
})}

    </StyledDiv>
    )
    else 
 setTimeout(() => {
    setText("Fixtures are not available.")
 }, 1000);


return( 
    <StyledDiv2> 
        <LeagueDetailsHeader  id={id} />
        <h1 className="h1">{text}</h1>
    </StyledDiv2>)

}
export default LeagueFixtures

const StyledDiv = styled.div`
position: relative;
width: 1292px;
left: 15.5%;

.match-line{
    display: flex;
    position: relative;
    background: #e6e6e6;
    width: 1292px;
    height: 40px;
    color:  #666666;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    text-align: start;
  
    align-items: center;  
    cursor: pointer;
    border-bottom: 1px solid #d9d9d9;
  &:hover{
    background: #ffd633;
    color: #333333;
}  
}
.container{
    width: 260px;
    text-align: center;

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