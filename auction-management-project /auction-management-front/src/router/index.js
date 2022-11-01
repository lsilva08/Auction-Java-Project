import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Login from '../pages/login'
import HomeContainer from '../pages/home/container'
import PrivateRoute from '../components/privateRoute'


export default function RouterComponent() {
    return (
        <Router>
            <Switch >
                <Route path="/login">
                    <Login />
                </Route>
                <PrivateRoute path="/app">
                    <HomeContainer />
                </PrivateRoute>
                <Route path="*">
                    <Redirect
                        to={{
                            pathname: "/app",
                        }}
                    />
                </Route>
            </Switch>

        </Router>
    )
}
