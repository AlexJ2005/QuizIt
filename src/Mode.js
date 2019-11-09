import React from 'react'
import { Card, Button } from '@material-ui/core'
import {Link} from 'react-router-dom'

export default function Mode(props) {
    return (
        <div>
            <Card>
                <Link to={`/quizDashBoard/write/${props.match.params.id}`}><Button>Write</Button></Link>
            </Card>
            <Card>
                <Link to={`/quizDashBoard/multipleAnswer/${props.match.params.id}`}><Button>Multiple choices</Button></Link>
            </Card>
        </div>
    )
}
