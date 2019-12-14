import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function User() {
  const [user, setUser] = useState({});
  const [userAuth, setUserAuth] = useState("");
  const [loading, setLoading] = useState(true);
  const id = localStorage.getItem("id");

  useEffect(() => {
    if (id) {
      axios
        .get(`https://grim-dungeon-58618.herokuapp.com/user/${id}`)
        .then(res => {
          if (res.status === 200) {
            setUser({ key: res.data._id, name: res.data.name });
          } else {
            return <Typography>{res.data.err}</Typography>;
          }
        });
    } else {
      setUserAuth("You are not logged in, please signup or login");
      setLoading(false);
    }
  }, []);

  return (
    <div>
      {id === null ? (
        <div>
          <Typography>{userAuth}</Typography>
          <Link to={"/createUser"}>
            <Typography>Create an account</Typography>
          </Link>
          <Link to={"createUser/login"}>
            <Typography>
              If you already have an account you can login
            </Typography>
          </Link>
        </div>
      ) : (
        <div>
          {loading === true ? (
            <Typography>loading...</Typography>
          ) : (
            <div>
              <Typography variant="h3">{user.name}</Typography>
              <Typography>Your secret key: {user.key}</Typography>
              <Typography>
                Remeber to never share your key with anyone else
              </Typography>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
