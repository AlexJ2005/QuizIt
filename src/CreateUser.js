import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import axios from "axios";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [user, setUser] = useState({});

  const onChange = e => {
    setName(e.target.value);
  };

  useEffect(() => {
    if (window.localStorage.getItem("id")) {
      const id = window.localStorage.getItem("id");
      axios
        .get(`https://grim-dungeon-58618.herokuapp.com/user/${id}`)
        .then(res => setUser(res.data));
    }
  }, []);

  const getUser = () => {
    const id = window.localStorage.getItem("id");
    axios
      .get(`https://grim-dungeon-58618.herokuapp.com/user/${id}`)
      .then(res => setUser(res.data));
  };

  const onSubmit = e => {
    axios
      .post("https://grim-dungeon-58618.herokuapp.com/createUser", { name })
      .then(res => {
        if (res.status === 200) {
          const id = window.localStorage.setItem("id", res.data);
          window.location.reload();
        }
      })
      .catch(err => console.log(err));
  };

  const logout = () => {
    if (window.localStorage.getItem("id")) {
      localStorage.removeItem("id");
      window.location.reload();
    }
    return;
  };

  return (
    <div>
      {window.localStorage.getItem("id") ? (
        <div>
          <div>Hello {user.name}</div>
          <div>you are signed in </div>
          <Button onClick={() => logout()}>Logout</Button>
        </div>
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
