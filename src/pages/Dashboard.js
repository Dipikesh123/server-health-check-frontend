import React, { useEffect, useState } from "react";
import { getCronAppData } from "../store/action/registerAction"
import ViewForm from "../component/Form/Form.js"


const Dashboard = () => {
    const [datas, setDatas] = useState(['']);
    useEffect(() => {
        async function data() {
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