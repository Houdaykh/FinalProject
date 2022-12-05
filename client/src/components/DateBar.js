import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import {useAuth0} from '@auth0/auth0-react';
import { FaSearch } from "react-icons/fa";
import Modal from 'react-modal';
const fns = require("date-fns")
const {addDays} = require('date-fns');
const customStyles = {
    content: {
    borderRadius: '10px',
    background: '#e6e6e6',
    width: '600px',
    border: '1px solid #808080',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    },
  };
  
  Modal.setAppElement('body');


const DateBar = () =>{

   
    const [modalIsOpen, setIsOpen] = useState(false);
  
    function openModal() {
      setIsOpen(true);
    }
  
    function closeModal() {
      setTeam("")
      setIsOpen(false);
    }

    const navigate=useNavigate()
    const today =(fns.format(new Date(), "yyyy-MM-dd"))
    const { user,isAuthenticated } = useAuth0();
    const [team,setTeam]=useState("")
    const [result,setResult]=useState([])
  
   const handleClick = (e) =>{
    e.stopPropagation();
    e.preventDefault();
    fetch(`/team/${team}`)
    .then(response => response.json())
    .then(result => 
        {
            setResult(result.response)
            if(!result.response.length){openModal()}
            else navigate(`/team/details/${team}`)
        })
    .catch(error => console.log('error', error));
   }


    return(

<StyledDiv>

<button className="btn-date" onClick={()=>navigate(`/${fns.format(addDays(new Date(),-3), "yyyy-MM-dd")}`)}>  {fns.format(addDays(new Date(),-3), "yyyy-MM-d")}</button>
<button className="btn-date" onClick={()=>navigate(`/${fns.format(addDays(new Date(),-2), "yyyy-MM-dd")}`)}>  {fns.format(addDays(new Date(),-2), "yyyy-MM-d")}</button>
<button className="btn-date" onClick={()=>navigate(`/${fns.format(addDays(new Date(),-1), "yyyy-MM-dd")}`)}>  {fns.format(addDays(new Date(),-1), "yyyy-MM-d")}</button>
<button className="btn-date" onClick={()=>navigate(`/${today}`)}> Today</button>
<button className="btn-date" onClick={()=>navigate(`/${fns.format(addDays(new Date(),1), "yyyy-MM-dd")}`)}> {fns.format(addDays(new Date(),1), "yyyy-MM-d")}</button>
<button className="btn-date" onClick={()=>navigate(`/${fns.format(addDays(new Date(),2), "yyyy-MM-dd")}`)}>  {fns.format(addDays(new Date(),2), "yyyy-MM-d")}</button>
<button className="btn-date" onClick={()=>navigate(`/${fns.format(addDays(new Date(),3), "yyyy-MM-dd")}`)}>  {fns.format(addDays(new Date(),3), "yyyy-MM-d")}</button>

<div className="status-div">
    <button className="btn-status" onClick={()=>navigate(`/`)}>All Games</button>
    <button className="btn-status" onClick={()=>navigate(`/live`)} >Live Games</button>
   {isAuthenticated && (<button className="btn-status" onClick={()=>navigate(`/favorite/${user.email}`)} >Favorites</button>)}
   {isAuthenticated && (<input type="text" value={team} className="input" placeholder="Search for Team/Country..." onChange={(e)=>{setTeam((e.target.value.toLowerCase()))}}></input>)}
   {isAuthenticated && (<button className="search" onClick={(e)=>handleClick(e)}><FaSearch/></button>)}
    
    <LoginButton />
    <LogoutButton />
</div>
<div>
      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
         
         <center><h2 style={{fontFamily: 'Arial, Helvetica, sans-serif',color: '#595959',fontWeight: 'bold',}}>Team name is incorrect!</h2></center>
        <center><button onClick={closeModal} style={{borderRadius: '5px',fontFamily: 'Arial, Helvetica, sans-serif',cursor:'pointer',color: '#595959',background:' #ffd633',width: '180px',height: '30px',border: '1px solid #cccccc',fontWeight: 'bold',}}>close</button></center>
        
      </Modal>
    </div>
</StyledDiv>
    )
    };
    export default DateBar;
    
    const StyledDiv = styled.div`
    position: absolute;
    top: 8px;
    left: 15.6%;
    width: auto;
    
    
    .btn-date{
        background: #ffd633;
        width: 180px;
        height: 30px;  
        margin-left: 3px;
        border: 1px solid #cccccc ; 
        color: #595959;
        font-weight: bold;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        cursor: pointer;
        border-radius: 5px;
        text-align: center;
        &:hover{
            background: #333333;
            color: #ffd633;}
       }
    
    .status-div{
        background: #e6e6e6; 
        margin-left: 3px;
        margin-top: 3px;
        width: autopx;
       display: flex;
       align-items: center;
       
    }

    .btn-status{
        background: #ffd633;
        width: 182px;
        height: 30px;  
        border: 1px solid #cccccc ; 
        color: #595959;
        font-weight: bold;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        cursor: pointer;
        border-radius: 5px;
        text-align: center;
        &:hover{
            background: #333333;
            color: #ffd633;}
        
    }

    .input{
        margin-left: 230px;
        height: 25px;
        border: 1px solid #cccccc ;
        border-radius: 5px;
        width: 200px;
    }

    .search{
        color: #595959;
        background: #ffd633;
        border: 1px solid #cccccc ; 
        display: flex;
        align-items: center;
        border-radius: 5px;
        height: 30px;  
        cursor: pointer;
        &:hover{
            background: #333333;
            color: #ffd633;}
    }

    `;