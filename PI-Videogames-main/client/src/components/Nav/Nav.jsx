import { Link } from 'react-router-dom'
import style from'../Nav/Nav.module.css'
import image from '../../assets/menu.png'
export default function Nav(){
    
    const actualpage= window.location.pathname.slice(1)
    
    return(
      <div className={style.container}>
       
          

        <label htmlFor="check" className={style.menu}><img src={image} alt="" width={50} height={40}/></label>
         <h2 className={style.hometitle}>VIDEOGAMES</h2> 
         <input type="checkbox" className={style.check} name="" id="check" style={{display:'none'}} />

         <div className={style.Nav}>
        
            <Link to ='/home'>
          <button className={style.button}  style={actualpage.includes('home')?{color:'white'}:{color:'rgb(255, 0, 234)'}}>Home</button>
         </Link>   
         <Link to ='/Favourites'>
          <button className={style.button}  style={actualpage.includes('Favourites')?{color:'white'}:{color:'rgb(255, 0, 234)'}}>Favourites</button>
        </Link>
        <Link to ='/creategame'>
          <button className={style.button}  style={actualpage.includes('creategame')?{color:'white'}:{color:'rgb(255, 0, 234)'}}>Create game</button>
        </Link>   
        <Link to='/gamescreated'>
          <button className={style.button}  style={actualpage.includes('gamescreated')?{color:'white'}:{color:'rgb(255, 0, 234)'}}>Games created</button>
        </Link>
         </div>
      </div>
    )
} 