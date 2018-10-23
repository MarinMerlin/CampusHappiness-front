import React from 'react';
import { connect } from 'react-redux';

import { Grid, Paper, TextField, Radio, Button, Snackbar
} from '@material-ui/core';

import { Link, Element } from 'react-scroll';

import { handleChange } from "../../redux/user/actions/userSurveyActions";

class QuestionsFrom extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showSnackbar: false, snackbarMessage: "Success" };
    }

    validate = (message) => {
        this.setState({ showSnackbar: true, snackbarMessage: message });
    }

    render() {
        if (!this.props.loaded) {
            return null;
        }
        return (
            <div>
                <form onSubmit={this.props.handleChange({ type: 'submit' }, this.validate)}>
                    <Grid container direction="column">
                        <Thematiques
                            thematiqueList={this.props.thematiqueList}
                            alreadyAnswered={this.props.alreadyAnswered}
                            comments={this.props.comments}
                            answers={this.props.answers}
                            handleChange={this.props.handleChange}
                        />
                    </Grid>
                    <div style={{position: 'fixed', right: '5em', bottom: '3em'}}>
                        <AnswerButtons
                                alreadyAnswered={this.props.alreadyAnswered}
                                handleChange={this.props.handleChange}
                            />
                </div>
                </form>
                <Snackbar
                    open={this.state.showSnackbar}
                    message={this.state.snackbarMessage}
                    autoHideDuration={6000}
                    onClose={() => { this.setState({ showSnackbar: false }); }}
                />
            </div>
        );

    }
}

function AnswerButtons(props) {
    return (
        <Grid container justify="flex-end">
            <Grid item>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={props.alreadyAnswered}
                >
                    Submit
                </Button>
            </Grid>
            <Grid item>
                <Button
                    variant="contained"
                    color="secondary"
                    disabled={!props.alreadyAnswered}
                    onClick={props.handleChange({ type: 'modify' })}
                >
                    Modify
                </Button>
            </Grid>
        </Grid>
    );
}

function Thematiques(props) {
    var questionStartingCount = 0;
    const questionsStartingCountUpdate = (nbr) => {
        questionStartingCount += nbr;
    }
    return (
        <div style={{ fontFamily: 'Roboto' }}>
            <ul style= {{ padding: 0 }}>
                {
                    props.thematiqueList.map(theme => (
                        <Grid item style={{ margin: '2VW', marginBottom: '10VH', }} key={"Grid" + theme.id}>
                            <Paper style={{ padding: '1VW' , backgroundColor: '#ecf0f1' }} elevation={2} key={"Paper" + theme.id}>
                                <h1 style={{ alignContent: 'center' }}> {theme.name} </h1>
                                <QuestionArea
                                    key={"Question" + theme.id}
                                    questions={theme.questionList}
                                    answers={props.answers}
                                    alreadyAnswered={props.alreadyAnswered}
                                    handleChange={props.handleChange}
                                    questionStartingCount={questionStartingCount}
                                />
                                {questionsStartingCountUpdate(theme.questionList.length)}
                                <CommentArea
                                    key={"Comment" + theme.id}
                                    theme={theme}
                                    comments={props.comments}
                                    handleChange={props.handleChange}
                                    alreadyAnswered={props.alreadyAnswered}
                                />
                            </Paper>
                        </Grid>
                    ))
                }
            </ul>

        </div>
    );
}
function CommentArea(props) {

    let comment = props.comments.get(props.theme.id);
    return (
        <TextField
            label={`comment for ${props.theme.name}`}
            disabled={props.alreadyAnswered}
            variant="outlined"
            fullWidth
            multiline
            margin="normal"
            value={comment}
            onChange={props.handleChange({ id: props.theme.id, type: 'comment' })}
        />
    );
}

function QuestionArea(props) {
    var questionNumber = props.questionStartingCount;
    const increment = () => {
        questionNumber++;
    }
    return (
        <ul>
            {props.questions.map(question => (
                <div key={"div" + question.id} style={{padding: 20}}>
                    <h2> {question.valeur}</h2>
                    <Choices
                        key={"Choices" + question.id}
                        question={question}
                        answers={props.answers}
                        handleChange={props.handleChange}
                        alreadyAnswered={props.alreadyAnswered}
                        questionNumber={questionNumber}
                    />
                    {increment()}
                </div>
            ))}
        </ul>
    );
}

function Choices(props) {
    let choices;
    // On essaye de récupérer les choix internes de la question
    if (props.question.choices) {
        choices = props.question.choices;
    }
    // Sinon on met les choix par défaut
    else {
        choices = [
            {
                id: 0, label: 'Satisfied', value: 1, color: 'primary'
            },
            {
                id: 1, label: 'Indiffirent', value: 0, color: 'default'
            },
            {
                id: 2, label: 'Unsatisfied', value: -1, color: 'secondary'
            },
        ];
    }

    return(
        <div>
        <Element name={props.questionNumber}>
        <Link to={props.questionNumber+1} smooth={true} duration={500} offset={-500}>
        {choices.map(choice => (
            <label key={"label"+choice.id} style={{padding: 20, fontStyle: 'italic'}}>
            {choice.label}
            <Radio
                key={"radio"+choice.id}
                disabled={props.alreadyAnswered}
                color={choice.color}
                checked={props.answers.get(props.question.id) === choice.value}
                onChange={props.handleChange({ id: props.question.id, type: "radioButton", value: choice.value })}
                />
                </label>
        )
        )
        }
        </Link>
        </Element>
        </div>

    )
}

const mapActionToProps = {
    handleChange: handleChange
};

const mapStateToprops = (state) => ({
    loaded: state.userSurvey.loaded,
    comments: state.userSurvey.comments,
    answers: state.userSurvey.answers,
    alreadyAnswered: state.userSurvey.alreadyAnswered,
    thematiqueList: state.userSurvey.thematiqueList,
})
export default connect(mapStateToprops, mapActionToProps)(QuestionsFrom);
