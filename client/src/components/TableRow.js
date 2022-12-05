import styled from "styled-components"

const Table = ({res}) => {

    return(
        <StyledDiv>

        <div className="table-row">
        <div className="row-start">
          <p>{res.rank}. </p>
        <img src={`${res.team.logo}`} className="flag"></img>
        <p>{res.team.name}</p>  
        </div>
        <div className="row-end">
            <p>{res.all.played}</p>
            <p>{res.all.win}</p>
            <p>{res.all.draw}</p>
            <p>{res.all.lose}</p>
            <p>{res.points}</p>  
        </div>   
    </div>
    
        </StyledDiv>
    )
 
}
export default Table;

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

    .flag{
        width: 25px;
        height: 25px;
        margin: 8px;
        }

.table-title{
    display: flex; 
    margin-left: 615px;
    justify-content: space-around; 
    width: 500px;
   
}
.row-start{
    display: flex; 
    width: 500px;
    
}

.row-end{
    margin-left: 295px;
    display: flex; 
    width: 500px;
    justify-content: space-around; 
}


.table-row{
    display: flex;
    background: #f2f2f2;
    width: 1292px;
    height: 30px;
    color:  #666666;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 13px;
    text-align: start;
    align-items: center;  
    border-bottom: 1px solid #d9d9d9;
    &:hover{
        background: #ffd633;
        color: #333333;
}

`