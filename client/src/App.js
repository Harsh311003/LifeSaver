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
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <SocketProvider>
          <DriverProvider>
            <Route exact path="/driverdashboard" component={DriverDashboard} />
            <Route exact path="/driverlogin" component={DriverLogin} />
          </DriverProvider>
          <UserProvider>
            <Route exact path="/userdashboard" component={UserDashboard} />
          </UserProvider>
        </SocketProvider>
      </Switch>
    </Router>
  );
}

export default App;
