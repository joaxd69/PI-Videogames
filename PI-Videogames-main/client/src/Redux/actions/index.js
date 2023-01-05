import axios from 'axios'
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_GAMESBYID= "GET_GAMESBYID";
export const GET_VIDEOGAMES_ORDENED = "GET_VIDEOGAMES_ORDENED";
export const GET_GAMES_BY_NAME= 'GET_GAMES_BY_NAME'
export const LOCAL_SEARCH='LOCAL_SEARCH'
export const GET_GENRES='GET_GENRES'
export const CREATED_GAMES=`CREATED_GAMES`
export const GET_GAMES_CREATED='GET_GAMES_CREATED'
export const GET_GAMES_BY_GENRES='GET_GAMES_BY_GENRES'
export const GET_FAVOURITES= 'GET_FAVOURITES'
export const DELETE_FAVOURITES='DELETE_FAVOURITES' 
export const CLEAR_AN_STATE='CLEAR_AN_STATE'
export const DELETE_GAME_CREATED='DELETE_GAME_CREATED'
export const UPDATE_GAME = 'UPDATE_GAME'
////para las actions primero declaramos las constantes que indican la accion a realizar , luego procedemos a realizar las 
//funciones que realicen las acciones
///en estas funciones es donde conectamos el backend/servidor con nuestro front end
 export const getvideogames= ()=>{///esta funcion nos traera de nuesro servidor, todos los juegos de la ruta videogames
    return async (dispatch)=>{
    const getvideogames= await axios('/videogames')
    return dispatch({
        type:GET_VIDEOGAMES,///describimos la accion
        payload: getvideogames.data///hacemos la accion y nos quedamos con lo que devuelva
    })
  }
    
}//exportamos esta funcion que realiza la accion para cambiar el estado y la usamos en el reducer

export const getgamesperid=(id)=>{
  return async (dispatch)=>{
    const getidgames= await axios(`/videogames/${id}`)
    return dispatch({
      type:GET_GAMESBYID,
      payload:getidgames.data
    })
  }
}
export const getgamesordened= (value)=>{
  return {
       type : GET_VIDEOGAMES_ORDENED,
       payload: value
  } 
}
export const localsearch =(name)=>{
    return{
      type:LOCAL_SEARCH,
      payload:name
    }
}
export const getgamesbyname=(name)=>{
  return async (dispatch)=>{
    try {
      const games= await axios.get(`/videogames/?name=${name}`)
      
     return dispatch({
      type:GET_GAMES_BY_NAME,
      payload:games.data
     })
    } catch (error) {
      return dispatch({
        type:GET_GAMES_BY_NAME,
        payload:error.response.data
       })
    }
  }
}

export const getGenres= ()=>{
   return async (dispatch)=>{
    const geners= await axios.get('/genres')
    return dispatch({
      type:GET_GENRES,
      payload:geners.data
    })
   }
}

export const Postform=(game)=>{
  return async(dispatch)=>{
    const url = await axios.post(`/videogames`,game)
    alert(`Server says:${url.data.msg}` )
    return dispatch({
      type:CREATED_GAMES,
    })
  }
}

export const getgamescreated=(value)=>{
  
    return {
      type:GET_GAMES_CREATED,
      payload:value
    }
  }

export const getgamesbygenres=(value)=>{
  return{
    type:GET_GAMES_BY_GENRES,
    payload:value
  }
}

export const getfavourites=(game)=>{
  return{
    type:GET_FAVOURITES,
    payload:game
  }
}

export const deleteFavourites=(game)=>{
  return{
    type:DELETE_FAVOURITES,
    payload:game
  }
}

export const clearanstate=(state)=>{
  return{
    type:CLEAR_AN_STATE,
    payload:state
  }
}
export const DeleteGamesCreated=(id)=>{
   return async (dispatch)=>{
    const deletegame = await axios.delete(`/videogames/${id}`)
    alert(deletegame.data.state)
    return dispatch({
      type:DELETE_GAME_CREATED,
      payload:id
    })
   }
}
export const EditGame=(id,game)=>{
  return async(dispatch)=>{
    const urlput= await axios.put(`/videogames/${id}`,game)
    console.log(urlput.headers)
    return dispatch({
      type:UPDATE_GAME,
      payload:{id,game}
    })
  }
}