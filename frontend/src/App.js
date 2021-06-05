import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import MyPage from "./components/MyPage";
import NavBar from "./components/NavBar";

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route exact path="/">
                    <h1>Main</h1>
                </Route>
                <Route exact path="/MyPage">
                    <MyPage />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
