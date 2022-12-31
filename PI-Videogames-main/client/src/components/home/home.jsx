import { useState,useEffect } from "react";
import{useDispatch,useSelector} from 'react-redux'
import { getgamesbygenres, getgamescreated, getgamesordened, getvideogames } from "../../Redux/actions";
import Videogames from "../Videogames/Videogames";
import Paginado from "../paginado/Paginado";
import style from '../home/home.module.css'
import SortFilters from "../Sort filters/SortFIlters";
import Loader from "../loader/loader";
import Searchcomponent from "../searchcomponent/Searchcomponent";
import store from "../../Redux/store";
export default function Home (){

  const dispatch =useDispatch()///para despachar acciones 

    useEffect(()=>{                                
        dispatch(getvideogames())                 
    },[dispatch])
    const allvideogames= useSelector(state=>state.videogames) 
    const [actualPage,setActualpage]= useState(1)
    const [gamesxpag,setgamesxpage]=useState(15)
    const indiceultimojuego = actualPage * gamesxpag
    const indiceprimerjuego = indiceultimojuego -gamesxpag
    const juegosactuales = allvideogames.slice(indiceprimerjuego,indiceultimojuego)
                                                     
    const paginado = (pagenumber)=>{
      setActualpage(pagenumber) 
    }
    
    const gamescreated =(e)=> dispatch(getgamescreated(e.target.name)) 
    const handleChangeorderfilter=(e)=>dispatch(getgamesordened(e.target.value))
    const handlefiltebygenres=(e)=>{dispatch(getgamesbygenres(e.target.value));setActualpage(1)}
    const prev=()=> actualPage>1? setActualpage(actualPage-1):'';
    const next=(e)=> actualPage<e.target.value?setActualpage(actualPage+ 1):alert('No more page')
    
  return (
        <div className={style.Home}>  
             <div className={style.Paginate}>
              <section className={style.searchbar}>
                <Searchcomponent/>
              </section>
              
              <section className={style.paginatecontain}>
                 <Paginado 
                gamesxpag={gamesxpag}//20
                allVideogame ={allvideogames.length}//100
                paginado ={paginado}//setea el estado 
                prev={prev}
                next={next}
                currentpage={actualPage}
                />
              </section>
             
             </div>
                
             <div className={style.filters}>
                <SortFilters 
                  Ascendente='Ascendente'
                  Descendent='Descendente'
                  A_Z="A-Z"
                  Z_A='Z-A'
                  handleChangeorderfilter={handleChangeorderfilter}
                  gamescreated={gamescreated}
                  creados='creados'
                  todos='todos'
                  rating='rating'
                  handlefiltebygenres={handlefiltebygenres}
                />
             
              </div>
                
            <div className={style.cards}>
                {juegosactuales.length?juegosactuales.map((i,index)=>
                <Videogames
                key={index}
                name={i.name}
                image={i.image}
                id={i.id}
                platforms={i.platforms.join()}
                genres={i.id.toString().length<8?i.genres.join():i.genres.map(i=>i.name).join()}
                />
                )
                : <Loader/>
                } {/* inicialmente nuestra condicion dara false ya que en allvidegame
                                                                no hay nada entonces mostrar un boton que hace el dispatch y muestra los resultados */}
           
          
            </div>  
            {juegosactuales.length?<Paginado 
                gamesxpag={gamesxpag}//20
                allVideogame ={allvideogames.length}//100
                paginado ={paginado}//setea el estado 
                prev={prev}
                next={next}
                currentpage={actualPage}
                />:<></>}
        </div>
        
    )
}