import styled from "styled-components";
import ProgressBar from "@ramonak/react-progress-bar";
import MatchDetails from "./MatchDetails";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Stats = ()=>{

const IdMatch= useParams().IdMatch
const [details,setDetails]=useState([])
const [stats1,setStats1]=useState([])
const [stats2,setStats2]=useState([])
const [text,setText]=useState("")
useEffect(()=>{

fetch(`/match/details/${IdMatch}`)
.then(response => response.json())
.then(result => {setDetails(result.response)
setStats1(result.response[0].statistics[0].statistics)
setStats2(result.response[0].statistics[1].statistics)

})
.catch(error => console.log('error', error));

},[])

if(stats1.length)
{
return(
<StyledDiv>
    
<MatchDetails data={details}/>

<div className="container">

<div className="table-start">
{stats1.map((element,index)=>{return(<div className="line" key={index}> <ProgressBar completed={(`${element.value}`+`${element.value}`)} customLabel={`${element.value}`} labelColor={" #4d4d4d"} baseBgColor={"#999999"} bgColor={"#ffd633"} dir={"rtl"} className="progress-bar" /> </div>)})}
</div>

<div className="table-end">
{stats1.map((element,index)=>{return(<div className="line" key={index+100}> <p style={{textAlign:'center', width:'100px'}}>{element.type}</p> </div>)})}    
</div>

<div className="table-end">
{stats2.map((element,index)=>{return(<div className="line" key={index+200}><ProgressBar completed={`${element.value}`+`${element.value}`} customLabel={`${element.value}`} labelColor={" #4d4d4d"} baseBgColor={"#999999"} bgColor={"#ffd633"}  className="progress-bar" /></div>)})}
</div>

</div>

</StyledDiv>

)}else 
 setTimeout(() => {
    setText("Stats are not available.")
 }, 1000);


return( 
    <StyledDiv2> 
        <MatchDetails data={details} />
        <h1 className="h1">{text}</h1>
    </StyledDiv2>)
}

export default Stats;

const StyledDiv = styled.div`
position: relative;
left: 15.5%;
width: 1292px;
font-weight: bold;
font-family: Arial, Helvetica, sans-serif;
font-size: 15px;
background: #e6e6e6;

.progress-bar{
    width: 500px;  
    
}

.line{
display: flex;
height: 50px;
align-items: center;
margin-top: 20px;
text-align: center;
}

.container{
    display: flex;
    justify-content: center;  
}

.table-end{  
    height: 50px; 
    text-aling: center;
   
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