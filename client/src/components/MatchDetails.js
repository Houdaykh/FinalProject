import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import Stats from "./Stats";

const MatchDetails = ({data}) =>{
    const fns = require("date-fns")
    const navigate=useNavigate() 

  

    
if(data.length) 

return(
<StyledDiv>
<div className="league">
     <button className="home" onClick={()=>navigate(`/`)}>Home</button>    
</div>
<div className="header">
    <div >
    <img src={`${data[0].teams.home.logo}`} className="flag"></img>  
      <p>{data[0].teams.home.name} </p>
    </div>

    <div >
     <p>{data[0].fixture.status.short}</p>  
     <h1>{data[0].fixture.status.short === 'FT' && (`${data[0].goals.home} - ${data[0].goals.away}`)}</h1>
     
     <h1>{data[0].fixture.status.short === 'NS' && ('VS')}</h1>
     <h3>{data[0].fixture.status.short === 'NS' && (fns.format(new Date(data[0].fixture.date), "H:mm  --- MMM d  "))}</h3>
     
     <h1>{data[0].fixture.status.short === '1H' && (`${data[0].goals.home} - ${data[0].goals.away}`)}</h1>
     <p>{data[0].fixture.status.short === '1H' && (data[0].fixture.status.elapsed + "'")}</p>
     
     <h1>{data[0].fixture.status.short === '2H' && (`${data[0].goals.home} - ${data[0].goals.away}`)}</h1>
     <p>{data[0].fixture.status.short === '2H' && (data[0].fixture.status.elapsed + "'")}</p>
     
     <p>{data[0].fixture.venue.name}</p>
    </div>

    <div>
    <img src={`${data[0].teams.away.logo}`} className="flag"></img>  
      <p>{data[0].teams.away.name}</p> 
    </div>
</div>

    <div className="line-btn">
        <button className="btn" onClick={(e)=>{navigate(`/matchDetails/stats/${data[0].fixture.id}`)}}>Stats</button>
        <button className="btn" onClick={(e)=>{navigate(`/matchDetails/lineups/${data[0].fixture.id}`)}}>Lineups</button>
        
    </div> 

    
    
</StyledDiv>
)

}
export default MatchDetails;

const StyledDiv = styled.div`
position: relative;

width: 1292px;

.header{
display: flex;    
background: #e6e6e6;
text-align: center;
font-weight: bold;
font-family: Arial, Helvetica, sans-serif;
font-size: 15px;
justify-content: space-around;  
}

.flag{
    margin-top: 20px;
    width: 155px;
    height: 110px;  
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
    color: #595959;
        cursor: pointer;
        border-radius: 5px; 
        font-size: 16px;
                font-weight: bold;
                &:hover{
                    background: #333333;
                    color: #ffd633;}
}

.line-event{
    display: flex;
    background: #f2f2f2;
    width: 1292px;
    height: 30px;
    color:  #666666;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 13px;
    text-align: start;
    cursor: pointer;
    align-items: center;  
    
}

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

`
