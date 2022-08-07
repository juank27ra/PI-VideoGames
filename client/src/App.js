import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Landingpage from './components/Landingpage';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Switch>
        {/* <h1>Henry Videogames</h1> */}
        <Route exact path='/' component={Landingpage}/>
        <Route exact path='/home' component={Home}/>
      </Switch>
      
    </div>
    </BrowserRouter>
    
  );
}

export default App;
