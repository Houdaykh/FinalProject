import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllGames from "./AllGames";

import MatchDetails from "./MatchDetails";
import SideBar from "./SideBar";
import Stats from "./Stats";
import Table from "./Table";
import LeagueFixtures from "./LeagueFixtures";
import LeagueStats from "./LeagueStats";
import LiveGames from "./LiveGames";
import MatchsFavorites from "./MatchsFavorites";
import Lineups from "./Lineups";
import TeamDetails from "./TeamDetails";


const  App = () => {
  document.title = 'Footlab'
  return (
    <BrowserRouter>
         <SideBar/>

            <Routes>
            <Route path="/" element={<AllGames/>} />  
            <Route path="/live" element={<LiveGames/>} />  
            <Route path="/:date" element={<AllGames/>} /> 
            <Route path="/favorite/:IdUser" element={<MatchsFavorites/>} />
            <Route path="/matchDetails/stats/:IdMatch" element={<Stats/>} /> 
            <Route path="/matchDetails/lineups/:IdMatch" element={<Lineups/>} /> 
            <Route path="/team/details/:teamName" element={<TeamDetails/>} /> 
            <Route path="/table/:idLeague" element={<Table/>} />
            <Route path="/leaguefixtures/:id" element={<LeagueFixtures/>} /> 
            <Route path="/leaguestats/:id" element={<LeagueStats/>} /> 
            </Routes>
            
        </BrowserRouter>
  );
}

export default App;
