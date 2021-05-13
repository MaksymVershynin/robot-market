import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import "./App.css"

import Cart from './components/Cart'
import Robots from './components/Robots'
import Filter from './components/Filter'

import {setAllRobots_redux, setVisibleRobots_redux} from './redux/actions'

function App() {

  const [materialTypes, setMaterialTypes] = React.useState([])

  const allRobots = useSelector(state => state.robots.allRobots)
  const dispatch = useDispatch()

  React.useEffect(async ()=>{
    const res = await fetch("http://localhost:8000/api/robots")
    const json = await res.json();
    const robots = await json.data;

    //get dynamic list of all exsiting Material types of robots
    const materials = [];
    robots.forEach(element => !materials.includes(element.material) && materials.push(element.material));
    setMaterialTypes(materials)

    //set to each robot a ID
    const robotsWithID = robots.map((robot, index) =>{return {id: index, ...robot}})
    //setAllRobots(allRobots)
    dispatch(setAllRobots_redux(robotsWithID));
    //setRobotsToShow(allRobots)
    dispatch(setVisibleRobots_redux(robotsWithID))
  },[])

  return (
    <div className="App">
      <div className={"page_separator"}>

        <div className={"robots_content"}>
          <h1>Robot Market</h1>
          <Filter 
            allRobots = {allRobots}
            materialTypes={materialTypes}
          />
          <Robots />
        </div>
          
        <Cart />
        
      </div>
    </div>
  );
}

export default App;
