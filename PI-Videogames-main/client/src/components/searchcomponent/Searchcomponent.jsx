import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { getgamesbyname } from "../../Redux/actions"
import style from '../searchcomponent/search.module.css'
export default function Searchcomponent(){
      const dispatch = useDispatch()
 
       const[names,setNames]= useState('')
     
      const setname= (e)=>setNames(e.target.value)
      const handlechange=(e)=>!names?alert( 'Ingrese un titulo de juego'):dispatch(getgamesbyname(names))
    
    
      return(
        <div>
          <input className={style.searchInput}  placeholder='Escriba un titulo' list="games" onChange={setname} type='search' />{/* aqui modificamos el valor de names con el valor del input */}
          <Link to={!names?'/home':'results'}> {/* solo ingresara a la ruta si ponemos algo en el input */}
            <input type="submit" className={style.searchButton} value='Search' onClick={handlechange} />{/* hara dispatch si se cumple la condicion de la funcion*/}
          </Link>
        </div>
    )
}

 