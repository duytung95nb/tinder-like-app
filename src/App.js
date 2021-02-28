import './App.css';
import { Route, BrowserRouter as Router, NavLink, Switch, Redirect } from 'react-router-dom';
import Home from './Home/Home';
import Liked from './Liked/Liked';
import { useSelector } from 'react-redux';
import { House, Heart } from 'react-bootstrap-icons';
function App() {
  const { likedUsers } = useSelector((state) => state.liked);
  return (
    <Router>
      <div className="App-header">
        <ul className="nav nav-pills nav-fill">
          <li className="nav-item">
            <NavLink to="/home" className="nav-link"
              activeClassName="active">
              <House /> Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="liked" className="nav-link"
              activeClassName="active"><Heart/> Liked ({likedUsers.length})</NavLink>
          </li>
        </ul>
      </div>
      <div className="App-main">
        <Switch>
          <Route exact={true} path="/home" component={Home}>
          </Route>
          <Route exact={true} path="/liked" component={Liked}></Route>
          <Redirect from="/" to="home" />
        </Switch>      
      </div>
    </Router>
  );
}

export default App;
