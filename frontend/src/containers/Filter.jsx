import React from "react"
import { useDispatch } from 'react-redux'
import "../components/styles/Filter.css"
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { setVisibleRobots_redux } from '../redux/actions'

const Filter = ({allRobots, materialTypes}) => {

    const dispatch = useDispatch();

    const handleChange = (event) => {
        const chosenType = event.target.value;
        chosenType !== "all" ? dispatch(setVisibleRobots_redux(allRobots.filter(robot => robot.material === chosenType))) : dispatch(setVisibleRobots_redux(allRobots))

    };

    return  <div className={"filter"}>
        <FormControl id ={"filterID"}>
            <InputLabel>Material type</InputLabel>
            <Select
                // here should be className to provide styles, but I keep inline style due to only one style - width
                //style={{width: "150px"}}
                onChange={handleChange}
            >
                <MenuItem value={"all"} key = {0}><strong>All materials</strong></MenuItem>
                {materialTypes.map((type, index) => <MenuItem value={type} key = {index + 1}>{type}</MenuItem> )}
            </Select>
        </FormControl>
    </div>    
}

export default Filter;