
import './App.css';
import { CssBaseline } from "@material-ui/core";
import AppPage from "./pages/AppPage";
// import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Form  from "../src/component/Form/Form";
import Dashboard from "./pages/Dashboard";
import history from "./history";


function App() {
  return (
    // <Router>
    //   <div className="App">
    //     <Switch>
    //       <Route exact path="/" component={AppPage} />
    //       <Route exact path="/dashboard" component={Dashboard} />
    //       {/* <Route path="/:others" component={NoPageFound} /> */}

    //     </Switch>
    //   </div>
    // </Router>
 
      <Form />


 

  );
}

export default App;
