import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import "./Robot.css"
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/icons/SaveAlt';

import { setVisibleRobots_redux, setSelectedRobots_redux} from '../../redux/actions'
import {formatDate, deletedDublicates_array} from "../../services/calc"

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    modalButton : {
        float:"right",
        marginTop: "20px"
    },
    dialog: {
        padding:"25px 25px 15px 25px"
    }
  }));


const validation_robotsMax = (selectedRobotsToValidate) => {

    let arrayIDs = selectedRobotsToValidate.map(selectedRobot => selectedRobot.name);

    // counting unic ids
    const amountOfRobots = deletedDublicates_array(arrayIDs ? arrayIDs : []).length
    
    return !( amountOfRobots > 5 )
}



const Robot = ({ robot, index: key, isCart }) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const selectedRobots = useSelector(state => state.robots.selectedRobots)
    const visibleRobots = useSelector(state => state.robots.visibleRobots)
    const allRobots = useSelector(state => state.robots.allRobots)

    const currentRobotID = robot.id;
    const stock_curentRobot = allRobots[currentRobotID].stock;

    const [isAlert, setAlert] = React.useState(false)

    const [selectedRobotDisabled, setSelectedDisabled] = React.useState(false)

    useEffect(()=>{
        if(stock_curentRobot === 0 || stock_curentRobot < 0) {
        setSelectedDisabled(true)}
        else setSelectedDisabled(false)
    },[stock_curentRobot])
    

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
                                onClick={addToCart}
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
                        <Button
                            onClick={addToCart}
                            disabled={robot.stock === 0}
                            variant="contained"
                            color={isAlert ? "secondary" : "primary"}
                            className={classes.button}
                            endIcon={<Icon>add</Icon>}
                        >
                            Add to Cart
                        </Button>
            }
          
                <Dialog open={isAlert}>
                    <Alert severity="warning" className={classes.dialog}>
                        <AlertTitle>User can add up to 5 different robots to cart, but they can select as much as they want in the same type until it runs out of stoc</AlertTitle>
                        if user try to add <strong>more that 5 different robots</strong> then it should show an alert<br/>
                        <Button variant="contained" size="small" className={classes.modalButton} onClick={()=>setAlert(false)}>
                            Got it
                        </Button>
                    </Alert>
                </Dialog>
            
        </div>
    )
}
export default Robot