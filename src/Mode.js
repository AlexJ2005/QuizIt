import React from "react";
import { Card, Button } from "@material-ui/core";
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
      </Card>
      <Card className="gameMode-items">
        <Link
          style={{ textDecoration: "none" }}
          to={`/quizDashBoard/multipleAnswer/${props.match.params.id}`}
        >
          <Button>Multiple choices</Button>
        </Link>
      </Card>
      <Card className="gameMode-items">
        <Link
          style={{ textDecoration: "none" }}
          to={`/quizDashBoard/scores/${props.match.params.id}`}
        >
          <Button>View Scores</Button>
        </Link>
      </Card>
    </div>
  );
}
