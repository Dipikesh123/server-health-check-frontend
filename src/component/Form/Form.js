import React, { useRef } from "react";
import { useEffect,useState } from 'react'
import DateTimePicker from 'react-datetime-picker';
import { getAppData, registerAction } from '../../store/action/registerAction'
import {
    TextField,
    FormControlLabel,
    Checkbox,
    FormLabel,
    FormControl,
    RadioGroup,
    Radio,
    InputLabel,
    Typography,
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
import { baseURL } from "../../utils/api";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    inputField: {
        width: "80%",
        margin: 20,
    },
    form: {
      backgroundColor:'#cbd3d3',
      width:'500px',
      padding:20,
      textAlign:'center',
      margin:'20px auto'
    },
    formMessage:{
      fontSize:16
    },
    success:{
      color:'green'
    },
    failure:{
      color:'red'
    }
}));

const Form = (props) => {

  const classes = useStyles();
  const [products,setProduct] = useState([]); 
  const [url, setUrl] = useState();
  const [timeInterval, setTimeInterval] = useState();
  const [successHttpCode, setSuccessHttpCode] = useState();
  const [requestSource, setRequestSource] = useState();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [applicationEnviroment, setApplicationEnviroment] = useState();
  const [appId, setAppId] = useState();
  const [apps, setApps] = useState([{key:'Select', value:''}]);
  const [tcCheck, setTcCheck] = useState();
  const [formMessage, setFormMessage] = useState();
  const [formMessageColor, setFormMessageColor] = useState('#');
  const feRef = useRef();
  const handleInputChange = (e, setChange) =>{
    setFormMessage('');    
    setChange(e.target.value);
  }

  const handleDateChange = (value, setChange) =>{
    setFormMessage('');      
    console.log(value, time.toISOString(), time.toLocaleTimeString());
    const time1 = new Date(time.getTime() + 150*60000);
    console.log(time,time1, time.toISOString());

    setChange(value);
  }

  const clearFormMessage = () => {
    setTimeout(()=> {
      setFormMessage('');
    },3000)
  }

    useEffect(() => {
      getAppData()
        .then((data) => data.data)
        .then((data) => data.data)
        .then((apps) => {                
        const appsData = apps.map((app) => ({value:app._id, key:app.appName}))        
        setApps(appsData);
      }
        );
    },[]);

    const handleSubmit = (e) => {
      e.preventDefault();
      if(!appId || !url || !timeInterval || !requestSource || !date || !time || !successHttpCode || !applicationEnviroment){
        setFormMessage('Please Fill All Fields');
        setFormMessageColor('failure');
        
        return;
      }
      if(!tcCheck){
        setFormMessage('Please Agree Terms and Conditions');
        setFormMessageColor('failure');
        return;
      }
      console.log(date.toISOString().split("T")[0]+"T"+time.toISOString().split("T")[1].slice(0,time.toISOString().split("T")[1].lastIndexOf('.')));
      const data = {
        "appId":appId,
        "url":url,
        "healthCheckTimeIntervalInMinute":timeInterval,
        "requestSource":requestSource,
        "validTill":date.toISOString().split("T")[0]+"T"+time.toISOString().split("T")[1].slice(0,time.toISOString().split("T")[1].lastIndexOf('.')),
        "successHttpCode":successHttpCode,
        "applicationEnviroment":applicationEnviroment
      };
      
      registerAction(data).then(res=> {
        console.log(res);
        if(res.data){
          setFormMessage(res.data.message);
          setFormMessageColor('success');
          clearFormMessage();
        }else{
          setFormMessageColor('failure');
          setFormMessage('Error While Sending the Request');
          clearFormMessage();
        }
      });
    }
  
    return (
        <div className="box">          
            <div className="box-secondary">
                <form className={classes.form} onSubmit={handleSubmit}>
                <Typography variant='h4'>Register App</Typography>

                    {/* 1) TextField */}
                    <TextField
                        style={{ width: '420px', height: '32px' }} 
                        placeholder="URL e.g. https://google.com"
                        label="URL"
                        name="url"
                        variant="outlined"                        
                        className={classes.inputField}
                        value={url}
                        onChange={e=>handleInputChange(e, setUrl)}
                    />
                    <br/>

                    {/* 2) TextField */}
                    <TextField
                        style={{ width: '420px' ,height:'32px' }} 
                        placeholder="Time Interval"
                        label="Time Interval"
                        name = "timeInterval"
                        variant="outlined"
                        value={timeInterval}
                        onChange={e=>handleInputChange(e, setTimeInterval)}
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
                        value={successHttpCode}
                        onChange={e=>handleInputChange(e, setSuccessHttpCode)}
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
                            itemRef={feRef}
                            value={date}
                            autoOk={true}
                            onChange={(e)=>handleDateChange(e, setDate)}
                            fullWidth
                            className={classes.inputField}
                            
                        />

                        {/* 4) Time Picker */}
                        <KeyboardTimePicker
                            margin="normal"
                            label="Valid Till Time"
                            name = "validTillTime"
                            value={time}
                            onChange={(e,v)=>handleDateChange(e, setTime)}
                            fullWidth
                            className={classes.inputField}
                        />
                    </MuiPickersUtilsProvider>

                    {/* Radio Buttons */}
                    <FormControl name = "RequestSource" className={classes.inputField}>
                        <FormLabel>Request Source</FormLabel>
                        <RadioGroup row name="RequestSource" 
                          value={requestSource}
                          onChange={e=>handleInputChange(e, setRequestSource)}>                
                            <FormControlLabel value="backend" control={<Radio />} label="Backend" />
                            <FormControlLabel value="frontend" control={<Radio />} label="Frontend" />
                        </RadioGroup>
                    </FormControl>

                    <FormControl name="applicationEnviroment" className={classes.inputField}>
                        <FormLabel>Application Enviroment</FormLabel>
                        <RadioGroup row name="applicationEnviroment" 
                          value={applicationEnviroment}
                          onChange={e=>handleInputChange(e, setApplicationEnviroment)}>

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

                        <Select name = "appName" 
                          value={appId}
                          onChange={e=>handleInputChange(e, setAppId)}>
                            {apps.map(app => <MenuItem value={app.value}>{app.key}</MenuItem>)}
                        </Select>
                    </FormControl>

                    {/*  Switch */}
                    

                    {/* Checkbox */}
                    <FormControlLabel
                      value={tcCheck}
                      onChange={(e)=>{setTcCheck(e.target.checked)}}
                        style={{ display: "block", marginBottom: 15 }}
                        control={<Checkbox />}
                        label="I agree all terms and conditions"
                    />
                    <Typography variant="h6" className={clsx(classes.formMessage, formMessageColor==='success'?classes.success:classes.failure)}>{formMessage}</Typography>
                    <Button variant="contained" color="primary" type="submit">
                        create new account
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Form;