import React from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { generateWords } from "./utils/helper";
import QuizDashBoard from "./quizDashBoard";

export default class MultipleAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quiz: {},
      question: {},
      choices: [],
      status: "loading",
      currentQuestion: { idx: 0 },
      rightAnswers: 0
    };
    this.fetchQuiz();
  }

  fetchQuiz = () => {
    axios
      .get(
        `https://grim-dungeon-58618.herokuapp.com/quiz/${this.props.match.params.id}`
      )
      .then(res => {
        this.setState({ quiz: res.data, status: "loaded" });
        this.startQuestion();
      });
  };

  startQuestion = () => {
    //set set a random question
    let { quiz, currentQuestion } = this.state;
    const { idx } = currentQuestion;
    if (idx === quiz.questions.length) {
      return this.setState({ status: "completed" });
    }
    const { answer, text } = quiz.questions[idx];
    const choices = generateWords(answer);
    this.setState({
      choices,
      currentQuestion: { idx: idx + 1, answer, text }
    });
  };

  handeClick = choice => {
    if (choice === this.state.currentQuestion.answer) {
      this.setState({ rightAnswers: this.state.rightAnswers + 1 });
    }
    this.startQuestion();
  };

  render() {
    const { quiz, currentQuestion, status, choices, rightAnswers } = this.state;
    if (status === "loading") {
      return <div>...loading</div>;
    }
    if (status === "completed") {
      return (
        <div>
          <Typography variant="h4">
            du hade {rightAnswers} av {quiz.questions.length} rätt
          </Typography>
          <Button onClick={() => window.location.reload()}>Spela igen</Button>
          <QuizDashBoard />
        </div>
      );
    }
    return (
      <div>
        <Typography>{currentQuestion.text}</Typography>
        {choices.map(choice => {
          return (
            <Button
              key={choice}
              onClick={() => this.handeClick(choice)}
              color="primary"
              data-cy="choice-button"
            >
              {choice}
            </Button>
          );
        })}
      </div>
    );
  }
}
