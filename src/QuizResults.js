import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function QuizResults(props) {
  return (
    <div>
      {props.location.state.gotAnswerFeedBack === false ? (
        <p>No answer is submitted</p>
      ) : (
        <div>
          {" "}
          {props.location.state.answerFeedBack.map((feedBack, index) => {
            const key = Object.keys(feedBack);
            const wrongAnswerStyle = {
              color: "red"
            };
            const rightAnswerStyle = {
              color: "green"
            };
            return (
              <div key={index}>
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

      <Button onClick={() => props.history.goBack()}>Play again</Button>
    </div>
  );
}
