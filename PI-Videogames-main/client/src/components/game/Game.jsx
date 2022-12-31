import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {  useLocation } from "react-router-dom"
import { getfavourites, getgamesperid } from "../../Redux/actions"
import style from '../game/game.module.css'
import Loader from "../loader/loader"
export default function Game(){
    
    const dispatch =useDispatch()
    const midir =useLocation().pathname.split('').splice(9)
    
    console.log(midir)
    const id = midir.length<10?Number(midir.filter(i=>parseInt(i)||i==='0').join(''))//me quedo solo con los numeros de mi url(el id)
               :midir.join('')
    useEffect(()=>{                                 ////para que al montar el componente ya traiga todo del servidor 
     dispatch(getgamesperid(id)) ;  
    },[dispatch])
    
    const gamename = useSelector(state=>state.videogame_id)
    const [genero,platform,rating,released]= [gamename.genres,gamename.platforms,gamename.rating,gamename.released]
    const gener = genero&&genero.filter(i=>i.id).length?genero.map(i=>i.name):genero
    const handlefavourites = (e)=>{e.preventDefault();dispatch(getfavourites(gamename))}
    


 return(
      <div className={style.Game}>      
        <h1 className={style.info}>{gamename.name}</h1>
        {genero&&<img src={gamename.image} alt="img" width={250} height={250}/>}<br />
        {genero? <p className={style.info} id={style.parr}>{gamename.description}</p>:<Loader/>}
        {genero&&<h1>Geners:{gener.join()}</h1>}
        {platform&&<h1>Platforms : {platform.join()}</h1>}
        {rating&&<h1>Rating: {rating}</h1>}
        {released&&<h1>Date : {released}</h1>} 
        <button onClick={handlefavourites}>ADD TO FAVOURITE</button>

      </div>
    )
}
