import { useDispatch, useSelector } from "react-redux"
import { clearanstate } from "../../Redux/actions"

import Loader from "../loader/loader"
import Videogames from "../Videogames/Videogames"
import style from'../search results/Results.module.css'
import { Link } from "react-router-dom"
export default function Results() {
    
    const games= useSelector(state=>state.videogames_name)
    const dispatch = useDispatch()

    const handleClear= ()=>dispatch(clearanstate('videogames_name'))
      
 return (
    <div>      
      <div>
         <Link to = '/home'>
         <button className={style.button} onClick={handleClear}>←</button>

         </Link>
      </div>
        {games.length?games.map((i,index)=>
       <Videogames
       key={index}
       name={i.name}
       image={i.image}
       id={i.id}
       genres={i.id.toString().length<8?i.genres.join():i.genres.map(i=>i.name).join()}/>
       ):games.ERROR?<h1>Server say {games.ERROR}</h1>:<Loader/>}
     
       <button onClick={()=>console.log(games)}> ver estado</button>
    </div>

 )
}

       