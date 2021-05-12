import React from "react"
import { useSelector } from 'react-redux'

import Robot from "./atoms/Robot"
import "./styles/Robots.css"

const Robots = () => {

    const robotsToShow = useSelector(state => state.robots.visibleRobots)
    
    return <div className={"robots"}>
            {robotsToShow.map((robot, index) =>             
                <Robot 
                    robot = {robot}
                    key={index}
                />)
            }       
               
        </div>
}

export default Robots;