import React, { Component } from 'react';
import axios from 'axios';


import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import './App.css'

export default class Quiz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            quiz: {},
            allAnswers: [], 
            gotAnswerFeedBack: false,
            answerFeedBack: []
        }
    }

    componentDidMount(){
        axios.get(`https://grim-dungeon-58618.herokuapp.com/quiz/${this.props.match.params.id}`).then(response => {
            this.setState({loading: false,quiz: response.data});
            console.log(this.state)
            let answersCopy = [...this.state.allAnswers]
            for(let i = 0; i < response.data.questions.length; i++){
                answersCopy.push({userAnswer: ''})
                this.setState({allAnswers: answersCopy})
            }
            
            
        })
        

    }

    answerQuiz = (e) => {
        e.preventDefault();
        axios.post(`https://grim-dungeon-58618.herokuapp.com/quiz/answer/${this.props.match.params.id}`, {allAnswers: this.state.allAnswers})
        .then(response => {
            console.log(response.data)
            this.setState({gotAnswerFeedBack: true, answerFeedBack: response.data.answerFeedBack})
        })
    }

    handleChange = (e, index) => {

        console.log(this.state.allAnswers)
        let allAnswersCopy = [...this.state.allAnswers];
        allAnswersCopy[index] = {userAnswer: e.target.value};
        this.setState({allAnswers: allAnswersCopy})
    }

    

    render() {
    let {quiz} = this.state;
    
    
        return (
            <div className="questions">
                <div >
                {(this.state.loading ? <p>loading...</p> : 
                   <div>
                       <Typography align="center" variant="h1" color="textSecondary">{quiz.name}</Typography>
                       {quiz.questions.map((question, index) => {
                           return (
                               <div className="questions-container">
                                   <Typography variant="h6">{question.text}</Typography>
                                   <br/>
                                   <TextField label="Type your answer" type='text' onChange={(e) => this.handleChange(e, index)}></TextField >
                               </div>
                           )
                       })}
                   </div>
                )}

                <Button color="primary" onClick={(e) => this.answerQuiz(e)}>Submit your answer</Button>

                {(this.state.gotAnswerFeedBack === false ? <p>No answer is submitted</p> : 
                  <div>  {this.state.answerFeedBack.map((feedBack, index) => {
                    const key = Object.keys(feedBack);
                    const wrongAnswerStyle = {
                        color: 'red'
                    }
                    const rightAnswerStyle = {
                        color: 'green'
                    }
                        return(
                            <div>
                               {(feedBack[key]=== false ?  <Card> <Typography style={wrongAnswerStyle}> x {this.state.quiz.questions[index].text} </Typography>     {this.state.quiz.questions[index].answer}</Card> : 
                               <Card> <Typography style={rightAnswerStyle}> √ {this.state.quiz.questions[index].text} </Typography>     {this.state.quiz.questions[index].answer}</Card>
                               )}
                               
                            </div>
                        )
                    })}
                </div>
                )}
                </div>
            </div>
        )
    }
}
