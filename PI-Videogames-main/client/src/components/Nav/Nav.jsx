import { Link } from 'react-router-dom'
import style from'../Nav/Nav.module.css'
export default function Nav(){


    return(
      <div className={style.Nav}>
   
         <h2 className={style.hometitle}>VIDEOGAMES</h2> 
         
         <Link to ='/home'>
          <button className={style.button}>Home</button>
         </Link>   
         <Link to ='/Favourites'>
          <button className={style.button}>Favourites</button>
        </Link>
        <Link to ='/creategame'>
          <button className={style.button}>Create game</button>
        </Link>   
 
      </div>
    )
} 