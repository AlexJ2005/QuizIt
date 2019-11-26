import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import QuizDashBoard from "./quizDashBoard";
import Quiz from "./Quiz";
import MainPage from "./MainPage";
import createQuiz from "./createQuiz";
import Result from "./Result";
import Navbar from "./Navbar";
import Ad from "./Ad";
import MultipleAnswer from "./MultipleAnswer";
import Mode from "./Mode";
import CreateUser from "./CreateUser";
import QuizResults from "./QuizResults";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <div>
            <Navbar />
            <Route
              exact
              path="/quizDashBoard/write/:id/result"
              component={QuizResults}
            />
            <Route exact path="/" component={MainPage} />
            <Route exact path="/quizDashBoard" component={QuizDashBoard} />
            <Route exact path="/quizDashBoard/mode/:id" component={Mode} />
            <Route
              exact
              path="/quizDashBoard/multipleAnswer/:id"
              component={MultipleAnswer}
            />
            <Route exact path="/createUser" component={CreateUser} />
            <Route exact path="/quizDashBoard/write/:id" component={Quiz} />
            <Route exact path="/createQuiz" component={createQuiz} />
            <Route exact path="/createQuiz/result" component={Result} />
          </div>
        </Switch>
      </Router>
    );
  }
}

export default App;
