import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"



const TeamDetails = () =>{

const team = useParams().teamName
const [result,setResult]=useState([])
const navigate=useNavigate()

useEffect(()=>{
    
    fetch(`/team/${team}`)
    .then(response => response.json())
    .then(result => setResult(result.response))
    .catch(error => console.log('error', error));
} , [team] )


if(result.length)
return(
    <StyledDiv>
        <div className="league">
        <button className="home" onClick={()=>navigate(`/`)}>Home</button>    
        </div>

        <div className="container">
        <img src={`${result[0].team.logo}`} className="flag"/>
        <div className="desc">
            <p className="country">{result[0].team.name}</p>
            <p>Country: {result[0].team.country}</p>
            <p>Founded: {result[0].team.founded}</p>
            <p>Code: {result[0].team.code}</p>
        </div>
        </div>

        <div className="container">
        <img src={`${result[0].venue.image}`} className="flag"/>
        <div className="desc">
            <p className="country">{result[0].venue.name}</p>
            <p>City: {result[0].venue.city}</p>
            <p>Address: {result[0].venue.address}</p>
            <p>Capacity: {result[0].venue.capacity}</p>
        </div>
        </div>

    </StyledDiv>
)

}
export default TeamDetails

const StyledDiv = styled.div`
position: relative;
width: 1292px;
background: #e6e6e6;
left: 15.5%;



.league{
    display: flex;
    
    background: #333333;
    width: 1292px;
    height: 40px;
    color: #ffd633;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 22px;
    align-items: center; 
    }

    .home{
        background: none;
        border: none;
        margin-left: 10px;
        color: #ffd633;
        border-radius: 5px;
        font-family: Arial, Helvetica, sans-serif;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                &:hover{
                    background: #ffd633;
                    color: #333333;
        }
    }

.container{
    border: 3px solid #737373;
    border-radius: 10px;
    width: 1100px;
    height: 350px;
    margin-left: 90px;
    margin-top: 30px;
    align-items: center;
    display: flex;
}

.flag{
    margin-left: 20px;
    border-radius: 10px;
    width: 400px;
    height: 300px;
}

.country{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 50px; 
    font-weight: bold;
    color: #666666; 
}

p{
    
        font-family: Arial, Helvetica, sans-serif;
        font-size: 22px; 
        font-weight: bold;
        color: #666666;   
}

.desc{
    margin-left: 20px;
}

`