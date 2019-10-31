import React from 'react';
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'

export default function MainPage() {
    return (
        <div>
            <div>
                <Link className="play-button" to="/quizDashBoard">
                    <Button>Play an existing quizzes</Button>
                </Link>
                <br></br>
                <Link className="play-button" to="/createQuiz">
                    <Button>Create your own quiz</Button>
                </Link>
            </div>
        </div>
    )
}
