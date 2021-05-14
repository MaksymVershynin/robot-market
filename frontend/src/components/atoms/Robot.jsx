import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

import { Button, ButtonGroup, Dialog, InputLabel } from '@material-ui/core';

import Icon from '@material-ui/icons/SaveAlt';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

import { setVisibleRobots_redux, setSelectedRobots_redux} from '../../redux/actions'
import {formatDate, deletedDublicates_array} from "../../services/calc"

const useStyles = makeStyles((theme) => ({
    robot: {
        display: "flex",
        flexDirection: "column",
        margin: "0 20px",
        "& label": {
            marginTop: "10px"
        },
        "& span" :{
            // margin: "5px 0 10px",
            //fontSize: "15px"
        }
    },
    stoc: {
        fontSize:"20px"
    },
    button: {
      margin: theme.spacing(1),
      width: "fit-content",
      fontSize: "12px!important"
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
    const unicID_selectedRobots = deletedDublicates_array(arrayIDs ? arrayIDs : []);
    const amountOfRobots = unicID_selectedRobots.length;

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
        <div className={classes.robot}>
            <img src={robot.image}/>
            
            <InputLabel htmlFor="name"><u>Name</u></InputLabel>
            <span id = {'name'} >{robot.name}</span>
            <InputLabel htmlFor="name"><u>Price</u></InputLabel>
            <span id = {'price'} >฿{robot.price}</span>
            {!isCart && <InputLabel htmlFor="stock"><u>Stock</u></InputLabel>}
            {!isCart && <span id={"stock"} className={classes.stoc}>{robot.stock}</span>}
            <InputLabel htmlFor="createdAt"><u>Created date</u></InputLabel>
            <span id = {'createdAt'} >{formatDate(robot.createdAt)}</span>
            <InputLabel htmlFor="material"><u>Material</u></InputLabel>
            <span id = {'material'} >{robot.material}</span>

            
            {
                isCart ? <>
                    <ButtonGroup disableElevation variant="contained" color="primary">
                            <Button 
                                variant="contained"
                                onClick={addToCart}
                                className={classes.button}
                                disabled={selectedRobotDisabled}
                                endIcon={<AddCircleTwoToneIcon />}
                            >
                                One more
                            </Button>
                            <Button 
                                color="secondary"
                                onClick={deleteFromCart}
                                className={classes.button}
                                startIcon={<DeleteForeverOutlinedIcon />}
                            >
                                Delete
                            </Button>
                        </ButtonGroup>
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