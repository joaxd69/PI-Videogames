import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getgamesbyname, localsearch } from "../../Redux/actions"
import style from '../searchcomponent/search.module.css'
export default function Searchcomponent({setPage,nogames}){
      const dispatch = useDispatch()
 
       const[names,setNames]= useState('')
       const [state,setState]=useState('')///auxiliar para que solo me aparezcan sugerencias de busqueda despues de 2 digitos
      const sugerencias=useSelector(state=>state.videogames)
    
      const handlechange=(e)=>!names?alert( 'Ingrese un titulo de juego'):dispatch(getgamesbyname(names))
      const cambio=(e)=>{
        sugerencias&&nogames(true)///la funcion la recibe por props en home,es para cuando no se encuentra resultados
        dispatch(localsearch(e.target.value));
        setNames(e.target.value);e.target.value.length>1?
        setState('games'):setState('');setPage(1)}
    
    
      return(
        <div className={style.searchcontain}>
          <input className={style.searchInput}  placeholder='Escriba un titulo' list="games" onChange={cambio} type='search' />{/* aqui modificamos el valor de names con el valor del input */}
          <datalist id={state}>
            {sugerencias&&sugerencias.map((i,key)=>
             <option key={key} value={i.name.toLowerCase()}/>
              )}
          </datalist>
          <Link to={!names?'/home':'results'}> {/* solo ingresara a la ruta si ponemos algo en el input */}
            <input  type="submit" className={style.searchButton} value='More results' onClick={handlechange} />{/* hara dispatch si se cumple la condicion de la funcion*/}
          </Link>
        </div>
    )
}

 