import React, { useState } from "react";
import Form from "../component/Form/Form"
import { registerAction } from "../store/action/registerAction"
import moment from "moment"
import { Button } from "@material-ui/core"
import { Link, useHistory } from "react-router-dom";
const AppPage = () => {
    const history = useHistory();
    const [err, setErr] = useState('');
    function onClick(e) {
        history.push('/dashboard')
    }
  
    // function handleValidation(e) {
    //     if (e.target.url === '') {
    //         setErr('please enter url');
    //     }
    //     if (e.target.timeInterval === '') {
    //         setErr('please enter health check time interval');
    //     }
    //     if (e.target.validTillDate === '') {
    //         setErr('please enter valid till date')
    //     }
    //     if (e.target.validTillTime === '') {
    //         setErr('please enter valid till date')
    //     }
    //     if (e.target.applicationEnviroment === '') {
    //         setErr('please enter application enviroment')
    //     }
    //     if (e.target.successHttpCode === '') {
    //         setErr('please enter success HTTP code');
    //     }

    //     if (err) {
    //         return false;
    //     }
    //     else {
    //         return true;
    //     }
    // }

    async function onSubmit(e) {
        e.preventDefault();
        // if (handleValidation(e)) {

        const { appName,url, RequestSource, timeInterval, validTillDate,
validTillTime,applicationEnviroment, successHttpCode
        } = e.target;
       
        const date = moment(validTillDate.value, validTillTime.value, 'ddd DD-MMM-YYYY, hh:mm A').toISOString();
        console.log("APP NAME", appName.value);

            const data = {
                appId: appName.value,
                requestSource: RequestSource.value,
                url:url.value
                , healthCheckTimeInterval: timeInterval.value
                , validTill: date,
                applicationEnviroment:applicationEnviroment.value,
                successHttpCode:successHttpCode.value
            }
            const registerData = await registerAction(data);
        // }
        console.log(registerData);
    }
    return (
        <>
        
                <Button style={{ color: 'blue', backgroundColor: 'black' }} onClick={onClick} > GO TO DASHBOARD</Button>
         
            <Form onSubmit={onSubmit} />
        </>
    );

}

export default AppPage