import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function User() {
  const [secretKey, setSecretKey] = useState("");
  const id = localStorage.getItem("id");

  useEffect(() => {
    if (id) {
      axios
        .get(`https://grim-dungeon-58618.herokuapp.com/user/${id}`)
        .then(res => {
          if (res.status === 200) {
            setSecretKey(res.data._id);
          }
        });
    }
  }, []);

  return (
    <div>
      {secretKey === id ? (
        <Typography>Your secret key: {secretKey}</Typography>
      ) : (
        <div>
          <Link to={"/createUser"}>
            <Typography>Create an account</Typography>
          </Link>
          <Link to={"createUser/login"}>
            <Typography>
              If you already have an account you can login
            </Typography>
          </Link>
        </div>
      )}
    </div>
  );
}
