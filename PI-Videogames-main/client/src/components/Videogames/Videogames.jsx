import { Link } from 'react-router-dom'
import style from'../Videogames/videogames.module.css'
export default function Videogames({name,image,platforms,id,genres}){

   
    return(
       <div className={style.div}>
        <Link to={`/details/${id} ` }>
          <h2 className={style.title}>{name}</h2>  
        </Link>
        <img src={image} className={style.img} alt="games" width={180} height={180} /><br/>
        <span className={style.plat}>Genres:{genres}</span>
       </div>
    )
}