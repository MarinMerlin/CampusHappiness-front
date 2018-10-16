import React from 'react'
import { Card, TextField, Grid, Tooltip, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import KeywordAdder from './KeywordAdder';

const QuestionAdder = ({
    thematiqueId,
    questionId,
    deleteQuestion,
    question,
    changeQuestion,
}) => {

    function handleQuestionChange(e){
        let newQuestion = question
        if (e.target.name==="text") {
            newQuestion.text = e.target.value
        }
        else if (e.target.name==="keyword") {
            newQuestion.keyWord = e.target.value;
        }
        changeQuestion(thematiqueId ,questionId, newQuestion)
    }

    function handleDeleteQuestion(){
        deleteQuestion(thematiqueId, questionId)
    }

    return (
    <Card style={{padding: '1vh', marginTop:'1vh', backgroundColor:'#bdc3c7'}} >
        <Grid container alignItems="center">
            <Grid item sm={8}>
                <TextField 
                    fullWidth
                    name='text'
                    id={questionId}
                    label="question text"
                    value={question.text}
                    onChange={handleQuestionChange}
                    margin="normal"
                />
            </Grid>
            <Grid item sm={1} >
            </Grid>
            <Grid item sm={2} >
                <KeywordAdder
                    onKeywordChange = {handleQuestionChange}
                />
            </Grid>
            <Grid item sm={1} >
                <Tooltip title="delete">
                    <IconButton aria-label="Delete" onClick={handleDeleteQuestion} >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
    </Card>
)}


export default QuestionAdder