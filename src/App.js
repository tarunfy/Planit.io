import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Booking from "./pages/Booking";
import { Switch, Route, Redirect } from "react-router-dom";
import BookingSuccessfull from "./pages/BookingSuccessfull";
import EventBookings from "./pages/EventBookings";

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) =>
            !currentUser ? <Home {...props} /> : <Redirect to="/dashboard" />
          }
        />
        <Route
          exact
          path="/dashboard"
          render={(props) =>
            currentUser ? <Dashboard {...props} /> : <Redirect to="/" />
          }
        />
        <Route exact path="/booking/:userId/:eventId" component={Booking} />
        <Route
          exact
          path="/booking/successfull"
          component={BookingSuccessfull}
        />

        <Route
          exact
          path="/bookings/:eventId"
          render={(props) =>
            currentUser ? <EventBookings {...props} /> : <Redirect to="/" />
          }
        />
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </>
  );
}

export default App;
