import React from "react";
import { useEffect,useState } from 'react'
import DateTimePicker from 'react-datetime-picker';
import { getAppData } from '../../store/action/registerAction'
import {
    TextField,
    FormControlLabel,
    Checkbox,
    FormLabel,
    FormControl,
    RadioGroup,
    Radio,
    InputLabel,
    Switch,
    Select,
    MenuItem,
    Button,
} from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    inputField: {
        width: "100%",
        margin: theme.spacing(1, 0),
    },
}));

const Form = (props) => {


    const classes = useStyles();
   const [products,setProduct] = useState([]); 
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
       getAppData().then((data) => {
            console.log("data of app", data);

        }
        );
    },[]);
  
    return (
        <div className="box">

            <div className="box-secondary">
                <form onSubmit={props.onSubmit}>
                    {/* 1) TextField */}
                    <TextField
                        style={{ width: '420px', height: '32px' }} 
                        placeholder="URL"
                        label="URL"
                        name="url"
                        variant="outlined"
                        
                        className={classes.inputField}
                    />
                    <br/>

                    {/* 2) TextField */}
                    <TextField
                        style={{ width: '420px' ,height:'32px' }} 
                        placeholder="Time Interval"
                        label="Time Interval"
                        name = "timeInterval"
                        variant="outlined"
                        
                        className={classes.inputField}
                    />
                    <br />

                    <TextField
                        style={{ width: '420px', height: '32px' }} 
                        placeholder="Success HTTP Status Code"
                        label="Success HTTP Status Code"
                        variant="outlined"
                        name= "successHttpCode"
                        fullWidth
                        className={classes.inputField}
                    />
                    <br />        

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        {/* 5) Date Picker */}
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            label="Valid Till Date"
                            name="validTillDate"
    
                            fullWidth
                        />

                        {/* 4) Time Picker */}
                        <KeyboardTimePicker
                            margin="normal"
                            label="Valid Till Time"
                            name = "validTillTime"
                            
                            fullWidth
                        />
                    </MuiPickersUtilsProvider>

                    {/* Radio Buttons */}
                    <FormControl name = "RequestSource" className={classes.inputField}>
                        <FormLabel>Request Source</FormLabel>
                        <RadioGroup row name="RequestSource">
                
                            <FormControlLabel value="backend" control={<Radio />} label="Backend" />
                            <FormControlLabel value="frontend" control={<Radio />} label="Frontend" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl name="applicationEnviroment" className={classes.inputField}>
                        <FormLabel>Application Enviroment</FormLabel>
                        <RadioGroup row name="applicationEnviroment">

                            <FormControlLabel value="development" control={<Radio />} label="Development" />
                            <FormControlLabel value="prod" control={<Radio />} label="Prod" />
                            <FormControlLabel value="qa" control={<Radio />} label="qa" />

                        </RadioGroup>
                    </FormControl>

                    {/* Select */}
                    <FormControl fullWidth className={classes.inputField}>
                        <InputLabel id="demo-simple-select-label" name = "appName">
                            Select Your App
                        </InputLabel>

                        <Select name = "appName">
                            <MenuItem value="">Choose Your App</MenuItem>
                            <MenuItem value="62cd565086414609ca15ea6c">LikeKaro</MenuItem>
                            <MenuItem value="62cd60332361c692cf7afd40">AppLock</MenuItem>
                            <MenuItem value="62cd606ccaf6d4e5e6722bfa">go Messenger</MenuItem>
                        </Select>
                    </FormControl>

                    {/*  Switch */}
                    

                    {/* Checkbox */}
                    <FormControlLabel
                        style={{ display: "block", marginBottom: 15 }}
                        control={<Checkbox />}
                        label="I aggree all terms and conditions"
                    />

                    <Button variant="contained" color="primary" type="submit">
                        create new account
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Form;