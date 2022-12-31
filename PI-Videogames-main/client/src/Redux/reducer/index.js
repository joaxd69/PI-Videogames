import { CREATED_GAMES, GET_GAMESBYID, GET_GAMES_BY_NAME,
  GET_GAMES_CREATED, GET_GENRES, GET_VIDEOGAMES,
  GET_VIDEOGAMES_ORDENED,GET_GAMES_BY_GENRES, GET_FAVOURITES, DELETE_FAVOURITES, CLEAR_AN_STATE} from "../actions";


const initialState = {///seteamos nuestros estados iniciales 
videogames: [],
all_videogames: [],
videogame_id: [],
videogames_name: [],
videogame_genres: [],
games_created:[],
favourites:[]
}; 
                                                   
export default function reducer(state=initialState,action){//funcion reducer toma el estado inicial,anterior,y las acciones y devuelve un nuevo estado
switch (action.type) {
 case GET_VIDEOGAMES:

  return{
     ...state,
     videogames:action.payload,
     all_videogames:action.payload,
     games_created:action.payload.slice(0,-100)//el paginado trae los 100 primeros juegos de la api luego despues de 100 son los creados
     
  }
  case GET_GAMESBYID :
   return{
     ...state,
     videogame_id: action.payload
   }
   case GET_VIDEOGAMES_ORDENED:
     const allvideogames= state.videogames
     const creado=state.games_created
     const gamescreated = action.payload==='Ascendente'?[].concat(creado).sort((a,b)=>a.rating - b.rating)://     
                         action.payload==='Descendente'?[].concat(creado).sort((a,b)=>b.rating - a.rating):            
                         action.payload==="A-Z"?[].concat(creado).sort((a,b)=>a.name > b.name?1:-1):            
                         action.payload==="Z-A"?[].concat(creado).sort((a,b)=>a.name < b.name?1:-1):            
                         state.games_created


                           ///concat es para que no me cambie el estado principal(state.videogames) para que solo actue sobre la constante
                           //el cambio lo hago despues del return

      const ordenedgames = action.payload==='null'?state.all_videogames:
                           action.payload==='Ascendente'?[].concat(allvideogames).sort((a,b)=>a.rating - b.rating):            
                           action.payload==='Descendente'?[].concat(allvideogames).sort((a,b)=>b.rating - a.rating):            
                           action.payload==="A-Z"?[].concat(allvideogames).sort((a,b)=>a.name > b.name?1:-1):            
                           action.payload==="Z-A"?[].concat(allvideogames).sort((a,b)=>a.name < b.name?1:-1):            
                            state.all_videogames
     return{
       ...state,
       videogames:ordenedgames,///una vez cambiado el orden renovamos el estado de videogames
       games_created:gamescreated
     }
   case GET_GAMES_BY_NAME:
     return{
       ...state,
       videogames_name:action.payload
     }
   case GET_GENRES:
     return{
       ...state,
       videogame_genres:action.payload
     }
   case CREATED_GAMES:///para cuando creo el juego
     return{
       ...state,
     }
   case GET_GAMES_CREATED:
     const creados= action.payload==='creados' ? state.games_created : state.all_videogames
     ///cuando el boton con el valor 'creados' se aprete hara lo siguiente,obtendra los juegos creados si no trae todos
     return{
     ...state,
     videogames:creados//estado global que antes renderizaba todo los juegos en este caso tendra solo los juegos creados
     }
   case GET_GAMES_BY_GENRES:
     const allvideogamees = state.all_videogames
     
     const gamesfilteredbygenres = action.payload !=='null'?allvideogamees.filter(i=>i.genres.includes(action.payload))
                                     :state.all_videogames            ///teoricamente filtrara lo que pasemos por payload
    return{
       ...state,
       videogames:gamesfilteredbygenres

     }
     
   case GET_FAVOURITES:
         const favourites=state.favourites
          
          const newfavourite= !favourites.filter(i=>i.name===action.payload.name).length?[...state.favourites,action.payload]:state.favourites
         const alerts=!favourites.filter(i=>i.name===action.payload.name).length?alert('games added to favourites'):alert('this games already exist in favourites')
     return{
      ...state,
     favourites:newfavourite
     }
    
   case DELETE_FAVOURITES:
    const game=state.favourites
    const deletegame= game.filter(i=>i.name !== action.payload)
    return{
      ...state,
      favourites:deletegame
    }
   case CLEAR_AN_STATE:
        
    return{
      ...state,
      [action.payload]:[]
    }
  default:
     return state
}

}