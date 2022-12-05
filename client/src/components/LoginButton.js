import {useAuth0} from '@auth0/auth0-react';
import styled from 'styled-components';
import { FiLogIn } from "react-icons/fi";


const LoginButton = () =>{
const {loginWithRedirect, isAuthenticated } = useAuth0();
return(
    
    !isAuthenticated && (
      <StyledButton  onClick={()=> loginWithRedirect()}>
         <FiLogIn/>  
       </StyledButton> 
      
    )
    
)

}
export default LoginButton

const StyledButton =styled.button`


    background: #333333;
    width: 80px;
    height: 30px;  
    margin-left: 833px;
    border: 1px solid #cccccc ; 
    color: white;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 22px;
    cursor: pointer;
    border-radius: 5px;
    text-align: center;
   


`