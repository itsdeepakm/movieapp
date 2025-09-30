import React from 'react'
import './movies.css'
import {useState,useEffect} from 'react';



export default function Movies() {
    const [data,setdata]=useState([]);
    const [search,setsearch]=useState("");
    const [watchlist,setwatchlist]=useState(JSON.parse(localStorage.getItem("watchlist")) || []);
    useEffect(()=>{
        let ismounted=true;

        const fetchData=async()=>{
            const res=await fetch(`https://www.omdbapi.com/?s=${search}&apikey=7cd996c3`);
            const result=await res.json();
            console.log(result);
            if(ismounted){
            setdata(result.Search);
            }
        }
        fetchData();
        return()=>{ismounted=false;}
    },[search]);

    const addtowatchlist=(movie)=>{
        const newwatchlist=[...watchlist,movie];
        setwatchlist(newwatchlist);
        localStorage.setItem("watchlist",JSON.stringify(newwatchlist));
    }
    return (
        <div>
            <h1>Movies Page</h1>

            <input type="text" placeholder='Search Movies' value={search} onChange={(e)=>setsearch(e.target.value)} />
            {data && data.length>0?(
                data.map((movie)=>(
                    <div key={movie.imdbID} className='movie'>
                        <h2>{movie.Title}</h2>
                        <p>{movie.Year}</p>
                        <img src={movie.Poster} alt={movie.Title} />
                        <button onClick={() => addtowatchlist(movie)}>addToWatchlist</button>

                    </div>
                ))
            ):(
                <p>No Movies Found</p>
            )}
            <h2>My Watchlist</h2>
    <div className="movies-container">
     {watchlist.length > 0 ? (
      watchlist.map((movie) => (
      <div key={movie.imdbID} className="movie">
        <h3>{movie.Title}</h3>
        <img src={movie.Poster} alt={movie.Title} />
      </div>
    ))
  ) : (
    <p>No movies in your watchlist</p>
  )}
</div>

        </div>
    )
}