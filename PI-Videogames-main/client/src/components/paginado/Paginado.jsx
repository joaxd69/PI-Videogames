import style from '../paginado/paginado.module.css'
import Searchcomponent from '../searchcomponent/Searchcomponent'
                                     //100        15
export default function Paginado ({allVideogame,gamesxpag,paginado,prev,next,currentpage}){

    const pagenumber = []
                             //100          20   = 5
    for (let i=0;i<Math.ceil(allVideogame/gamesxpag);i++){
        pagenumber.push(i+1)
    } //// retornar pagenumber =[1,2,3,4,5]
  return(
    <div className={style.contain}>
         
        <nav className={style.nav}>
          <ul className={style.paginado}>
             <li><button className={style.button} onClick={prev}>prev</button></li>
            {pagenumber&&pagenumber.map((number,index)=>
             <li key={index}> 
              < button className={style.button}onClick={()=>paginado(number)}>{number}</button>     
             </li> 
            )}
            <li><button className={style.button} value={pagenumber.length} onClick={next} >next</button></li>
         <span className= {style.currentpage}> You are in page :{currentpage}</span>
        </ul>
              
     </nav>
    </div>
      
        
 
  )
}
 