import { Link } from "react-router-dom"
import style from '../Landing page/Landing.module.css'
export default function Landingpage(){
      return(
       <div className={style.landing}>
        <h1 className={style.title}>Welcome to my videogame app </h1>
             <p className={style.infotext}>App created by Joaquin Garcia, this app contains videogames information
               about most popular games, their platforms and their info,
               I hope you can find all about  your favourite games.
             </p>
     <Link to = '/home'>
          <button className={style.button}> Join to home page </button>  
        </Link>
       </div>
      )
}