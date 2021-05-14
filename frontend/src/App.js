import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import "./App.css"

import { Button, Dialog } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import Cart from './components/Cart'
import Robots from './containers/Robots'
import Filter from './containers/Filter'

import {setAllRobots_redux, setVisibleRobots_redux} from './redux/actions'

function App() {

  const [materialTypes, setMaterialTypes] = React.useState([])
  const [alert, setAlert] = React.useState(false)
  const [isCartOpen, setCartOpen] = React.useState(true)


  const allRobots = useSelector(state => state.robots.allRobots)
  const dispatch = useDispatch()

  React.useEffect(async ()=>{
    setAlert(false)
    try{
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
    }
    catch{ setAlert(true)}
  },[])

  return (
    <div className="App">
      <div className={"page_separator"}>
        <div>
          <h1>Robot Market</h1>
          <button onClick={()=> setCartOpen(true)}>All Robots</button> 
          <button onClick={()=> setCartOpen(false)}>My Cart</button> 
        </div>
        {isCartOpen && (<>
          <div className={"robots_content"}>
            <Filter 
              allRobots = {allRobots}
              materialTypes={materialTypes}
            />
            <Robots />
          </div>

          <div className={"desktopCart"}>
            <Cart />
          </div>
        </>)}
        {!isCartOpen && <Cart />}

        
      </div>
      <Dialog open={alert}>
        <Alert severity="error">
          Something went wrong. Please try again later
          <Button variant="contained" size="small"  onClick={()=>setAlert(false)}>
              Got it
          </Button>
        </Alert>
      </Dialog>
    </div>
  );
}

export default App;
