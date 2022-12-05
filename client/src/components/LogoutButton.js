import {useAuth0} from '@auth0/auth0-react';
import { FiLogOut} from "react-icons/fi";
import styled from 'styled-components';

const LogoutButton = () =>{
const {logout, isAuthenticated } = useAuth0();
return(
    isAuthenticated && (
       <StyledButton onClick={()=> logout()}>
           < FiLogOut/>
       </StyledButton> 
    )
    
)

}
export default LogoutButton

const StyledButton =styled.button`

background: #333333;
width: 80px;
height: 30px;  
margin-left: 187px;
border: 1px solid #cccccc ; 
color: white;
font-weight: bold;
font-family: Arial, Helvetica, sans-serif;
font-size: 22px;
cursor: pointer;
border-radius: 5px;
text-align: center;

   


`