import * as yup from 'yup';

const appValidationSchema = yup.object({
    appName: yup
        .string("Enter your Name")
        .min(3, "Too Short!")
        .max(50, "Too Long!")
        .required("Your Name is required"),
    url: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    timeInterval: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    validTill: yup
        .date.required('Date is required'),
    acceptableHttpCode: yup.string('Enter acceptable HTTP code').
        min(1, 'Status Code should be minimum 1 character length ').
        max(3, 'Status Code should be minimum 3 character length').
        required('Acceptable HTTP code is required'),
});


export default appValidationSchema;