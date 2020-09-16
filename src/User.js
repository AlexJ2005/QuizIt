import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Tabs,
  Tab,
  Box,
  Button,
  ListItem,
  List,
  Card
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function User(props) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const [selectedTab, setSelectedTab] = useState("one");

  useEffect(() => {
    if (token) {
      axios
        .get(`https://grim-dungeon-58618.herokuapp.com/user`, {
          headers: { authToken: token },
        })
        .then((res) => {
          if (res.status === 200) {
            setUser(res.data);
            setLoading(false);
          } else {
            return <Typography>{res.data.err}</Typography>;
          }
        });
    } else {
      props.history.replace("/createUser");
    }
  }, []);

  return (
    <div>
      {loading === true ? (
        <Typography>...loading user</Typography>
      ) : (
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "white",
            }}
          >
            <Typography variant="h4" style={{ marginRight: "3rem" }}>
              {user.name}
            </Typography>
            <Typography
              variant="h6"
              style={{ color: "grey", marginTop: "0.5rem" }}
            >
              {user.email}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "white",
            }}
          >
            <Tabs
              value={selectedTab}
              onChange={(e, newValue) => setSelectedTab(newValue)}
              variant="scrollable"
              scrollButtons="off"
            >
              <Tab value="one" label="Created" />
              <Tab value="two" label="Played" />
            </Tabs>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            {selectedTab === "one" ? (
              <List>
                {user.createdQuizzes.length > 0 ? (
                  user.createdQuizzes.map((quiz) => (
                    <ListItem
                      style={{
                        display: "flex",
                        backgroundColor: "white",
                        width: "320px",
                        borderRadius: "10px",
                        position: "relative",
                        marginBottom: "10px"
                      }}
                      className="elevation"
                    >
                      <Link style={{color: 'black', textDecoration: 'none'}} to={`/quizDashboard/mode/${quiz._id}`}>
                        <Typography variant="body1">{quiz.name}</Typography>
                      </Link>
                      <Button style={{ position: "absolute", right: "0px" }}>
                        <Delete />
                      </Button>
                    </ListItem>
                  ))
                ) : (
                  <Typography>
                    Hmm... Looks like you haven't created any quizzes yet
                  </Typography>
                )}
                <Link to="/createQuiz" className="navbar-links">
                  <Button style={{ width: "320px", marginTop: "10px" }}>
                    Create more quizzes
                  </Button>
                </Link>
              </List>
            ) : (
              <List>
                {user.playedQuizzes.length > 0 ? (
                  user.playedQuizzes.map((quiz) => (
                    <ListItem
                      style={{
                        backgroundColor: "white",
                        width: "320px",
                        borderRadius: "10px",
                        textAlign: "center",
                        marginBottom: "10px"
                      }}
                      className="elevation"
                    >
                      <Typography variant="body1">
                        {quiz.name} - {quiz.rightAmount} point
                      </Typography>
                    </ListItem>
                  ))
                ) : (
                  <Typography>
                    Hmm... Looks like you haven't played any quizzes yet
                  </Typography>
                )}
              </List>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
