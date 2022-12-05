import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components"
import LeagueDetailsHeader from "./LeagueDetailsHeader";
import TableRow from "./TableRow";

const LeagueDetails = () =>{

    var myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", "1d0fdd7faf720ded32cf9e1bf8a78d4c");
    myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
      
const id= useParams().idLeague

const [table,setTable]=useState([])
const [league,setLeague]=useState([])
const [text,setText]=useState("")

useEffect(() => {
    
    fetch(`https://v3.football.api-sports.io/standings?league=${id}&season=2022`, requestOptions)
      .then(response => response.json())
      .then(result =>{ 
        setTable(result.response[0].league.standings[0])
        setLeague(result.response[0].league)
    })
      .catch(error => console.log('error', error));
    
}, [id]);

if(table.length)
return(
<StyledDiv>

<LeagueDetailsHeader id={id}/>

    <div className="league">

        <div className="title-start">
         <img src={`${league.logo}`} className="flag"></img>
         <p>{league.name} </p>
         <p style={{marginLeft:'10px'}}> ({league.country})</p>
         </div>

         <div className="table-title">
            <p>MP</p>
            <p>W</p>
            <p>L</p>
            <p>D</p>
            <p>Pts</p>
        </div>
        </div>
    {table.map((element)=>{
            return <TableRow res={element} key={element.team.id}/>
        })}

</StyledDiv>
)
else 
 setTimeout(() => {
    setText("Table is not available.")
 }, 1000);


return( 
    <StyledDiv2> 
         <LeagueDetailsHeader  id={id} />
        <h1 className="h1">{text}</h1>
    </StyledDiv2>)

}
export default LeagueDetails;

const StyledDiv = styled.div`
position: relative;
left: 15.5%;
width: 1292px;

.league{
    display: flex;
    position: relative;
    background: #333333;
    width: 1292px;
    height: 40px;
    color: #ffd633;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    text-align: start;
    align-items: center; 
    }

    .flag{
        width: 25px;
        height: 25px;
        margin: 8px;
        }

        .line-btn{
            display: flex;
        position: relative;
        background: #cccccc ;
        width: 1292px;
        height: 40px;
        align-items: center;
        }
        
        .btn{
            background: #ffd633;
            width: 182px;
            height: 30px;  
            margin-left: 3px;
            border: none;
            font-family: Arial, Helvetica, sans-serif;
                font-size: 16px;
                cursor: pointer;
                border-radius: 5px; 
        }

        .table-title{
            display: flex; 
            margin-left: 1px;
            justify-content: space-around; 
            width: 500px;
        }

        .title-start{
            display: flex;
            height: 100%;
            align-items: center;
            width: 800px;

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