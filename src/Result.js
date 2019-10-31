import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Result extends Component {
    render() {
        return (
            <div>
               <h1>Quiz was successfully created!</h1>
               <h2>To play your quiz, use this link </h2>
               <Link to={{pathname: `../quizDashBoard/${this.props.location.state.id}`}}>{`localhost:300/quizDashBoard/${this.props.location.state.id}`}</Link>
            </div>
        )
    }
}

