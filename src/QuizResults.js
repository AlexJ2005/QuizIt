import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { Button } from "@material-ui/core";
import axios from "axios";
import { countRightAnswers } from "./utils/helper";

export default function QuizResults(props) {
  useEffect(() => {
    console.log(props.location);
    if (window.localStorage.getItem("token")) {
      axios.post("https://grim-dungeon-58618.herokuapp.com/quiz/answer/saveResult", {
        _id: props.location.state.quiz._id,
        rightAmount: countRightAnswers(props.location.state.answerFeedBack),
        
      }, {headers: {authToken: localStorage.getItem('token')}});
    } else {
      axios.post(
        "https://grim-dungeon-58618.herokuapp.com/quiz/answer/saveResult/guest",
        {
          _id: props.location.state.quiz._id,
          rightAmount: countRightAnswers(props.location.state.answerFeedBack),
        }
      );
    }
  });

  return (
    <div style={{ alignItems: "center" }}>
      {props.location.state.gotAnswerFeedBack === false ? null : (
        <div>
          {" "}
          {props.location.state.answerFeedBack.map((feedBack, index) => {
            const key = Object.keys(feedBack);
            const wrongAnswerStyle = {
              color: "red",
            };
            const rightAnswerStyle = {
              color: "green",
            };
            return (
              <div key={index} style={{ textAlign: "center" }}>
                {feedBack[key] === false ? (
                  <Card>
                    {" "}
                    <Typography style={wrongAnswerStyle}>
                      {" "}
                      x {props.location.state.quiz.questions[index].text}{" "}
                    </Typography>{" "}
                    {props.location.state.quiz.questions[index].answer}
                  </Card>
                ) : (
                  <Card>
                    {" "}
                    <Typography style={rightAnswerStyle}>
                      {" "}
                      √ {props.location.state.quiz.questions[index].text}{" "}
                    </Typography>{" "}
                    {props.location.state.quiz.questions[index].answer}
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      )}

      <Button
        style={{ alignItems: "center" }}
        onClick={() => props.history.goBack()}
      >
        Play again
      </Button>
    </div>
  );
}
