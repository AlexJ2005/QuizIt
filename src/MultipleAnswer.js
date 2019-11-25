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
      answers: [],
      gotRes: false
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

  startQuestion = async () => {
    //set set a random question
    let { quiz, currentQuestion } = this.state;
    const { idx } = currentQuestion;
    if (idx === quiz.questions.length) {
      return this.setState({ status: "completed" });
    }
    const { answer, text } = quiz.questions[idx];
    const choices = await generateWords(answer);
    this.setState({
      choices,
      currentQuestion: { idx: idx + 1, answer, text }
    });
  };

  handeClick = choice => {
    let answersCopy = [...this.state.answers];
    answersCopy.push({ userAnswer: choice });
    this.setState({ answers: answersCopy });
    this.startQuestion();
  };

  returnScore = res => {
    return <Typography variant="h4">{res.data.rightAnswers}</Typography>;
  };

  render() {
    const { currentQuestion, status, choices } = this.state;
    if (status === "loading") {
      return <div>...loading</div>;
    }
    if (status === "completed") {
      axios
        .post(
          `https://grim-dungeon-58618.herokuapp.com/quiz/answer/${this.props.match.params.id}`,
          {
            allAnswers: this.state.answers,
            name: window.localStorage.getItem("id")
          }
        )
        .then(res => {
          return this.returnScore(res);
        });

      return (
        <div>
          <Button onClick={() => window.location.reload()}>Spela igen</Button>
          <QuizDashBoard />
        </div>
      );
    }
    return (
      <div>
        <Typography>{currentQuestion.text}</Typography>
        {choices.length > 2
          ? choices.map(choice => {
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
            })
          : null}
      </div>
    );
  }
}
