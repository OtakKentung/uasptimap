import './App.css';
import Map from './Map';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import AboutUs from './pages/AboutUs/AboutUs';
import Home from './pages/Home/Home';
import Map1 from './pages/Map1/Map1';
import Map2 from './pages/Map2/Map2';
import Map3 from './pages/Map3/Map3';
import Map4 from './pages/Map4/Map4';
import Map5 from './pages/Map5/Map5';
import Navbar from './Components/Navbar/Navbar';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={
          <div className="App" id="MapEl">
            <Map />
          </div>}>
        </Route>
        <Route path="/aboutus" exact element={<AboutUs />}></Route>
        <Route path="/map1" exact element={<Map1 />}></Route>
        <Route path="/map2" exact element={
          <div className="App" id="viewDiv">
            <Map2 />
          </div>}></Route>
        <Route path="/map3" exact element={
          <div className="App" id="MapEl">
            <Map3 />
          </div>}>
        </Route>
        <Route path="/map4" exact element={
          <div className="App" id="MapEl">
            <Map4 />
          </div>}>
        </Route>
        <Route path="/map5" exact element={
          <div className="App" id="MapEl">
            <Map5 />
          </div>}>
        </Route>
      </Routes>
    </Router >
  );
}

export default App;
