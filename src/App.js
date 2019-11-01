import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import quizDashBoard from './quizDashBoard'
import Quiz from './Quiz';
import MainPage from './MainPage';
import createQuiz from './createQuiz';
import Result from './Result';
import Navbar from './Navbar';
import Ad from './Ad'

class App extends React.Component {



render(){
  return (
    <Router>
      <Switch>
        <div>
          <Navbar/>
          <Ad slot="2434444"/>
          <Route exact path="/" component={MainPage}/>
          <Route exact path='/quizDashBoard' component={quizDashBoard}/>
          <Route exact path='/quizDashBoard/:id' component={Quiz}/>
          <Route exact path="/createQuiz" component={createQuiz}/>
          <Route exact path="/createQuiz/result" component={Result}/>
        </div>
      </Switch>
    </Router>
  );
}
}

export default App;
