import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import AlertMsg from "./components/AlertMsg";
import Error from "./components/Error";

function App() {
  // const fetchData = async () => {
  //   const response = await fetch("https://cloud.iexapis.com/stable/stock/aapl/quote?token={}");
  //   const data = await response.json();
  //   console.log(data);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);
  return (
    <Router>
      <div className="App">
        <Link to="/quote">Quote</Link>
      </div>
      <Switch>
        <Route exact path="/quote">
          <div>Quote Component</div>
        </Route>
        <Route exact path="/alert">
          <AlertMsg />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
