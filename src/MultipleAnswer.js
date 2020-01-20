import React from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { generateWordsAPI, shuffle, countRightAnswers } from "./utils/helper";
import QuizDashBoard from "./quizDashBoard";
import { List, ListItem, ListItemText } from "@material-ui/core";

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
      answerRes: []
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
    console.log(quiz);
    let choices;
    if (
      !quiz.questions[idx].alternatives ||
      quiz.questions[idx].alternatives.length === 0
    ) {
      choices = generateWordsAPI(answer);
    } else if (quiz.questions[idx].alternatives.length === 2) {
      choices = shuffle([
        answer,
        quiz.questions[idx].alternatives[0].text,
        quiz.questions[idx].alternatives[1].text
      ]);
    }

    console.log(choices);
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
          this.setState({
            status: "finished",
            answerRes: countRightAnswers(res.data.answerFeedBack)
          });
        });
    }
    if (status === "finished") {
      return (
        <div>
          <Typography variant="h4">
            Du hade {this.state.answerRes} rätt
          </Typography>
          <Button onClick={() => window.location.reload()}>Spela igen</Button>
          <QuizDashBoard />
        </div>
      );
    }
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <List>
          <Typography>{currentQuestion.text}</Typography>
          {choices.length > 2
            ? choices.map(choice => {
                return (
                  <ListItem
                    button
                    key={choice}
                    onClick={() => this.handeClick(choice)}
                    color="primary"
                    data-cy="choice-button"
                  >
                    <ListItemText>{choice}</ListItemText>
                  </ListItem>
                );
              })
            : null}
        </List>
      </div>
    );
  }
}
