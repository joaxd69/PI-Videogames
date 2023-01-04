import style from  '../Sort filters/SortFilter.module.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGenres } from '../../Redux/actions'

export default function SortFilters({Ascendente,Descendente,handleChangeorderfilter,A_Z,Z_A,gamescreated,creados,todos,
                                       handlefiltebygenres}){
     const dispatch =useDispatch()
     useEffect(()=>{
      dispatch(getGenres())
     },[dispatch])
     const generos = useSelector(state=>state.videogame_genres)
   
    return (
    <div className= {style.contain}>
        
          <div className={style.Rating}>
            <span className={style.orden}>Order by rating</span>
            <select className={style.selects}  onClick={handleChangeorderfilter} >
                    <option value="null"> Ratings</option>
                    <option value='default'>Default</option>
                    <option value={Ascendente} >Ascendente</option>
                    <option value={Descendente} >Descendente</option>
            </select>
         </div>

         <div className={style.Nameorder}>
          <span className={style.orden}>Order by name</span>
           <select className={style.selects} name="alpnuh" onClick={handleChangeorderfilter}>
              <option value="null">names</option>
              <option value='default' >Default</option>
              <option value={A_Z}>A-Z</option>
              <option value={Z_A}>Z-A</option>
           </select>
         </div>

        <div className={style.Genres}> 

           <span className={style.orden}>Filter by genres</span>
           <select className={style.selects} onClick={handlefiltebygenres}>
            <option value="Genres">Genres</option>
            <option value='null'>All genres</option>
            {generos&&generos.map((i,key)=>
            <option  value={i} key={key}>{i}</option>
              )}
          </select>

        </div>
        <div className={style.buttonss}>
          <button className={style.buttons} onClick={gamescreated} name={creados}>Mostrar creados</button>
          <button className={style.buttons} onClick={gamescreated}name={todos}>Todos</button>
       </div>

    </div>
    )
} 