import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { clearanstate, deleteFavourites } from "../../Redux/actions"
import style from '../Favourites/Favourites.module.css'


export default function Favourites (){
     const dispatch = useDispatch()
     const favourites=useSelector(state=>state.favourites)
     const handleDelete=(e)=>{dispatch(deleteFavourites(e.target.value));alert('Game deleted')}
     const handleReset =(e)=>{e.preventDefault();dispatch(clearanstate('favourites'))}
     console.log(favourites)
    return (
        <div>
            <h1 className={style.text}>Favourites</h1>    
    
            <div className={favourites.length ?style.Cardsconteiner :''}>
                {favourites.length?favourites.map((i,key)=>
                  <div key={key}  className={style.Favouritecard}>
                    <button value={i.name} onClick={handleDelete} className={style.delete}>X</button>
                   <Link to ={`/details/${i.id}`}>
                    <h3 className={style.text}>{i.name}</h3>
                    </Link>
                    <img alt="img" src={i.image} width={100} height={100}/>
                  </div>):<h1 className={style.text}>Add cards in <Link to='/home'> Home </Link></h1>}
            </div>

            <span className={style.text}>you can delete all :</span>
            <button className={style.button} onClick={handleReset}>RESET</button>
            
        </div>
    )
}