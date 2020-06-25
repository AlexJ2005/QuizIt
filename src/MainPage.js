import React from "react";
import { Link, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";

export default function MainPage() {
  return (
    <div>
      <div>
        <Redirect to={"/quizDashBoard"} />
      </div>
    </div>
  );
}
