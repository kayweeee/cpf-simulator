import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { OverallExercisesPage } from "./pages/OverallExercisesPage";
import {TestingPage} from "./pages/testingpage"
import { SchemesPage } from "./pages/SchemesPage";

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
                <Route path="/schemes">  
                    <SchemesPage />
                </Route>
            </Switch>
        </Router>
    )

}

export default App