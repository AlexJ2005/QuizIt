import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import "./App.css";

export default function Navbar() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <div>
              <img alt="QuizIt logo" height="50" width="50" src="../Logo.png" />
            </div>
          </Link>
          <Typography style={{ fontSize: "1.5vw" }}>
            <Link className="navbar-links" to="/createQuiz">
              Create your own quiz
            </Link>
          </Typography>
          <Typography style={{ fontSize: "1.5vw" }}>
            <Link className="navbar-links" to="/quizDashBoard">
              Play existing quizzes
            </Link>
          </Typography>
          <Typography style={{ fontSize: "1.5vw" }}>
            <Link className="navbar-links" to="/createUser">
              Create your account
            </Link>
          </Typography>
          <Typography style={{ fontSize: "1.5vw" }}>
            <Link className="navbar-links" to="/user">
              User
            </Link>
          </Typography>
          <Typography style={{ fontSize: "1.5vw" }}>
            <a
              className="navbar-links"
              href="https://github.com/AlexJ2005/QuizIt"
            >
              GitHub
            </a>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
