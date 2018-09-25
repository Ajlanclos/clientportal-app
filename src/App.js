// App Packages
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'
import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/Auth';

import 'jquery/dist/jquery.min.js'
import 'popper.js/dist/popper.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'font-awesome/css/font-awesome.css'
import './App.css';

// Components
import AppNavbar from './components/layout/AppNav';
import Dashboard from './components/layout/Dashboard';
import AddClient from './components/clients/AddClient';
import EditClient from './components/clients/EditClient';
import ClientDetails from './components/clients/ClientDetails';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Settings from "./components/user/Settings";
import ProjectList from "./components/projects/ProjectList";
import ProjectDetails from './components/projects/ProjectDetails';
import AddProject from './components/projects/AddProject';
import EditProject from './components/projects/EditProject';
import MakePaymentForm from './components/payments/MakePaymentForm'
import PaymentDetails from './components/payments/PaymentDetails'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <div className="container-fluid">
              <Switch>
                {/* Dashboard */}
                <Route exact path="/" component={UserIsAuthenticated(Dashboard)}/>

                {/* Auth/User Components */}
                <Route exact path="/login" component={UserIsNotAuthenticated(Login)} />
                <Route exact path="/register" component={UserIsNotAuthenticated(Register)} />
                <Route exact path="/settings" component={UserIsAuthenticated(Settings)} />

                {/* Client Components */}
                <Route exact path="/client/add" component={UserIsAuthenticated(AddClient)} />
                <Route exact path="/client/:id" component={UserIsAuthenticated(ClientDetails)} />
                <Route exact path="/client/edit/:id" component={UserIsAuthenticated(EditClient)} />

                {/* Project Components */}
                <Route exact path="/projects" component={UserIsAuthenticated(ProjectList)} />
                <Route exact path="/project/:id" component={UserIsAuthenticated(ProjectDetails)} />
                <Route exact path="/client/:id/project/add" key="client-project-add" component={UserIsAuthenticated(AddProject)} />
                <Route exact path="/project/add" key="project-add" component={UserIsAuthenticated(AddProject)} />
                <Route exact path="/project/edit/:id" component={UserIsAuthenticated(EditProject)} />

                {/* Payment Components */}
                <Route exact path="/payments/add" component={UserIsAuthenticated(MakePaymentForm)} />
                <Route exact path="/payment/:id" component={UserIsAuthenticated(PaymentDetails)} />
                
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
