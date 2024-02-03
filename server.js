const express = require('express')
const app = express()
const port = 3000
const moviedata = require('./data.json')
app.get('/', movieHandler)
function movieHandler(req,res){
    const result = []
        let movie = new consMovie(moviedata.title, moviedata.poster_path, moviedata.overview)
        result.push(movie)
    res.json(result)
}
function consMovie(title, poster_path, overview){
    this.title = title,
    this.poster_path = poster_path
    this.overview = overview
}
app.get('/favorite', favoriteHandler) 

function favoriteHandler(req,res){
    res.send("welcome to favorite page")
    
}
app.use((req, res, next) => {
    res.status(404).json({
        status: 404,
        responseText: "Page not found"
    });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 500,
        responseText: "Sorry, something went wrong"
    });
});

app.listen(port, () => {
    console.log(`my app is running and  listening on port ${port}`)
  })