import { useState } from 'react';
import Input from '../atom/Input'
import  validationSchema  from '../../utils/appValidation';
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { registerApp } from '../../store/action/registerAction'
import {Button} from '../atom/Button'


const Form = ()=> {
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);
    const [err, setErr] = useState(false);


    const submitData = async (data) => {
        if (!checked) {
            setErr(true);
            return;
        }

        try {
            const response = await dispatch(registerApp(data));
            console.log(response);
            if (response.status) {
                toast.success("App is registered Sucessfully");
            }
            else {
                toast.error("Error while registering the app");
            }
        }
        catch (err) {
            console.log(err);
            toast.err(err)
        }

    }
    const formik = useFormik({
        initialValues: {
            appName: "",
            url: "",
            timeInterval: "",
            validTill: "",
            acceptableHttpCode:""
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
            submitData({ ...values });
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} method="post">

            <Input
                onBlur={formik.handleBlur}
                change={formik.handleChange}
                value={formik.values.appName}
                label="App Name"
                type="text"
                name="appName"
                placeholder="Enter App Name"
                id="appName" />
            {formik.touched.appName && formik.errors.appName ? <div>{formik.errors.appName}</div> : null}
            <br/>
            <Input
                onBlur={formik.handleBlur}
                change={formik.handleChange}
                value={formik.values.url}
                label="URL"
                type="text"
                name="url"
                placeholder="Enter App URL"
                id="url" />
            {formik.touched.url && formik.errors.url ? <div>{formik.errors.url}</div> : null}
            <br/>
            <Input
                onBlur={formik.handleBlur}
                change={formik.handleChange}
                value={formik.values.timeInterval}
                label="Time Interval"
                type="text"
                name="timeInterval"
                placeholder="Enter Time Interval"
                id="timeInterval" />
            {formik.touched.timeInterval && formik.errors.timeInterval ? <div>{formik.errors.timeInterval}</div> : null}
           <br/>
            <Input
                onBlur={formik.handleBlur}
                change={formik.handleChange}
                value={formik.values.validTill}
                label="valid Till"
                type="date"
                name="validTill"
                placeholder="Enter Valid Till date"
                id="validTill" />
            {formik.touched.validTill && formik.errors.validTill ? <div>{formik.errors.validTill}</div> : null}
<br/>

            <Input
                onBlur={formik.handleBlur}
                change={formik.handleChange}
                value={formik.values.acceptableHttpCode}
                label="acceptable HTTP code"
                type="text"
                name="acceptable HTTP code"
                placeholder="Enter acceptable HTTP code"
                id="acceptableHttpCode" />
            {formik.touched.acceptableHttpCode && formik.errors.acceptableHttpCode ? <div>{formik.errors.acceptableHttpCode}</div> : null}

            <Button type="submit" title="Register" theme="primary" size="medium" style={{ fontSize: '17px' }} />

        </form>
    )

}

export default Form;