const express = require('express')
const app = express()
const port = 3001
const moviedata = require('./data.json')
app.get('/', movieHandler)
app.get('/favorite', favoriteHandler) 

//functions
function movieHandler(req,res){
        let movie = new consMovie(moviedata.title, moviedata.poster_path, moviedata.overview)
    res.json(movie)
}
function consMovie(title, poster_path, overview){
    this.title = title,
    this.poster_path = poster_path
    this.overview = overview
}
function favoriteHandler(req,res){
    res.send("welcome to favorite page")
    
}
app.use((req, res, next) => {
    res.status(404).send("page not found")
});
//internal server error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Sorry, something went wrong")
    });

app.listen(port, () => {
    console.log(`my app is running and  listening on port ${port}`)
  })