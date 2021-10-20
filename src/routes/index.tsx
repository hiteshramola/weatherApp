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
            <div className="container">
                <Router>
                    <Switch>
                        <Route exact path={["/weatherapp/:cityName"]}>
                            <Header />
                            <Weather />
                        </Route>
                        <Route exact path={["/weatherapp"]}>
                            <Header />
                            <Weather />
                        </Route>
                    </Switch>
                </Router>
                <Loader />
            </div>
        </VariablesProvider>
    )
}
export default Routes;
