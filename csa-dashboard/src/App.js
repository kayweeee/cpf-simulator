import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { OverallExercisesPage } from "./pages/OverallExercisesPage";
import {TestingPage} from "./pages/testingpage"

// Routing
export const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>  
                    <HomePage />
                </Route>
                <Route path="/overallexercises">
                    <OverallExercisesPage/>
                </Route>
                <Route path="/testingpage">
                    <TestingPage/>
                </Route>
            </Switch>
        </Router>
    )

}

export default App