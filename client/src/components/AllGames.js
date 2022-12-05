import { useParams } from "react-router-dom"
import DateBar from "./DateBar"
import Match from "./Match"



const AllGames = ()=>{
 const date = (useParams().date)
    return(
   <>

        <DateBar/>
        <Match status={"all"} />
   </>
    )
}
export default AllGames