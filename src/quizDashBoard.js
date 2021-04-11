import React from "react";
import "./App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

export default class QuizDashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      quizzes: [],
      query: "",
    };
    this.fetchQuiz();
  }

  fetchQuiz = () => {
    axios.get(`https://grim-dungeon-58618.herokuapp.com`).then((res) => {
      this.setState({ quizzes: res.data, loading: false });
    });
  };

  submitQuery = () => {
    axios
      .get(`https://grim-dungeon-58618.herokuapp.com?name=${this.state.query}`)
      .then((response) =>
        this.setState({ quizzes: response.data, loading: !this.state.loading })
      );
  };

  searchBarOnChange = (e) => {
    e.preventDefault();
    this.setState({ query: e.target.value });
  };
  render() {
    return (
      <div>
        <div className="search-container">
          <TextField
            variant="outlined"
            id="outlined-basic"
            label="Search for quizzes"
            name="searchbar"
            onChange={(e) => this.searchBarOnChange(e)}
            data-cy="search-field"
          />
          <Button
            color="primary"
            size="large"
            onClick={() => this.submitQuery()}
            data-cy="search-button"
          >
            <SearchIcon />
          </Button>
          <br></br>
          {this.state.quizzes.length === 0 && this.state.query ? (
            <div style={{ alignContent: "center" }}>
              <Typography>No quizzes were found</Typography>{" "}
            </div>
          ) : null}
        </div>

        <div className="quizzes">
          <div style={{ textAlign: "center" }} className="quiz-container">
            {this.state.quizzes.map((quiz) => {
              return (
                <Card className="quiz-card" data-cy="quiz-card" key={quiz._id}>
                  <CardContent>
                    <Typography gutterBottom variant="h5">
                      {quiz.name}
                    </Typography>
                    <Typography variant="h6">{quiz.createdBy}</Typography>
                  </CardContent>
                  <CardActions>
                    <Link
                      className="play-button"
                      to={`/quizDashBoard/mode/${quiz._id}`}
                    >
                      <Button
                        data-cy="play-button"
                        size="small"
                        color="primary"
                      >
                        Play
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
