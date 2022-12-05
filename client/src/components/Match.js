import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {useAuth0} from '@auth0/auth0-react';

const fns = require("date-fns")

const Match = ({status}) =>{

let param =useParams().date
 const navigate=useNavigate() 
 const date =(fns.format(new Date(), "yyyy-MM-dd"))
 const {user,isAuthenticated } = useAuth0()
 
 

  let IdUser=""
  if(user)
  {
   IdUser=user.email 
  }
  


 if(!useParams().date)
 {
  param=date
 }
  
 
 
 


 var myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", "1d0fdd7faf720ded32cf9e1bf8a78d4c");
    myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

   const [allGames,setAllGames]= useState([])
   const [matchs,setMatchs]=useState([])
   const [reload, setReload]=useState(false)

    useEffect(() => {
if(user){
  fetch(`/matchs/favoris/${IdUser}`)
    .then(response => response.json())
    .then(result => setMatchs(result.response))
    .catch(error => console.log('error', error));
}
    
      
      fetch(`https://v3.football.api-sports.io/fixtures?date=${param}`, requestOptions)
        .then(response => response.json())
        .then(result =>{ 
          setAllGames(result.response)
          
      })
        .catch(error => console.log('error', error));
      
  }, [param,user,reload]);


  // setTimeout(() => {
        
  //   fetch(`https://v3.football.api-sports.io/fixtures?date=${date}`, requestOptions)
  //     .then(response => response.json())
  //     .then(result =>{ 
  //       setAllGames(result.response)
        
  //   })
  //     .catch(error => console.log('error', error));
  // }, 60000); 

  
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
    .then(response=>response.json()).then((res)=>{res.status == 201 ? setReload(!reload) : setReload(!reload)})
     .catch(err=>console.log(err))
        
}

return(

    <StyledDiv>
  {allGames.map((element,index)=>{
    
     if(element.fixture.status.short ==='NS' && status ==="all")

     return(
      <div key={index}>

     <div className="league">
     <div className="container">
        <img src={`${element.league.flag}`} className="flag"></img> 
        <p className="league-title" onClick={()=>navigate(`table/${element.league.id}`)}>{element.league.name}</p>
    </div>
    <div>
        {isAuthenticated && (<p className="favorite" onClick={(e)=>handleSubmit(e,element.fixture.id,IdUser)} style={{color: matchs.some((match)=>match.fixture.id===element.fixture.id) ? "gold":""}}><FaStar/></p>)}
     </div>
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
      <div key={index}>

      <div className="league">
      <div className="container">
         <img src={`${element.league.flag}`} className="flag"></img> 
         <p className="league-title" onClick={()=>navigate(`/table/${element.league.id}`)}>{element.league.name}</p>
         </div>
         <div>
        {isAuthenticated && (<p className="favorite" onClick={(e)=>handleSubmit(e,element.fixture.id,IdUser)} style={{color: matchs.some((match)=>match.fixture.id===element.fixture.id) ? "gold":""}}><FaStar/></p>)}
      </div>
      </div> 
 
      <div className="match-line" onClick={(e)=>{navigate(`/matchDetails/stats/${element.fixture.id}`)}}>
        <p>{element.fixture.status.elapsed }'</p>
        <p>{element.teams.home.name}</p>
        <p>{element.goals.home}-{element.goals.away}</p>
        <p>{element.teams.away.name}</p>
       </div> 
 
     </div> 
     )

     else if(element.fixture.status.short ==='FT' && status ==="all")
     return(
      <div key={index}>

      <div className="league">
        <div className="container">
          <img src={`${element.league.flag}`} className="flag"></img> 
         <p className="league-title" onClick={()=>navigate(`table/${element.league.id}`)}>{element.league.name}</p>
        </div>
         <div>
         {isAuthenticated && (<p className="favorite" onClick={(e)=>{handleSubmit(e,element.fixture.id,IdUser)}} style={{color: matchs.some((match)=>match.fixture.id===element.fixture.id) ? "gold":""}}><FaStar/></p>)}
      </div>
      </div> 
 
      <div className="match-line" onClick={(e)=>{navigate(`/matchDetails/stats/${element.fixture.id}`)}}>
        <p>{element.fixture.status.short }</p>
        <p>{element.teams.home.name}</p>
        <p>{element.goals.home}-{element.goals.away}</p>
        <p>{element.teams.away.name}</p>
        </div> 
 
     </div> 
     )

  })}
  
    </StyledDiv>
)


}
export default Match;

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
  right: 50px;
}

`;