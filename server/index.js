const express = require('express');
const helmet  = require('helmet');
const morgan = require('morgan');
const port = 8000;

const {getLeagues,addMatchFavoris,getMatchsFavoris,getMatchDetails,getTeam} = require("./handlers");

express()

.use(express.json())
.use(helmet())
.use(morgan('tiny'))


.get("/leagues",getLeagues)

.post("/add-match-favoris",addMatchFavoris)

.get("/matchs/favoris/:IdUser",getMatchsFavoris)

.get("/match/details/:IdMatch",getMatchDetails)

.get("/team/:teamName",getTeam)





















.get("*", (req, res) => {
  res.status(404).json({
  status: 404,
  message: "This is obviously not what you are looking for.",
  });
})

.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})