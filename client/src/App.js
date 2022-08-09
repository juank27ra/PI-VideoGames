import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Landingpage from './components/Landingpage';
import Home from './components/Home';
import Gamecreate from './components/Gamecreate'
import Detail from './components/Detail';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Switch>
        <Route exact path='/' component={Landingpage}/>
        <Route exact path='/home' component={Home}/>
        <Route path = '/videogames' component={Gamecreate}/>
        <Route path ='/home/:id' component={Detail} />

      </Switch> 
    </div>
    </BrowserRouter>
    
  );
}

export default App;
