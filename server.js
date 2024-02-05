const express = require('express')
const app = express()

const moviedata = require('./Movie data/data.json')
// const port = process.env.PORT
// const apiKey = process.env.API_KEY
const port = process.env.PORT
const apiKey = process.env.API_KEY;
require('dotenv').config()
const axios = require('axios');
const cors = require('cors');


//routes
app.use(cors())
app.get('/', movieHandler)
app.get('/favorite', favoriteHandler) 
app.get('/trending', trendingHandler);
app.get('/search', searchHandler);
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

    function trendingHandler(req,res){
        //axios.get(url).then().catch()
        let url = `https://api.themoviedb.org/3/movie/157336?api_key=${apiKey}`
        axios.get(url)
        .then(result=>{
            // let movieData = result.data;
            // let resultData = new reshape(
            //     movieData.id,
            //     movieData.title,
            //     movieData.release_date,
            //     movieData.poster_path,
            //     movieData.overview
            // );

            console.log(result.data)
             let resultData = result.data.map(data=>{
                return new reshape(data.id, data.title, data.release_date,data.poster_path,data.overview)
            })
            res.json(resultData)
            
        })
        .catch(error=>{
            console.log(error)
            res.status(500).send('Internal Server Error');
        })
        }

        //constructor
        function reshape(id, title, release_date,poster_path,overview){
            this.id = id;
            this.title = title;
            this.release_date =release_date ;
            this.poster_path=poster_path;
            this.overview=overview
        }


        function searchHandler(req,res){
            let movieName = req.query.name
            let url =`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&&query=${movieName}`
            axios.get(url)
            .then(result=>{
                console.log(result.data.results)
                let response = result.data.results
                res.json(response)
            })
            .catch(error=>{
                console.log(error)
                res.status(500).send('Internal Server Error');
            })
        }












app.listen(port, () => {
    console.log(`my app is running and  listening on port ${port}`)
  })