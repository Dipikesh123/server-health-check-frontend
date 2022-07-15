import React, { useEffect, useState } from "react";
// import Form from "../component/Form/Form"
import { getCronAppData } from "../store/action/registerAction"
import ViewForm from "../component/viewForm/ViewForm.js"
// import moment from "moment"
// import { Button } from "@material-ui/core"

const Dashboard = () => {
    console.log("asf");
    const [datas, setDatas] = useState(['']);
    useEffect(() => {
        async function data() {
            console.log("data");
            const result = await getCronAppData();
            console.log("result", result)
            setDatas(JSON.stringify(result));
            localStorage.removeItem("dashboard");
            localStorage.setItem("dashboard", JSON.stringify(result));
           
        }  
      data();
        
    }, [])


    console.log("dashboard data ", (datas));



    return ( 
    
        <table>
            <tbody>

                
                </tbody>
            </table>
        
    )
}


export default Dashboard