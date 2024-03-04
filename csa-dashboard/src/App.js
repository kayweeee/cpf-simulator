import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { OverallExercisesPage } from "./pages/OverallExercisesPage";

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
            </Switch>
        </Router>
    )

}

export default App