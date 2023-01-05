import './App.css';
import Home from './components/home/home';
import { BrowserRouter, Route } from 'react-router-dom';
import Landingpage from './components/Landing page/Landingpage';
import Game from './components/game/Game';
import Results from './components/search results/Results';
import Nav from './components/Nav/Nav';
import Creategame from './components/Creategame/Creategame';
import Favourites from './components/Favourites/Favourites';
import GamesCreated from './components/GamesCreated/GamesCreated';
import EditGame from './components/EditGame/EditGame'
import axios from 'axios'
axios.defaults.baseURL ='http://localhost:3001/';
function App() {
  return (
  <BrowserRouter>
   
    
     <div className="App">    
      
      <Route path='/' render={()=>window.location.pathname!=='/'?<Nav/>:null}/>
      <Route exact path='/'eleme component={Landingpage}/>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/results'component={Results}/>
      <Route exact path='/Favourites' component={Favourites}/>
      <Route path='/details' component={Game}/>
      <Route exact path='/creategame' component={Creategame}/>
      <Route exact path='/gamescreated' component = {GamesCreated}/>
      <Route  path='/editgame' component={EditGame}/>
     </div>
   
  </BrowserRouter>
   
  );
}

export default App;
