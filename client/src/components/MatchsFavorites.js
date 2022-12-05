import { useParams } from "react-router-dom"
import styled from "styled-components"
import DateBar from "./DateBar"
import Match from "./Match"
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Line from "./Line";
const fns = require("date-fns")


const MatchsFavorites= ()=>{

    const IdUser=useParams().IdUser
    const navigate=useNavigate() 
    const [color,setColor]=useState("gold")
    const [matchs,setMatchs]=useState([])
    const [reload, setReload]=useState(false)

    

   useEffect(()=>{
    fetch(`/matchs/favoris/${IdUser}`)
    .then(response => response.json())
    .then(result => setMatchs(result.response))
    .catch(error => console.log('error', error));
    
   },[reload])




    return(
   <>

        <DateBar/>
        { <StyledDiv>
  {matchs.map((element,index)=>{
    return <Line element={element} key={index} reload={reload} setReload={setReload}/>
     })}
  
    </StyledDiv> }
   </>
    )
}
export default MatchsFavorites

const StyledDiv = styled.div`
min-height: 737px;
background: #e6e6e6;

.league{
  display: flex;
  position: relative;
  background: #333333;
  top: 65px;
  left: 15.5%;
  width: 1278px;
  height: 40px;
  color: #ffd633;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
  text-align: center;
  align-items: center; 
  justify-content: space-around; 
  border-radius: 5px; 
}

.container{
  display: flex;
  position: relative;
  text-align: center;
  width: 1150px;
 align-items: center;  
  
}

.flag{
width: 25px;
height: 25px;
margin: 8px;
}

.match-line{
    display: flex;
    position: relative;
    background: #e6e6e6;
    top: 60px;
    left: 15.5%;
    width: 1278px;
    height: 40px;
    color:  #666666;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    text-align: start;
    cursor: pointer;
    align-items: center;  
    justify-content: space-around;
    border-bottom: 1px solid #d9d9d9;
    
}
p{
  width: 280px;
  text-align: center;
}

.league-title{
  text-align: start; 
  cursor: pointer;
  width: auto;
}

.favorite{
  color: #666666;
  width: auto;
  cursor: pointer;
 
}



`;