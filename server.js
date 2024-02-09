//calling the packages
const express = require('express')
const app = express()
const moviedata = require('./Movie data/data.json')
const port = process.env.PORT || 3001
const apiKey = process.env.API_KEY || "41a75590426022b47900439b0e712ae5"
require('dotenv').config()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const axios = require('axios');
const cors = require('cors');
const { Client } =  require('pg')
const url =`postgres://makarem:0000@localhost:5432/movie`
const client = new Client(url)

//routes
app.use(cors())
app.get('/', movieHandler)
app.get('/favorite', favoriteHandler) 
app.get('/trending', trendingHandler);
app.get('/search', searchHandler);
app.get('/popular',popularHandler)
app.get('/upcoming',upcomingHandler)
app.post('/addMovie',addMovieHandler)
app.get('/getMovies',getMoviesHandlers)
//handlers
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
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Sorry, something went wrong")
    });
 function trendingHandler(req,res){
        //axios.get(url).then().catch()
        let url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=en-US`
        axios.get(url)
        .then(result=>{
            
            

            console.log(result.data.results)
            
             let resultData = result.data.results.map(movie=>{
                return new Reshape(movie.id, movie.title, movie.release_date,movie.poster_path,movie.overview)
            })
            res.json(resultData)
            
        })
        .catch(error=>{
            console.log(error)
            res.status(500).send('Internal Server Error');
        })
        }
function popularHandler(req,res){
    let url = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`
    axios.get(url)
    .then(result=>{
         let popularData = result.data.results.map(movie=>{
            return new Reshape2(movie.id, movie.origin_country, movie.original_name,movie.overview)
        })
        res.json(popularData)
        
    })
    .catch(error=>{
        console.log(error)
        res.status(500).send('Internal Server Error');
    })
}
function upcomingHandler(req,res){
    let url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
    axios.get(url)
    .then(result=>{
         let upcomingData = result.data.results.map(movie=>{
            return new Reshape2(movie.id, movie.genre_ids, movie.vote_average,movie.vote_count)
        })
        res.json(upcomingData)
        
    })
    .catch(error=>{
        console.log(error)
        res.status(500).send('Internal Server Error');
    })
}
function searchHandler(req,res){
    let movieName = req.query.name
    let url =`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieName}&language=en-US`
    axios.get(url)
    .then(result=>{
        let searched = result.data.results.map(movie => {
            return new Reshape(movie.id, movie.title, movie.release_date, movie.poster_path, movie.overview);
        })
        res.json(searched)
    })
    .catch(error=>{
        console.log(error)
        res.status(500).send('Internal Server Error');
    })
}
function addMovieHandler(req,res){
    console.log(req.body)
    const { Name, Time, MovieType }= req.body
    const  sql = `INSERT INTO movies(Name, Time, MovieType)
    VALUES ($1,$2,$3) RETURNING *;`
    const values = [Name, Time, MovieType] 
    client.query(sql, values).then((result)=>{
        console.log(result.rows)
        res.status(201).json(result.rows)
    }).catch()
}
function getMoviesHandlers(req,res){
    const sql = `SELECT * FROM movies;`
    client.query(sql).then((result)=>{
        const data = result.rows
        res.json(data)

    })
    .catch()
}
 //constructors
        function Reshape(id, title,date,path,overview){
            this.id = id;
            this.title = title;
            this.date = date;
            this.path = path;
            this.overview = overview;
        }
        function Reshape2(id,origin_country,original_name,overview){
            this.id = id;
            this.origin_country = origin_country;
            this.original_name = original_name;
            this.overview = overview;
        }

//listener
client.connect().then(()=>{
 app.listen(port, () => {
        console.log(`my app is running and  listening on port ${port}`)
      })
}
).catch()

