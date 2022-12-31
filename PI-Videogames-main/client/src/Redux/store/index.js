import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk  from 'redux-thunk'
import reducer from '../reducer'
/*composeWithDevtools habilita la herramienta de depuracion de redux en el browser,permite inspeccionar
*applimidleware sirve para añadir midleware a  nuestra app que es una capa intermediA que se ejecuta entre la 
accion y el reducer,asi podemos manejar promesas sin modificar el codigo del reduce
thunk es un middleware, un thunk es una funcion que envuelve otra funcion para retrasar su evaluacion hasta que se cumplan
ciertas condiciones*/
const store = createStore(reducer,composeWithDevTools(),applyMiddleware(thunk))///creamos la store 

store.subscribe(()=>{///esto es para ver el stado de nuestra store ,cada vez que haya un estado nuevo veremos la info
    console.log(store.getState())
})

export default store