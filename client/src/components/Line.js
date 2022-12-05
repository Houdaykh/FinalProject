
import styled from "styled-components"


import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const fns = require("date-fns")


const Line = ({element,reload, setReload}) =>{
    const IdUser=useParams().IdUser
    const navigate=useNavigate() 
    const [color,setColor]=useState("gold")
    const [matchs,setMatchs]=useState([])
    

    const handleSubmit = (e,IdMatch,IdUser) => {
        e.preventDefault();
        
        fetch("/add-match-favoris",{
            method: "POST",
            body: JSON.stringify({IdUser,IdMatch}),
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
              }
        } )
        .then(response=>response.json()).then((res)=>{res.status===201 && setReload(!reload)})
         .catch(err=>console.log(err))       
    }
    
        if(element.fixture.status.short ==='NS' )
        return(
         <div>
   
        <div className="league">

        <div className="container">
           <img src={`${element.league.flag}`} className="flag"></img> 
           <p className="league-title" onClick={()=>navigate(`table/${element.league.id}`)} >{element.league.name}</p>
        </div>

           <p className={ "favorite" } onClick={(e)=>handleSubmit(e,element.fixture.id,IdUser)} style={{color:color}}><FaStar/></p>
           
        </div> 
   
        <div className="match-line" onClick={(e)=>{navigate(`/matchDetails/stats/${element.fixture.id}`)}}>
          <p>{fns.format(new Date(element.fixture.date), "H:mm  --- MMM d  ")}</p>
          <p>{element.teams.home.name}</p>
          <p>vs</p>
          <p>{element.teams.away.name}</p>
        </div> 
   
       </div> 
   
        )
        else if(element.fixture.status.short ==='1H' || element.fixture.status.short ==='2H')
        return(
         <div>
   
         <div className="league">

         <div className="container">
            <img src={`${element.league.flag}`} className="flag"></img> 
           <p className="league-title" onClick={()=>navigate(`/table/${element.league.id}`)}>{element.league.name}</p>
          </div>

           <p className="favorite" onClick={(e)=>handleSubmit(e,element.fixture.id,IdUser)} style={{color:color}}><FaStar/></p>
           
         </div> 
    
         <div className="match-line" onClick={(e)=>{navigate(`/matchDetails/stats/${element.fixture.id}`)}}>
           <p>{element.fixture.status.elapsed }'</p>
           <p>{element.teams.home.name}</p>
           <p>{element.goals.home}-{element.goals.away}</p>
           <p>{element.teams.away.name}</p>
          
         </div> 
    
        </div> 
        )
   
        else if(element.fixture.status.short ==='FT')
        return(
         <div>
   
         <div className="league">

         <div className="container">
            <img src={`${element.league.flag}`} className="flag"></img> 
            <p className="league-title" onClick={()=>navigate(`table/${element.league.id}`)}>{element.league.name}</p>
         </div>
            <p className="favorite" onClick={(e)=>
               {
                   handleSubmit(e,element.fixture.id,IdUser)
                   setColor("#333333")
                   }} style={{color:color}}><FaStar/></p>
        
         </div>

         <div className="match-line" onClick={(e)=>{navigate(`/matchDetails/stats/${element.fixture.id}`)}}>
           <p>{element.fixture.status.short }</p>
           <p>{element.teams.home.name}</p>
           <p>{element.goals.home}-{element.goals.away}</p>
           <p>{element.teams.away.name}</p>
           
         </div> 
    
        </div> 
        )
   


}
export default Line