import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { Button, Typography } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

export default function CreateUser(props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      props.history.replace("/user");
    }
  }, []);

  const createAccount = () => {
    axios
      .post("https://grim-dungeon-58618.herokuapp.com/createUser", {
        email,
        name,
        password,
      })
      .then((res) => {
        if (res.status !== 403) {
          login();
        } else {
          alert(res.data);
        }
      });
  };

  const login = () => {
    axios
      .post("https://grim-dungeon-58618.herokuapp.com/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.status === 400) {
          alert(res.data);
        } else if (res.status === 200) {
          localStorage.setItem("token", res.data);
          props.history.replace("/user");
        }
      });
  };

  return (
    <div>
      {window.localStorage.getItem("token") ? (
        <div>
          <Redirect to="/user" />
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <div>
            <Typography variant="h5">Login to exisiting account</Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <TextField
                label="Enter your email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Enter your password"
                variant="outlined"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                color="primary"
                variant="contained"
                onClick={() => login()}
              >
                Login
              </Button>
            </div>
          </div>

          <div>
            <Typography variant="h5">Create a new account</Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <TextField
                label="Choose email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Enter your name"
                variant="outlined"
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Choose password"
                variant="outlined"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                color="primary"
                variant="contained"
                onClick={() => createAccount()}
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
