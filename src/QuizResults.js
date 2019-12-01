import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { Button } from "@material-ui/core";

export default function QuizResults(props) {
  return (
    <div style={{ alignItems: "center" }}>
      {props.location.state.gotAnswerFeedBack === false ? null : (
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
