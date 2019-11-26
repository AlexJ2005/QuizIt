import React, { Component } from "react";
import axios from "axios";

import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { Redirect } from "react-router-dom";
import "./App.css";

export default class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      quiz: {},
      allAnswers: [],
      gotAnswerFeedBack: false,
      answerFeedBack: [],
      redirect: false
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://grim-dungeon-58618.herokuapp.com/quiz/${this.props.match.params.id}`
      )
      .then(response => {
        this.setState({ loading: false, quiz: response.data });
        let answersCopy = [...this.state.allAnswers];
        for (let i = 0; i < response.data.questions.length; i++) {
          answersCopy.push({ userAnswer: "" });
          this.setState({ allAnswers: answersCopy });
        }
      });
  }

  answerQuiz = e => {
    axios
      .post(`http://localhost:5000/quiz/answer/${this.props.match.params.id}`, {
        allAnswers: this.state.allAnswers,
        name: window.localStorage.getItem("id")
      })
      .then(response => {
        this.setState({
          gotAnswerFeedBack: true,
          answerFeedBack: response.data.answerFeedBack,
          redirect: true
        });
      });
  };

  handleChange = (e, index) => {
    let allAnswersCopy = [...this.state.allAnswers];
    allAnswersCopy[index] = { userAnswer: e.target.value };
    this.setState({ allAnswers: allAnswersCopy });
  };

  render() {
    let { quiz, redirect } = this.state;

    if (redirect === true) {
      return (
        <Redirect
          to={{
            pathname: "createQuiz/result",
            state: { answerFeedBack: this.state.answerFeedBack, quiz }
          }}
        />
      );
    }

    return (
      <div className="questions">
        <div>
          {this.state.loading ? (
            <p>loading...</p>
          ) : (
            <div>
              <Typography align="center" variant="h1" color="textSecondary">
                {quiz.name}
              </Typography>
              {quiz.questions.map((question, index) => {
                return (
                  <div key={index} className="questions-container">
                    <Typography variant="h6">{question.text}</Typography>
                    <br />
                    <TextField
                      label="Type your answer"
                      type="text"
                      onChange={e => this.handleChange(e, index)}
                    ></TextField>
                  </div>
                );
              })}
            </div>
          )}

          <Button color="primary" onClick={e => this.answerQuiz(e)}>
            Submit your answer
          </Button>
        </div>
      </div>
    );
  }
}
