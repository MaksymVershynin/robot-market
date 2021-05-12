import React from "react"
import { useSelector, useDispatch } from 'react-redux'

import "./styles/Filter.css"
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { setVisibleRobots_redux } from '../redux/actions'

const Filter = ({allRobots, materialTypes}) => {
    
    const dispatch = useDispatch();

    const handleChange = (event) => {
        const chosenType = event.target.value;
        dispatch(setVisibleRobots_redux(allRobots.filter(robot => robot.material === chosenType)));
    };

    return  <div className={"filter"}>
        <p>Filter</p>
        <FormControl >
            <InputLabel>Material type</InputLabel>
            <Select
                // here should be className to provide styles, but I keep inline style due to only one style - width
                style={{width: "120px"}}
                onChange={handleChange}
            >
                {materialTypes.map((type, index) => <MenuItem value={type} key = {index}>{type}</MenuItem> )}
            </Select>
        </FormControl>
    </div>    
}

export default Filter;