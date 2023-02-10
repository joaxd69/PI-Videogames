import style from  '../Sort filters/SortFilter.module.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGenres } from '../../Redux/actions'

export default function SortFilters({Ascendente,Descendente,handleChangeorderfilter,A_Z,Z_A,gamescreated,creados,todos,
                                       handlefiltebygenres}){
     const dispatch =useDispatch()
     useEffect(()=>{
      dispatch(getGenres())
     },[dispatch])
     const generos = useSelector(state=>state.videogame_genres)
   const [color,setColor]=useState('white')
   const violet = {color:'rgb(247, 0, 164)'}
   const white = {color:'white'}
    return (
    <div className= {style.contain}>
        
          <div className={style.Rating}>
            <span className={style.orden}>Order by rating</span>
            <select className={style.selects}  onChange={handleChangeorderfilter} >
                    <option value="null"> Ratings</option>
                    <option value='default'>Default</option>
                    <option value={Ascendente} >Ascendente</option>
                    <option value={Descendente} >Descendente</option>
            </select>
         </div>

         <div className={style.Nameorder}>
          <span className={style.orden}>Order by name</span>
           <select className={style.selects} name="alpnuh" onChange={handleChangeorderfilter}>
              <option value="null">names</option>
              <option value='default' >Default</option>
              <option value={A_Z}>A-Z</option>
              <option value={Z_A}>Z-A</option>
           </select>
         </div>

        <div className={style.Genres}> 

           <span className={style.orden}>Filter by genres</span>
           <select className={style.selects} onChange={handlefiltebygenres}>
            <option value="Genres">Genres</option>
            <option value='null'>All genres</option>
            {generos&&generos.map((i,key)=>
            <option  value={i} key={key}>{i}</option>
              )}
          </select>

        </div>
        <div className={style.buttonss}>
          <button className={style.buttons} onClick={gamescreated} onClickCapture={()=>setColor(false)}
            name={creados} style={color?violet:white} >Mostrar creados</button>
          <button className={style.buttons} onClick={gamescreated} onClickCapture={()=>setColor(true)}
           style={!color?violet:white} name={todos}>Todos</button>
       </div>

    </div>
    )
} 
