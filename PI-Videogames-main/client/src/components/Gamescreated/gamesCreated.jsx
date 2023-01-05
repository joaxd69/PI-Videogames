import { useDispatch, useSelector } from "react-redux"
import { DeleteGamesCreated } from "../../Redux/actions"
import Videogames from "../Videogames/Videogames"
import style from '../GamesCreated/GamesCreated.module.css'
import { Link } from "react-router-dom"
export default function GamesCreated (){

    const dispatch = useDispatch()
    
    const gamescreated=useSelector(state=>state.games_created)
    const handleDelete = (e)=>{
        if(window.confirm('Are you sure to delete this game created?')){
            dispatch(DeleteGamesCreated(e.target.value));
            // dispatch(getvideogames()) // opcion 1 para que se actualize el componente
        }else{}
    }
  
    return (
        <div>
            {gamescreated&&gamescreated.map((i,key)=>
             <div key={key} className={style.Cards}>
               <div >
                <button className={style.buttons} value={i.id} onClick={handleDelete}>Delete game</button>           
                <Link to ={`/editgame/${i.id}`}>
                  <button className={style.buttons}>Edit game</button>  
                </Link>
              </div> 
                <Videogames
                 id={i.id}
                  name={i.name}
                  image={i.image}
                />

             </div>
            )}
        </div>
    )
}