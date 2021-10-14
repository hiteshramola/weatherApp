import {
    Route,
    BrowserRouter as Router,
    Switch
} from "react-router-dom";

import Header from '../components/Header';
import Loader from '../components/Loader';
import { VariablesProvider } from "../context/Variables"
import Weather from '../components/Weather';

function Routes() {
    return (
        <VariablesProvider>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <div className="container">
                            <Header />
                            <Weather />
                            <Loader />
                        </div>
                    </Route>
                </Switch>
            </Router>
        </VariablesProvider>
    )
}

export default Routes;
