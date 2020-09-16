import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Card, Button } from "@material-ui/core";

export const FlashCards = (props) => {
  const [quiz, setQuiz] = useState({});
  const [loading, setLoading] = useState(true);
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get(
        `https://grim-dungeon-58618.herokuapp.com/quiz/${props.match.params.id}`
      );
      const { name, questions, _id } = await response.data;
      setQuiz({ name, questions, _id });
      setLoading(false);
    };

    fetchItems();
  });

  return (
    <div>
      {loading === true ? (
        <h1>...loading</h1>
      ) : (
        <div>
            {idx >= quiz.questions.length ? <Typography>
                End of questions
            </Typography> : 
            <>
            <Typography style={{marginTop: "0", marginBottom: "0", paddingBottom: "0"}} align="center" variant="h2">{idx + 1}/{quiz.questions.length} Questions</Typography>
                <Card
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "50%",
                  height: "25rem",
                  marginLeft: "25%",
                  alignItems: "center",
                  cursor: "pointer",
                  marginBottom: "1rem",
                  marginTop: "10%",
                }}
                onClick={() => setShow(!show)}
              >
                <Typography variant="h4">
                  {show === false
                    ? quiz.questions[idx].text
                    : quiz.questions[idx].answer}
                </Typography>
              </Card>
              <div style={{textAlign: "center"}}>
                <Button color="primary" variant="contained" onClick={() => setIdx(idx + 1)}>Next question</Button>
              </div>
              </>
            }
          
        </div>
      )}
    </div>
  );
};
