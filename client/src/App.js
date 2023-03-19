import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Map from "./components/Map";
import Login from "./pages/Login";

import DriverDashboard from "./components/DriverDashboard";
import DriverLogin from "./components/DriverDashboard/DriverLogin";
import UserDashboard from "./components/UserDashboard";
import { SocketProvider } from "./Contexts/SocketContext";
import { DriverProvider } from "./Contexts/DriverContext";
import { UserProvider } from "./Contexts/UserContext";
import SignUp from "./pages/SignUp";
import AdminComp from "./AdminComp";
import PageNotFound from "./pages/PageNotFound";
import PrivateRoute from "./helper";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/admin" component={AdminComp} />
        <SocketProvider>
          <DriverProvider>
            <Route exact path="/driverdashboard" component={DriverDashboard} />
            <Route exact path="/driverlogin" component={DriverLogin} />
          </DriverProvider>
          <UserProvider>
            <PrivateRoute
              exact
              path="/userdashboard"
              component={UserDashboard}
            />
          </UserProvider>
        </SocketProvider>
        <Route path="/" component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;
