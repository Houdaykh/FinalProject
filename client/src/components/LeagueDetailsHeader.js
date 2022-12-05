import { useEffect, useState } from "react";
import styled from "styled-components"
import { useNavigate } from "react-router-dom";
const fns = require("date-fns")

const LeagueDetailsHeader = ({id}) =>{
    const navigate=useNavigate()
    const today =(fns.format(new Date(), "yyyy-MM-dd"))
    return(
        <StyledDiv>
<div className="league">
     <button className="home" onClick={()=>navigate(`/`)}>Home</button>    
</div>
    <div className="line-btn">
        <button className="btn" onClick={()=>navigate(`/table/${id}`)}>Table</button>
        <button className="btn" onClick={()=>navigate(`/leaguestats/${id}`)}>Players stats</button>
        <button className="btn" onClick={()=>navigate(`/leaguefixtures/${id}`)}>Next matchs</button>  
    </div> 
    </StyledDiv>
    )
}
export default LeagueDetailsHeader

const StyledDiv = styled.div`
position: relative;

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

        .line-btn{
            display: flex;
        position: relative;
        background: #cccccc ;
        width: 1292px;
        height: 40px;
        align-items: center;
        }
        
        .btn{
            font-weight: bold;
            background: #ffd633;
            color: #595959;
            width: 182px;
            height: 30px;  
            margin-left: 3px;
            border: none;
            font-family: Arial, Helvetica, sans-serif;
                font-size: 16px;
                cursor: pointer;
                border-radius: 5px; 
                &:hover{
                    background: #333333;
                    color: #ffd633;
        }

     

`