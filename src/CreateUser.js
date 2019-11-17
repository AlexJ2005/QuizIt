import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import axios from "axios";

export default function CreateUser() {
  const [name, setName] = useState("");

  const onChange = e => {
    setName(e.target.value);
  };

  const onSubmit = e => {
    axios
      .post("https://grim-dungeon-58618.herokuapp.com/createUser", { name })
      .then(res => {
        if (res.status === 200) {
          window.localStorage.setItem("name", res.data);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      {window.localStorage.getItem("name") ? (
        <div>you are signed in</div>
      ) : (
        <div>
          <TextField
            placeholder="Enter your name"
            onChange={e => onChange(e)}
          />
          <Button onClick={e => onSubmit(e)}>Enter</Button>
        </div>
      )}
    </div>
  );
}
