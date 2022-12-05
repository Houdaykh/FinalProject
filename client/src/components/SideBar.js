import { useEffect, useState } from "react";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const SideBar = () =>{
   
  const navigate=useNavigate()
  const [leagues,setLeagues]=useState([])

    useEffect(() => {
    
        fetch("/leagues")
          .then(response => response.json())
          .then(result => setLeagues(result.response))
          .catch(error => console.log('error', error));
        
    }, []);
//console.log(leagues[0].league.name)
if(leagues)
return(
    <StyledDiv>
     
     {leagues.map((element)=>{
      return (
        <button className="btn-sideBar" key={element.league.id} onClick={()=>navigate(`table/${element.league.id}`)}>
            <img src={`${element.league.logo}`} className="flag-sideBar" ></img> {element.league.name}
        </button>
      )  
     })}   
    </StyledDiv>
)
else return (<StyledDiv><h1 style={{marginLeft:'25%',marginTop:'150%'}}><CircularProgress color="secondary"  className="loading"/></h1></StyledDiv>)
};
export default SideBar;

const StyledDiv = styled.div`
position: fixed;
height: 100%;
width: 15%;
background: #e6e6e6;
overflow-y: scroll;

.btn-sideBar{
 background: #e6e6e6;
 width: 100%;
 height: 50px;  
 border: 1px solid #cccccc ; 
 color: #737373;
 font-weight: bold;
 font-family: Arial, Helvetica, sans-serif;
 font-size: 16px;
 text-align: start;
 cursor: pointer;
}

.flag-sideBar{
 width: 10%;
 height: 50%;
}

`;