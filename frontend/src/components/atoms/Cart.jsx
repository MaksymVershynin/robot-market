import React from "react"
import { useSelector } from 'react-redux'
import "../styles/Cart.css"

import Robot from "./Robot"

import {summElements_array} from "../../services/calc"

const Cart = () => {

    const selectedRobots = useSelector(state => state.robots.selectedRobots)
    
    return (
        <div className={"cart"}>
            <div className={"info"}>
                <h1>Cart</h1>
                <span>total amount: {selectedRobots.length}</span>
                <span>total price: ฿{summElements_array(selectedRobots.map(el => el.price)).toFixed(2)}</span>
            </div>
            
            <div className={"selectedRobots"}>
                {selectedRobots.map((robot, index) => 
                    <Robot 
                        robot = {robot}
                        index = {index}
                        isCart = {true}
                    />)
                }
            </div>
        </div>
    )
}

export default Cart;