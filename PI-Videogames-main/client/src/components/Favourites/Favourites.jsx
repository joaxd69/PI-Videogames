import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { deltefavourites } from "../../Redux/actions"


export default function (){
     const dispatch = useDispatch()
     const favourites=useSelector(state=>state.favourites)
     const handleDelete=(e)=>{dispatch(deltefavourites(e.target.value));alert('Game deleted')}
     
    return (
        <div>
            <h1>Favourites</h1>    
            <div >
                {favourites.length?favourites.map(i=>
                  <div>
                    <button value={i.name} onClick={handleDelete}>X</button>
                   <Link to ={`/game/${i.id}}`}>
                    <h3>{i.name}</h3>
                    </Link>
                    <img src={i.image} width={100} height={100}/>
                  </div>):<></>}
            </div>
            
        </div>
    )
}