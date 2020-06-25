import React from "react";
import { Card, Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./App.css";

export default function Mode(props) {
  return (
    <div className="gameMode">
      <Card className="gameMode-items">
        <Link
          style={{ textDecoration: "none" }}
          to={`/quizDashBoard/write/${props.match.params.id}`}
        >
          <Button>Write</Button>
        </Link>
        <Typography variant="body1">
          Write is the most simplest form of playing on QuizIt, all quizzes are
          guaranteed compatible with the write mode.
        </Typography>
      </Card>
      <Card className="gameMode-items">
        <Link
          style={{ textDecoration: "none" }}
          to={`/quizDashBoard/multipleAnswer/${props.match.params.id}`}
        >
          <Button>Multiple choices</Button>
        </Link>
        <Typography variant="body1">
          Multiple choices lets you choose between different alternatives for
          the answer, note that all quizzes aren't compatible with this feature.
        </Typography>
      </Card>
      <Card className="gameMode-items">
        <Link
          style={{ textDecoration: "none" }}
          to={`/quizDashBoard/scores/${props.match.params.id}`}
        >
          <Button>View Scores</Button>
          
        </Link>
        <Typography variant="body1">This page lets you watch everybodys score on this quiz.</Typography>
      </Card>
    </div>
  );
}
