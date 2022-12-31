import './App.css';
import Home from './components/home/home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landingpage from './components/Landing page/Landingpage';
import Game from './components/game/Game';
import Results from './components/search results/Results';
import Nav from './components/Nav/Nav';
import Creategame from './components/Creategame/Creategame';
import Searchcomponent from './components/searchcomponent/Searchcomponent';
import Errorpag from './components/Error page/Error';
import Favourites from './components/Favourites/Favourites';

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
     </div>
   
  </BrowserRouter>
   
  );
}

export default App;
