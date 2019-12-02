import React, { useState } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";

export default function Login() {
  const [key, setKey] = useState("");
  const [redirect, setRedirect] = useState(false);

  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant="h2">Instructions for logging in</Typography>
      <ol>
        <li>
          <Typography variant="h6">
            Open Quizit on a device where you're logged in
          </Typography>
        </li>
        <li>
          <Typography variant="h6">
            Navigate to the user page (user tab on the navigation bar)
          </Typography>
        </li>
        <li>
          <Typography variant="h6">Get your secret key</Typography>
        </li>
        <li>
          <Typography variant="h6">
            Enter the key onto the from and click enter
          </Typography>
        </li>
        <li>
          <Typography variant="h6">
            Everything went well you should be able to see your name on the user
            tab
          </Typography>
        </li>
      </ol>
      <TextField
        variant="outlined"
        id="outlined-basic"
        placeholder="Enter your key"
        fullWidth
        onChange={e => {
          setKey(e.target.value);
          console.log(e.target.width + "ch");
        }}
      />
      <Button
        color="primary"
        onClick={e => {
          window.localStorage.setItem("id", key);
          setRedirect(true);
        }}
      >
        Enter
      </Button>

      {redirect === true ? (
        <Redirect to={{ pathname: "/createUser" }}></Redirect>
      ) : null}
    </div>
  );
}
