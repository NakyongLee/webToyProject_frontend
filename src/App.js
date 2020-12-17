import './App.css';
import {BrowserRouter as Router, Route, Switch }from 'react-router-dom';
import ListDiaryComponent from './components2/ListDiaryComponent';
import HeaderComponent from './components2/HeaderComponent';
import FooterComponent from './components2/FooterComponent';
import CreateDiaryComponent from './components2/CreateDiaryComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';
import ViewDiaryComponent from './components2/ViewDiaryComponent'

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
          <div className="container">
            <Switch> 
              <Route path = "/diaries" component = {ListDiaryComponent}></Route>
              //step1
              <Route path = "/add-diary/:id" component = {CreateDiaryComponent}></Route>           
              <Route path = "/view-diary/:id" component = {ViewDiaryComponent}></Route>
            </Switch>
          </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
