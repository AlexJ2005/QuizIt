import React, { useEffect, useState } from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

export default function Scores(props) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://grim-dungeon-58618.herokuapp.com/quiz/${props.match.params.id}`
      )
      .then(res => {
        setScores(res.data);
        setLoading(false);
      });
  }, []);

  const formatDate = date => {
    let monthNames = [
      "Januari",
      "Februari",
      "Mars",
      "April",
      "Maj",
      "Juni",
      "Juli",
      "Augusti",
      "September",
      "Oktober",
      "November",
      "December"
    ];

    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();

    return day + " " + monthNames[monthIndex] + " " + year;
  };

  return (
    <div>
      {loading === false
        ? scores.playedBy.map(score => {
            console.log(formatDate(new Date(score.date)));
            return (
              <div key={score._id}>
                <Card style={{ textAlign: "center" }}>
                  <Typography>
                    {score.name} fick {score.rightAmount} rätta svar den{" "}
                    {formatDate(new Date(score.date))}
                  </Typography>
                </Card>
              </div>
            );
          })
        : null}
    </div>
  );
}
