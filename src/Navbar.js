import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom'
import './App.css'

export default function Navbar() {
    return (
        <div >
            <AppBar  position="static">
                <Toolbar>
                   <Typography variant="h4"> <Link className="navbar-maintext" to="/">QuizIt</Link></Typography>
                    <Typography  variant="h6">
                        <Link className="navbar-links" to="/createQuiz">Create your own quiz</Link>
                    </Typography>
                    <Typography variant="h6">
                        <Link className="navbar-links" to="/quizDashBoard">Play existing quizzes</Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div >
    )
}
