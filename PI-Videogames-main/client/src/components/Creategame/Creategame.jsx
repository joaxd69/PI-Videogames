import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getGenres, Postform } from '../../Redux/actions'
import style from '../Creategame/Creategame.module.css'

export default function Creategame(){
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(()=>{
        dispatch(getGenres())
    },[dispatch])  

    const Genres= useSelector(state=>state.videogame_genres)

    const [inputs,setInputs]=useState({
        name:'',
        released:'',
        description:'',
        image:'',
        rating:'',
        genres:[],
        platforms:[]
    })
    
   const handleReset =()=>setInputs({
    name:'',
    released:'',
    description:'',
    image:'',
    rating:'',
    genres:[],
    platforms:[]
   })
 
    const platforms = [
        "Linux",
        "PC",
        "Xbox One",
        "PlayStation 4",
        "Xbox 360",
        "PlayStation 3",
        "macOS",
        "Nintendo Switch",
        "Xbox Series S/X",
        "PlayStation 5",
        "Wii U",
        "Nintendo 3DS",
        "iOS",
        "PS Vite",
        "Android",
        "Xbox",
        "PlayStation 2",
        "Dreamcast",
        "Web",
    ] 

    const [errors,setErrors]= useState({})

    const validator =(input)=>{
    const errors={}
    if (!input.name)errors.name = 'Complete el campo de nombres'
    if (!input.released) errors.released='Ingrese una fecha'
    if (!Date.parse(input.released)||input.released.length!==10 ||input.released.includes('/'))errors.released='Formato de fecha no valido'
    if(!input.image) errors.image='Ingrese una url de imagen'
    if(!input.image.includes('https://'&&'.com')) errors.image='Ingrese una url correcta'
    if(isNaN(input.rating)||input.rating.includes(' ')) errors.rating='Only numbers'
    if (!input.rating|| input.rating<0 ||input.rating>5 ) errors.rating='ingrese un numero de rating de 0 a 5'
    if(!input.description) errors.description= 'ingrese una descripcion' 
    return errors
}
    const handleChange=(e)=>setInputs({
             ...inputs,
            [e.target.name]:e.target.value
        },
       console.log(inputs),

       setErrors(validator({
        ...inputs,
        [e.target.name]:e.target.value
       }))
    )

    const handleOptionsGeners = (e)=>setInputs({
            ...inputs,
            genres:[...inputs.genres,e.target.value]
        },
        setErrors(validator({
            ...inputs,
            [e.target.name]:e.target.value
           })),
        )
    
    const handleOptionsPlatforms= (e)=>setInputs({
        ...inputs,
        platforms:[...inputs.platforms,e.target.value]
        })
  
    const handleSubmit = (e)=>{

        e.preventDefault();
        if(!inputs.name || !inputs.genres.length ||!inputs.platforms.length ||!inputs.image) return alert('Revisa los campos obligatorios');
        else return dispatch(Postform(inputs))
    }
    const handleGenerPlatformreset=(e)=>setInputs({...inputs,[e.target.name]:[]})

   
    return(
        <div className={style.contain}>
          <form action="" onSubmit={(e)=>{console.log('hola');e.preventDefault()}} className={style.form}>
             
              <h2 className={style.title}> Create videogame:</h2>
               
              <label className={style.nombres}>* Name:</label>
               {errors.name&&<span className={style.errors}>{errors.name}</span>}
              <input className={style.inputs} name='name' type="text" value={inputs.name} onChange={handleChange} /> 

              <label className={style.nombres}>* Released:</label>
               {errors.released&&<span className={style.errors}>{errors.released}</span>} 
              <input placeholder='ex:01-06-1999' className={style.inputs} name='released' type="text" value={inputs.released} onChange={handleChange}/>

              <label className={style.nombres}>Description:</label>
              {errors.description&&<span className={style.errors}>{errors.description}</span>} 
              <textarea className={style.Textarea}  name='description' cols="30" rows="10"
               type="text" value={inputs.description} onChange={handleChange} /> 

              <label className={style.nombres}>Image:</label>
              {errors.image&&<span className={style.errors}>{errors.image}</span>}
              <input className={style.inputs} name='image' type="text" value={inputs.image} onChange={handleChange}/> 

              <label className={style.nombres}>*Rating:</label>
              {errors.rating&&<span className={style.errors}>{errors.rating}</span>}
              <input className={style.inputs} name='rating'  value={inputs.rating} onChange={handleChange} /> 

              <label  className={style.nombres}>*Genres:</label>
              <select className={style.selects} name='genres' onChange={handleOptionsGeners}>
                {Genres.length?Genres.map((i,key)=>
                <option key={key} value={i}>{i}</option>
                ):<></>}
              </select > 
                {!inputs.genres.length&&<span className={style.errors}>Inserte genero</span>}

              <span className={style.spans}>{inputs.genres.join()}</span>
              <button className={style.buttons} type='button' name='genres' onClick={handleGenerPlatformreset}>Delete genres</button>
             
              <label className={style.nombres}>* Platforms:</label> 
                  <select className={style.selects} onChange={handleOptionsPlatforms}>
                    {platforms.map((i,key)=>
                     <option key={key} value={i}>{i}</option>)}
                  </select>
                 {!inputs.platforms.length && <span className={style.errors}>Select plataforms</span>}
                 
              <button className={style.buttons} type='button' name='platforms' onClick={handleGenerPlatformreset}>Delete platforms</button>
              <span className={style.spans}>{inputs.platforms.join()}</span><br />
              <button onClick={handleReset} className={style.submit}>Reset</button>
              <input type="submit" className={style.submit} onClick={handleSubmit} value='Create videogame'/>

          </form>
        </div>
    )
}