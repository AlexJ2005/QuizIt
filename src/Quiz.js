import React, { Component } from "react";
import axios from "axios";

import TextField from "@material-ui/core/TextField";
import { Button, Modal } from "@material-ui/core";
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
      answer: "",
      answerFeedBack: [],
      redirect: false,
      index: 0,
      showResult: false,
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://grim-dungeon-58618.herokuapp.com/quiz/${this.props.match.params.id}`
      )
      .then((response) => {
        this.setState({ loading: false, quiz: response.data });
      });
  }

  answerQuestion = (e) => {
    e.preventDefault();
    console.log(this.state.quiz.questions[this.state.index]);
    axios
      .post(
        `https://grim-dungeon-58618.herokuapp.com/quiz/answer/${this.props.match.params.id}/question`,
        {
          _id: this.state.quiz.questions[this.state.index]._id,
          answer: this.state.answer,
        }
      )
      .then((response) => {
        const feedBack = [...this.state.answerFeedBack];
        const data = response.data;
        console.log(data);
        feedBack.push(data);
        if (this.state.index + 1 === this.state.quiz.questions.length) {
          this.setState({
            redirect: true,
            answerFeedBack: feedBack,
            index: this.state.index + 1,
          });
        }
        this.setState({
          answerFeedBack: feedBack,
          showResult: true,
        });
      });
  };

  handleChange = (e) => {
    this.setState({ answer: e.target.value });
  };

  render() {
    let { quiz, redirect } = this.state;

    if (redirect === true) {
      return (
        <Redirect
          to={{
            pathname: "createQuiz/result",
            state: { answerFeedBack: this.state.answerFeedBack, quiz },
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
              <Typography variant="h4">
                {quiz.questions[this.state.index].text}
              </Typography>
              <div>
                <form style={{ display: "flex" }}>
                  <TextField
                    onChange={(e) => this.handleChange(e)}
                    placeholder="Enter your answer"
                    value={this.state.answer}
                    style={{ width: "70%" }}
                    type="text"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => this.answerQuestion(e)}
                    type="submit"
                  >
                    Submit your answer
                  </Button>
                </form>
              </div>
            </div>
          )}

          {this.state.showResult === false ? null : (
            <div>
              {this.state.answerFeedBack[this.state.index][
                this.state.quiz.questions[this.state.index].text
              ] === true ? (
                <Modal
                  open={this.state.showResult}
                  onClose={() => {
                    this.setState({
                      index: this.state.index + 1,
                      showResult: false,
                      answer: "",
                    });
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    color: "green",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      outline: "none",
                      textAlign: "center",
                      backgroundColor: "white",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Typography variant="h4">
                      Your answer was correct
                    </Typography>
                    <Typography variant="h6" color="textPrimary">
                      {Object.keys(this.state.answerFeedBack[this.state.index])}
                    </Typography>
                    <Typography variant="h6">√ {this.state.answer}</Typography>
                    <Button
                      onClick={() =>
                        this.setState({
                          showResult: false,
                          answer: "",
                          index: this.state.index + 1,
                        })
                      }
                    >
                      Proceed to next question
                    </Button>
                  </div>
                </Modal>
              ) : (
                <Modal
                  open={this.state.showResult}
                  onClose={() => {
                    this.setState({
                      index: this.state.index + 1,
                      showResult: false,
                      answer: "",
                    });
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      outline: "none",
                      textAlign: "center",
                      backgroundColor: "white",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Typography variant="h4" color="error">
                      Your answer was incorrect
                    </Typography>
                    <Typography variant="h6" color="error">
                      {Object.keys(this.state.answerFeedBack[this.state.index])}
                    </Typography>
                    <Typography variant="h6" color="error">
                      x {this.state.answer}
                    </Typography>
                    <Button
                      onClick={() =>
                        this.setState({
                          showResult: false,
                          answer: "",
                          index: this.state.index + 1,
                        })
                      }
                    >
                      Proceed to next question
                    </Button>
                  </div>
                </Modal>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
