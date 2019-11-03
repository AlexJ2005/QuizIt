import React from 'react';
import './App.css';
import axios from 'axios';
import {Link} from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { TextField } from '@material-ui/core';


export default class quizDashBoard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          loading: true,
          quizzes: [],
          query: ''
        }
        this.fetchQuiz()
      }
     
     fetchQuiz = () => {
        axios.get('https://grim-dungeon-58618.herokuapp.com').then(response => {
          this.setState({loading:  !this.state.loading, quizzes: response.data})
        });
     }

     submitQuery = () => {
       axios.get(`https://grim-dungeon-58618.herokuapp.com?name=${this.state.query}`)
       .then((response) => this.setState({quizzes: response.data}))
     }

     searchBarOnChange = (e) => {
       e.preventDefault();
      this.setState({query: e.target.value});
      console.log(this.state.query)
     }
    render() {
        return (
        <div>
          <div className="search-container">
          <TextField label="Search for quizzes" name="searchbar" onChange={(e) => this.searchBarOnChange(e)}/>
          <Button color="primary" size="small" onClick={() => this.submitQuery()}>Search for quizzes</Button>
          <br></br>
          {(this.state.quizzes.length === 0 ? <div style={{alignContent: "center"}}><Typography >No quizzes were found</Typography> </div>: <div></div>)}
          </div>
            <div className="quizzes">
              <div className="quiz-container">
                
                
                {this.state.loading ? <div>loading...</div> : this.state.quizzes.map(quiz => {
            return (
                <Card className="quiz-card" key={quiz._id}>
                    <CardContent>
                      <Typography gutterBottom varaint="h5" component="h2">
                        {quiz.name}
                      </Typography> 
                    </CardContent>
                  <CardActions>
                    <Link className="play-button" to={`/quizDashBoard/${quiz._id}`}>
                      <Button  size="small" color="primary">
                        Play
                      </Button>
                    </Link>
                  </CardActions>
                  
                </Card>
               
              )
          })  
        }
        </div>
        </div>
        </div>
        )
    }
}
