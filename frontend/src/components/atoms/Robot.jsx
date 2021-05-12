import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import "./Robot.css"
import { Alert, AlertTitle } from '@material-ui/lab';

import { setVisibleRobots_redux, setSelectedRobots_redux} from '../../redux/actions'
import {formatDate, deletedDublicates_array} from "../../services/calc"


const validation_robotsMax = (selectedRobotsToValidate) => {

    let arrayIDs = selectedRobotsToValidate.map(selectedRobot => selectedRobot.name);

    // counting unic ids
    const amountOfRobots = deletedDublicates_array(arrayIDs ? arrayIDs : []).length
    
    return !( amountOfRobots > 5 )
}



const Robot = ({ robot, index: key, isCart }) => {
    const dispatch = useDispatch()
    const selectedRobots = useSelector(state => state.robots.selectedRobots)
    const visibleRobots = useSelector(state => state.robots.visibleRobots)
    const allRobots = useSelector(state => state.robots.allRobots)

    const [isAlert, setAlert] = React.useState(false)
    const [isAlertCart, setAlertCart] = React.useState(false)

    const [selectedRobotDisabled, setSelectedDisabled] = React.useState(false)

    const addToCart = () => {        
        setAlert(false) 
        if( validation_robotsMax([{...robot}, ...selectedRobots]) ) {
            //add in Redux store the Robot item for "Cart"
            dispatch(setSelectedRobots_redux([{...robot}, ...selectedRobots]))

            //decrease "Stock" for chosen Robot to render relevant amount of the Robot Market
            dispatch(setVisibleRobots_redux(visibleRobots.map(visibleRobot => {
                if(visibleRobot.name === robot.name) visibleRobot.stock = visibleRobot.stock - 1 
                return visibleRobot
            })))
        } else 
            setAlert(true)    
    }

    const addRobotToCart = (currentRobot) => {

        const currentRobotID = currentRobot.id;
        const stock_curentRobot = allRobots[currentRobotID].stock;

        if(stock_curentRobot === 0 || stock_curentRobot < 0) {
            setSelectedDisabled(true)
            setAlertCart(true)
        } else addToCart()
        
        return null
    }

    const deleteFromCart = () => {
        //delete in Redux store the Robot item from "Cart"
        dispatch(setSelectedRobots_redux(selectedRobots.filter(selectedRobot => selectedRobot !== selectedRobots[key])))

        //increase "Stock" for chosen Robot to render relevant amount of the Robot Market
        dispatch(setVisibleRobots_redux(visibleRobots.map(visibleRobot => {
            if(visibleRobot.name === robot.name) visibleRobot.stock = visibleRobot.stock + 1 
            return visibleRobot
        })))
    }


    
    return (
        <div className={"robot"}>
            <img src={robot.image}/>
            <span>Name: {robot.name}</span>
            <span>Price: ฿{robot.price}</span>
            {!isCart && <span>Stock: {robot.stock}</span>}
            <span>Created date: {formatDate(robot.createdAt)}</span>
            <span>Material: {robot.material}</span>
            <span>Material: {robot.material}</span>
            
            {
                isCart ? <>
                        <button 
                            onClick={()=>addRobotToCart(robot)}
                            className={"delete_cart"}
                            disabled={selectedRobotDisabled}
                            >
                                One more this Robot
                        </button>     
                        <button 
                            onClick={deleteFromCart}
                            className={"delete_cart"}>
                                Delete from Cart
                        </button>
                    </>
                    :
                    <button 
                        onClick={addToCart} 
                        disabled={robot.stock === 0}
                        className={robot.stock === 0 ? "add_cart disabled" : "add_cart"}>
                            Add to Cart
                    </button>
            }
            {isAlert && (
                <Alert severity="error">
                    <AlertTitle>User can add up to 5 different robots to cart, but they can select as much as they want in the same type until it runs out of stoc</AlertTitle>
                    if user try to add <strong>more that 5 different robots</strong> then it should show an alert
                </Alert>
                )
            }
            {isAlertCart && (
                <Alert severity="error">
                    <AlertTitle>No more. Empty</AlertTitle>
                    "stock" value of `robot` item is 0 
                </Alert>
                )
            }
            
        </div>
    )
}
export default Robot