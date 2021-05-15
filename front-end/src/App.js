import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddShipment from "./components/AddShipment";
import Shipment from "./components/Shipment";
import ShipmentList from "./components/ShipmentList";

function App() {
  return (
    <Router>
      <div>
        <nav className='navbar navbar-expand navbar-dark bg-dark'>
          <a href='/shipments' className='navbar-brand'>
            CRUD Shipments
          </a>
          <div className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <Link to={"/shipments"} className='nav-link'>
                Shipments
              </Link>
            </li>
            <li className='nav-item'>
              <Link to={"/add"} className='nav-link'>
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className='container mt-3'>
          <Switch>
            <Route exact path={["/", "/shipments"]} component={ShipmentList} />
            <Route exact path='/add' component={AddShipment} />
            <Route path='/shipments/:id' component={Shipment} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
